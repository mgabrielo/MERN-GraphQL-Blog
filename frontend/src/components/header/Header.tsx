import {
  AppBar,
  Box,
  Button,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { headerStyles } from "../../styles/header-styles";
import { ImBlogger } from "react-icons/im";
import { BiLogInCircle } from "react-icons/bi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "./user/UserMenu";
import { FaPlusCircle } from "react-icons/fa";

const Header = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { isLoggedin } = useSelector((state: any) => state.auth);
  return (
    <Box sx={{ flexGrow: 1, zIndex: 50, mb: 12 }}>
      <AppBar sx={headerStyles.appBar}>
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", sm: "none", md: "flex" }, px: 3 }}>
            <ImBlogger
              onClick={() => navigate("/")}
              style={{
                borderRadius: "50%",
                padding: "10px",
                background: "#000",
                cursor: "pointer",
              }}
              size={"30px"}
            />
          </Box>
          {isLoggedin && (
            <Box
              sx={{
                ...headerStyles.addLink,
                justifySelf: { xs: "flex-start", sm: "center", md: "center" },
                width: {
                  xs: "10%",
                  sm: "30%",
                  md: "30%",
                  lg: "30%",
                  xl: "30%",
                },
              }}
              onClick={() => navigate("/add")}
            >
              <Typography
                sx={{
                  fontSize: 17,
                  display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                }}
                fontFamily={"Work Sans"}
              >
                Add New Blog
              </Typography>
              <IconButton sx={{ p: 0.5 }}>
                <FaPlusCircle color="inherit" size={12} />
              </IconButton>
            </Box>
          )}
          <Box sx={headerStyles.tabContainer}>
            <Tabs
              textColor="inherit"
              value={value}
              TabIndicatorProps={{ style: { background: "#fff" } }}
              onChange={(e, val) => setValue(val)}
            >
              {/* @ts-ignore */}
              <Tab LinkComponent={Link} to="/" label="Home" disableRipple></Tab>
              {/* @ts-ignore */}

              <Tab
                LinkComponent={Link}
                to="/blogs"
                label="Blogs"
                disableRipple
              ></Tab>
            </Tabs>
            {isLoggedin ? (
              <UserMenu />
            ) : (
              <Link style={{ textDecoration: "none" }} to={"/auth"}>
                <Button endIcon={<BiLogInCircle />} sx={headerStyles.authBtn}>
                  Auth
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
