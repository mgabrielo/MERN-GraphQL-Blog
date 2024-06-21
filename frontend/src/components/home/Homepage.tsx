import { Box, Typography } from "@mui/material";
import { homepageStyles } from "../../styles/homepage-styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import imgPublish from "../../images/publish.png";
const Homepage = () => {
  const navigate = useNavigate();
  const { isLoggedin } = useSelector((state: any) => state.auth);

  return (
    <Box sx={homepageStyles.container}>
      <Box
        sx={{ ...homepageStyles.wrapper, cursor: "pointer" }}
        onClick={() => (isLoggedin ? navigate("/add") : navigate("/auth"))}
      >
        {imgPublish && (
          <img
            src={imgPublish}
            width={"50%"}
            height={"50%"}
            // @ts-ignore
            style={{
              ...homepageStyles.image,
              filter: "blur(0.5px)",
            }}
            alt="publish"
          />
        )}
        <Typography sx={homepageStyles.text}>
          Write and Share Your Blog With Everyone
        </Typography>
      </Box>
    </Box>
  );
};

export default Homepage;
