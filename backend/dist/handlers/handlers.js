"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema_1 = require("../schema/schema");
const User_1 = __importDefault(require("../models/User"));
const Blog_1 = __importDefault(require("../models/Blog"));
const Comment_1 = __importDefault(require("../models/Comment"));
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        // get all users
        users: {
            type: new graphql_1.GraphQLList(schema_1.UserType),
            async resolve() {
                return await User_1.default.find();
            },
        },
        //get user along with associated user blog post by id
        user: {
            type: schema_1.UserType,
            args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
            async resolve(parent, { id }) {
                const existingUser = await User_1.default.findById(id);
                if (!existingUser) {
                    return new Error("User Does Not Exist");
                }
                return User_1.default.findById(id).populate("blogs");
            },
        },
        //get all blogs
        blogs: {
            type: new graphql_1.GraphQLList(schema_1.BlogType),
            async resolve() {
                return await Blog_1.default.find();
            },
        },
        //get blog post along with associated comments by id
        blog: {
            type: schema_1.BlogType,
            args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
            async resolve(parent, { id }) {
                return await Blog_1.default.findById(id).populate("user comments");
            },
        },
        //get all comments
        comments: {
            type: new graphql_1.GraphQLList(schema_1.CommentType),
            async resolve() {
                return await Comment_1.default.find();
            },
        },
    },
});
const mutations = new graphql_1.GraphQLObjectType({
    name: "mutations",
    fields: {
        //user registration
        signup: {
            type: schema_1.UserType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            async resolve(parent, { name, email, password }) {
                let existingUser;
                try {
                    existingUser = await User_1.default.findOne({ email: email });
                    if (existingUser) {
                        return new graphql_1.GraphQLError("User Already Exists");
                    }
                    const encryptPassword = (0, bcryptjs_1.hashSync)(password);
                    const user = new User_1.default({ name, email, password: encryptPassword });
                    return await user.save();
                }
                catch (error) {
                    return new graphql_1.GraphQLError("User Sign Up Not Successful");
                }
            },
        },
        // user login
        login: {
            type: schema_1.UserType,
            args: {
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            async resolve(parent, { email, password }) {
                let existingUser;
                try {
                    existingUser = await User_1.default.findOne({ email: email });
                    if (!existingUser) {
                        return new graphql_1.GraphQLError("User Does Not Exist");
                    }
                    //@ts-ignore
                    const decryptPassword = (0, bcryptjs_1.compareSync)(password, existingUser?.password);
                    if (!decryptPassword) {
                        return new graphql_1.GraphQLError("Incorrect Password");
                    }
                    return existingUser;
                }
                catch (error) {
                    return new graphql_1.GraphQLError("User Log In Not Successful");
                }
            },
        },
        // create blog post
        addBlog: {
            type: schema_1.BlogType,
            args: {
                title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                content: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                date: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                user: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            async resolve(parent, { title, content, date, user }) {
                let blog;
                const session = await (0, mongoose_1.startSession)();
                try {
                    session.startTransaction({ session });
                    blog = new Blog_1.default({ title, content, date, user });
                    const existingUser = await User_1.default.findById(user);
                    if (!existingUser) {
                        return new Error("User Not Found");
                    }
                    existingUser.blogs.push(blog);
                    await existingUser.save({ session });
                    return await blog.save();
                }
                catch (error) {
                    return new Error("Adding BlogPost Unsucessful");
                }
                finally {
                    await session.commitTransaction();
                }
            },
        },
        //update blog post
        updateBlog: {
            type: schema_1.BlogType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                content: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            async resolve(parent, { id, title, content }) {
                let existingBlog;
                try {
                    existingBlog = await Blog_1.default.findById(id);
                    if (!existingBlog) {
                        return new Error("Blog Does Not Exist");
                    }
                    return await Blog_1.default.findByIdAndUpdate(id, { title, content }, { new: true });
                }
                catch (error) {
                    return new Error("Updating BlogPost Unsucessful");
                }
            },
        },
        //delete blog post
        deleteBlog: {
            type: schema_1.BlogType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            async resolve(parent, { id }) {
                let existingBlog;
                const session = await (0, mongoose_1.startSession)();
                try {
                    session.startTransaction({ session });
                    existingBlog = await Blog_1.default.findById(id).populate("user");
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
                    return await Blog_1.default.findByIdAndDelete(id);
                }
                catch (error) {
                    return new Error("Deleting BlogPost Unsucessful");
                }
                finally {
                    await session.commitTransaction();
                }
            },
        },
        // add Comment
        addComment: {
            type: schema_1.CommentType,
            args: {
                text: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                date: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                blog: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                user: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            async resolve(parent, { text, date, blog, user }) {
                const session = await (0, mongoose_1.startSession)();
                let comment;
                try {
                    session.startTransaction({ session });
                    const existingUser = await User_1.default.findById(user);
                    if (!existingUser) {
                        return new Error("User Does Not Exist");
                    }
                    const existingBlog = await Blog_1.default.findById(blog);
                    if (!existingBlog) {
                        return new Error("Blog Does Not Exist");
                    }
                    // console.log(blog);
                    comment = new Comment_1.default({ text, date, blog, user });
                    existingUser.comments.push(comment);
                    existingBlog.comments.push(comment);
                    await existingBlog.save({ session });
                    await existingUser.save({ session });
                    return await comment.save({ session });
                }
                catch (error) {
                    return new Error("Adding Comment Unsuccessful");
                }
                finally {
                    await session.commitTransaction();
                }
            },
        },
        //delete comment
        deleteComment: {
            type: schema_1.CommentType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            async resolve(parent, { id }) {
                let comment;
                const session = await (0, mongoose_1.startSession)();
                try {
                    await session.startTransaction({ session });
                    comment = await Comment_1.default.findById(id);
                    if (!comment) {
                        return new Error("Comment Not Found");
                    }
                    //@ts-ignore
                    const existingUser = await User_1.default.findById(comment?.user);
                    if (!existingUser) {
                        return new Error("User Not Found");
                    }
                    //@ts-ignore
                    const existingBlog = await Blog_1.default.findById(comment?.blog);
                    if (!existingBlog) {
                        return new Error("Blog Not Found");
                    }
                    existingUser.comments.pull(comment);
                    existingBlog.comments.pull(comment);
                    await existingUser.save({ session });
                    await existingBlog.save({ session });
                    return await Comment_1.default.findByIdAndDelete(id);
                }
                catch (error) {
                    return new Error("Deleting Comment Unsuccessful");
                }
                finally {
                    await session.commitTransaction();
                }
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({ query: RootQuery, mutation: mutations });
//# sourceMappingURL=handlers.js.map