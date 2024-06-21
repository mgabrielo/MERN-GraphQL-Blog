import {
  Box,
  IconButton,
  Typography,
  OutlinedInput,
  Avatar,
  LinearProgress,
  Dialog,
  DialogContent,
} from "@mui/material";
import { viewBlogStyles } from "../../styles/view-blog";
import { FaComments } from "react-icons/fa";
import { BiCalendarCheck, BiSend } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { ImMail } from "react-icons/im";
import { useMutation, useQuery } from "@apollo/client";
import { GET_BLOG_BY_ID } from "../graphql/queries";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ADD_COMMENT, DELETE_COMMENT } from "../graphql/mutations";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

function getInitials(name: string) {
  if (name) {
    const nameArr = name.split(" ");
    if (nameArr.length > 1) {
      return `${nameArr[0][0]}${nameArr[1][0]}`;
    }
    return `${nameArr[0][0]}`;
  }
}
const ViewBlog = () => {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const { userData: user } = useSelector((state: any) => state.auth);
  const { data, error, loading, refetch } = useQuery(GET_BLOG_BY_ID, {
    variables: {
      id,
    },
  });

  const [addBlogComment] = useMutation(ADD_COMMENT);
  const [deleteComment] = useMutation(DELETE_COMMENT);
  if (loading) {
    return <LinearProgress />;
  }
  if (error) {
    return (
      <Dialog open={true}>
        <DialogContent>Error Fetching Blog</DialogContent>
      </Dialog>
    );
  }

  console.log({ user: user });
  const handleCommentSubmit = async (data: any) => {
    const text = data.comment;
    const date = new Date();
    if (!text) {
      return toast.error("comment  Must Not Be Empty");
    }
    try {
      await addBlogComment({
        variables: {
          text,
          date,
          blog: id,
          user: user?.id,
        },
      });
      toast.promise(refetch(), {
        error: "Unexpected Error",
        success: "comment has been deleted",
        loading: "processing...",
      });
    } catch (error: any) {
      console.log(error.messaage);
    }
  };
  const handleCommentDelete = async (id: string) => {
    try {
      await deleteComment({
        variables: {
          id,
        },
      });
      refetch();
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    data && (
      <Box sx={viewBlogStyles.container}>
        <Box sx={viewBlogStyles.profileHeader}>
          <Typography sx={viewBlogStyles.headerText}>
            {" "}
            {data?.blog?.user?.name}
          </Typography>
          <Box sx={viewBlogStyles.profileHeaderItems}>
            <ImMail size={20} />
            <Typography sx={viewBlogStyles.headerText}>
              {data?.blog?.user?.email}
            </Typography>
            <Box
              sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 3 }}
            >
              <BiCalendarCheck size={30} />
              <Typography>
                {new Date(Number(data.blog.date)).toDateString()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography sx={viewBlogStyles.blogTitle}>
          {" "}
          {data?.blog?.title}
        </Typography>
        <Typography sx={viewBlogStyles.blogContent}>
          {data?.blog?.content}
        </Typography>
        <Box sx={viewBlogStyles.commentBox}>
          Comments:{" "}
          <IconButton>
            <FaComments size={"30px"} />
          </IconButton>
        </Box>
        <Box sx={viewBlogStyles.commentInputContainer}>
          <Typography fontFamily={"Arvo"}>Add Your Comment Here</Typography>
          <Box sx={viewBlogStyles.inputLayout}>
            <OutlinedInput
              {...register("comment")}
              sx={viewBlogStyles.textField}
              type="text"
              fullWidth
              inputProps={{
                style: {
                  fontFamily: "Work Sans",
                },
              }}
              endAdornment={
                <IconButton onClick={handleSubmit(handleCommentSubmit)}>
                  <BiSend size={"25px"} color="#000" />
                </IconButton>
              }
              multiline
            />
          </Box>
        </Box>
        <Box sx={viewBlogStyles.comments}>
          {data.blog.comments.length > 0 &&
            data.blog.comments.map((comment: any) => (
              <Box key={comment?.id} sx={viewBlogStyles.commentItem}>
                <Avatar
                  sx={{
                    p: 1,
                    color: "red",
                    bgcolor: "transparent",
                    borderRadius: "50%",
                    border: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {getInitials(comment?.user?.name)}
                </Avatar>
                <Typography sx={viewBlogStyles.commentText}>
                  {comment?.text}
                </Typography>
                {user?.id === comment?.user?.id && (
                  <IconButton
                    color="error"
                    onClick={() => handleCommentDelete(comment?.id)}
                    sx={{ alignSelf: "center", ml: "auto" }}
                  >
                    <AiOutlineDelete size={20} />
                  </IconButton>
                )}
              </Box>
            ))}
        </Box>
      </Box>
    )
  );
};

export default ViewBlog;
