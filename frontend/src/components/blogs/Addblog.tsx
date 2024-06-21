import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addBlogStyle, htmlStyles } from "../../styles/add-blog";
import { useMutation } from "@apollo/client";
import { ADD_BLOG } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Addblog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addBlog] = useMutation(ADD_BLOG);
  const { userData: user } = useSelector((state: any) => state.auth);
  const handleSubmit = async () => {
    const date = new Date();
    try {
      if (!title || !content) {
        return toast.error("Title and Content Must Not Be Empty");
      }
      await addBlog({
        variables: {
          title,
          content,
          date,
          user: user?.id,
        },
      }).then((res) => {
        if (res.data) {
          navigate("/blogs");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={addBlogStyle.container}>
      <Box sx={addBlogStyle.blogHeader}>
        <Typography sx={{ textTransform: "capitalize" }}>
          Written by : {user?.name}
        </Typography>
        <Button
          color="success"
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Publish
        </Button>
      </Box>
      <form>
        <Box sx={addBlogStyle.formContainer}>
          <TextField
            style={htmlStyles.h2}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            style={htmlStyles.p}
            placeholder="Content"
            multiline={true}
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Box>
      </form>
    </Box>
  );
};

export default Addblog;
