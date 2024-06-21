import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { addBlogStyle, htmlStyles } from "../../styles/add-blog";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_BLOG } from "../graphql/mutations";
import { useNavigate, useParams } from "react-router-dom";
import { GET_BLOG_BY_ID } from "../graphql/queries";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, refetch } = useQuery(GET_BLOG_BY_ID, {
    variables: {
      id,
    },
  });
  const [updateUserBlog] = useMutation(UPDATE_BLOG);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userData: user } = useSelector((state: any) => state.auth);
  const handleSubmit = async () => {
    if (!title || !content) {
      return toast.error("Title and Content Must Not Be Empty");
    }
    await updateUserBlog({
      variables: {
        id,
        title,
        content,
      },
      onCompleted: () => {
        navigate("/profile");
      },
    });
    toast.promise(refetch(), {
      error: "Unexpected Error",
      success: "blog has been updated",
      loading: "processing...",
    });
  };

  useEffect(() => {
    if (data) {
      setTitle(data.blog.title);
      setContent(data.blog.content);
    }
  }, [id, data]);
  return (
    <Box sx={addBlogStyle.container}>
      <Box sx={addBlogStyle.blogHeader}>
        <Typography>Authored by : {user?.name}</Typography>
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

export default UpdateBlog;
