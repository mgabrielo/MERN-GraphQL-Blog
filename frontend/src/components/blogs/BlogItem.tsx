import { BlogType } from "../../types/types";
import { Box, Card, CardActions, IconButton, Typography } from "@mui/material";
import { bloglistStyles, randomColor } from "../../styles/blog-list-styles";
import { FcCalendar } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { DELETE_BLOG } from "../graphql/mutations";

type Props = {
  blog: BlogType;
  showActions?: boolean;
  refetch?: () => void;
};

const BlogItem = ({ blog, showActions = false, refetch }: Props) => {
  const navigate = useNavigate();
  const [deleteUserBlog] = useMutation(DELETE_BLOG);
  const handleClick = () => {
    return navigate(`/blog/view/${blog.id}`);
  };

  const editBlogHandler = () => {
    return navigate(`/blog/update/${blog.id}`);
  };

  const deleteBlogHandler = async () => {
    try {
      await deleteUserBlog({
        variables: {
          id: blog.id,
        },
      });
      if (refetch) {
        refetch();
      }
      navigate("/profile");
    } catch (error: any) {
      return console.log(error.message);
    }
  };

  const truncateTitleText = (blog: any, maxLength: number) => {
    if (blog?.title && blog?.title.length > maxLength) {
      return blog?.title.substring(0, maxLength) + "...";
    }
    return blog?.title;
  };
  const truncateContextText = (blog: any, maxLength: number) => {
    if (blog?.content && blog?.content.length > maxLength) {
      return blog?.content.substring(0, maxLength) + "...";
    }
    return blog?.content;
  };

  return (
    <Box sx={{ width: "fit-content", height: "100%" }}>
      {showActions && (
        <CardActions sx={{ ml: "auto" }}>
          <IconButton onClick={editBlogHandler}>
            <AiOutlineEdit size={30} color="#000" />
          </IconButton>
          <IconButton onClick={deleteBlogHandler}>
            <AiOutlineDelete size={30} color="#000" />
          </IconButton>
        </CardActions>
      )}
      <Card sx={bloglistStyles.card} onClick={handleClick}>
        <Box sx={{ ...bloglistStyles.cardHeader, bgcolor: randomColor() }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
            }}
          >
            <FcCalendar size={"25px"} />
            <Typography
              variant="caption"
              fontSize={"20px"}
              sx={{ color: "#fff", display: "flex" }}
            >
              {new Date(Number(blog?.date)).toDateString()}
            </Typography>
          </Box>
          <Typography variant="h4" sx={bloglistStyles.title}>
            {truncateTitleText(blog, 30)}
          </Typography>
        </Box>
        <Box sx={bloglistStyles.cardContent} onClick={handleClick}>
          <Typography sx={bloglistStyles.contentText}>
            {truncateContextText(blog, 100)}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default BlogItem;
