import { BlogType } from "../../types/types";
import { Box } from "@mui/material";
import { bloglistStyles } from "../../styles/blog-list-styles";
import BlogItem from "./BlogItem";

type Props = {
  blogs: BlogType[];
};

const BlogsList = (props: Props) => {
  return (
    <Box sx={bloglistStyles.container}>
      {props.blogs.length > 0 &&
        props.blogs.map((blog, index) => {
          if (blog) {
            return <BlogItem key={index} blog={blog} />;
          }
          return null;
        })}
    </Box>
  );
};

export default BlogsList;
