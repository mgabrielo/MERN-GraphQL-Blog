import {
  GraphQLError,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { BlogType, CommentType, UserType } from "../schema/schema";
import User from "../models/User";
import Blog from "../models/Blog";
import Comment from "../models/Comment";
import { Document, startSession } from "mongoose";
import { compareSync, hashSync } from "bcryptjs";

type DocumentType = Document<any, any, any>;

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    // get all users
    users: {
      type: new GraphQLList(UserType),
      async resolve() {
        return await User.find();
      },
    },
    //get user along with associated user blog post by id
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parent, { id }) {
        const existingUser = await User.findById(id);
        if (!existingUser) {
          return new Error("User Does Not Exist");
        }
        return User.findById(id).populate("blogs");
      },
    },
    //get all blogs
    blogs: {
      type: new GraphQLList(BlogType),
      async resolve() {
        return await Blog.find();
      },
    },
    //get blog post along with associated comments by id
    blog: {
      type: BlogType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parent, { id }) {
        return await Blog.findById(id).populate("user comments");
      },
    },
    //get all comments
    comments: {
      type: new GraphQLList(CommentType),
      async resolve() {
        return await Comment.find();
      },
    },
  },
});

const mutations = new GraphQLObjectType({
  name: "mutations",
  fields: {
    //user registration
    signup: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, email, password }) {
        let existingUser: DocumentType;
        try {
          existingUser = await User.findOne({ email: email });
          if (existingUser) {
            return new GraphQLError("User Already Exists");
          }
          const encryptPassword = hashSync(password);
          const user = new User({ name, email, password: encryptPassword });
          return await user.save();
        } catch (error) {
          return new GraphQLError("User Sign Up Not Successful");
        }
      },
    },
    // user login
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { email, password }) {
        let existingUser: DocumentType;
        try {
          existingUser = await User.findOne({ email: email });
          if (!existingUser) {
            return new GraphQLError("User Does Not Exist");
          }
          //@ts-ignore
          const decryptPassword = compareSync(password, existingUser?.password);

          if (!decryptPassword) {
            return new GraphQLError("Incorrect Password");
          }

          return existingUser;
        } catch (error) {
          return new GraphQLError("User Log In Not Successful");
        }
      },
    },
    // create blog post
    addBlog: {
      type: BlogType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { title, content, date, user }) {
        let blog: DocumentType;
        const session = await startSession();
        try {
          session.startTransaction({ session });
          blog = new Blog({ title, content, date, user });
          const existingUser = await User.findById(user);
          if (!existingUser) {
            return new Error("User Not Found");
          }
          existingUser.blogs.push(blog);
          await existingUser.save({ session });
          return await blog.save();
        } catch (error) {
          return new Error("Adding BlogPost Unsucessful");
        } finally {
          await session.commitTransaction();
        }
      },
    },
    //update blog post
    updateBlog: {
      type: BlogType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { id, title, content }) {
        let existingBlog: DocumentType;

        try {
          existingBlog = await Blog.findById(id);
          if (!existingBlog) {
            return new Error("Blog Does Not Exist");
          }

          return await Blog.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
          );
        } catch (error) {
          return new Error("Updating BlogPost Unsucessful");
        }
      },
    },
    //delete blog post
    deleteBlog: {
      type: BlogType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { id }) {
        let existingBlog: DocumentType;
        const session = await startSession();
        try {
          session.startTransaction({ session });

          existingBlog = await Blog.findById(id).populate("user");
          if (!existingBlog) {
            return new Error("BlogPost Does Not Exist");
          }
          //@ts-ignore
          const existingUser = existingBlog?.user;
          if (!existingUser) {
            return new Error("No User Linked To This Blog");
          }
          existingUser.blogs.pull(existingBlog);
          await existingUser.save({ session });

          return await Blog.findByIdAndDelete(id);
        } catch (error) {
          return new Error("Deleting BlogPost Unsucessful");
        } finally {
          await session.commitTransaction();
        }
      },
    },
    // add Comment
    addComment: {
      type: CommentType,
      args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        blog: { type: new GraphQLNonNull(GraphQLID) },
        user: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { text, date, blog, user }) {
        const session = await startSession();
        let comment: DocumentType;
        try {
          session.startTransaction({ session });
          const existingUser = await User.findById(user);
          if (!existingUser) {
            return new Error("User Does Not Exist");
          }
          const existingBlog = await Blog.findById(blog);
          if (!existingBlog) {
            return new Error("Blog Does Not Exist");
          }
          // console.log(blog);
          comment = new Comment({ text, date, blog, user });

          existingUser.comments.push(comment);
          existingBlog.comments.push(comment);

          await existingBlog.save({ session });
          await existingUser.save({ session });
          return await comment.save({ session });
        } catch (error) {
          return new Error("Adding Comment Unsuccessful");
        } finally {
          await session.commitTransaction();
        }
      },
    },
    //delete comment
    deleteComment: {
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { id }) {
        let comment: DocumentType;
        const session = await startSession();
        try {
          await session.startTransaction({ session });
          comment = await Comment.findById(id);
          if (!comment) {
            return new Error("Comment Not Found");
          }
          //@ts-ignore
          const existingUser = await User.findById(comment?.user);
          if (!existingUser) {
            return new Error("User Not Found");
          }
          //@ts-ignore
          const existingBlog = await Blog.findById(comment?.blog);
          if (!existingBlog) {
            return new Error("Blog Not Found");
          }
          existingUser.comments.pull(comment);
          existingBlog.comments.pull(comment);
          await existingUser.save({ session });
          await existingBlog.save({ session });
          return await Comment.findByIdAndDelete(id);
        } catch (error) {
          return new Error("Deleting Comment Unsuccessful");
        } finally {
          await session.commitTransaction();
        }
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation: mutations });
