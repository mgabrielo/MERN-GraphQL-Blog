import { Box, Button, Typography } from "@mui/material";
import { homepageStyles } from "../../styles/homepage-styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const navigate = useNavigate();
  const { isLoggedin } = useSelector((state: any) => state.auth);
  return (
    <Box sx={homepageStyles.footerContainer}>
      {isLoggedin && (
        <Button
          variant="contained"
          sx={homepageStyles.footerButton}
          onClick={() => navigate("/blogs")}
        >
          View Blogs
        </Button>
      )}
      <Typography sx={homepageStyles.footerText}>
        Made With Love &#x1F498; By Grey
      </Typography>
      {isLoggedin && (
        <Button
          variant="contained"
          sx={homepageStyles.footerButton}
          onClick={() => navigate("/add")}
        >
          Publish One
        </Button>
      )}
    </Box>
  );
};

export default Footer;
