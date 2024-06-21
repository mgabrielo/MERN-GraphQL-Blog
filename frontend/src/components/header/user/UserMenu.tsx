import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { FaUserNurse } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../../../store/authSlice";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const handleLogout = () => {
    dispatch(authLogout());
    navigate("/auth");
  };
  const onProfileClick = () => {
    navigate("/profile");
  };
  return (
    <Box>
      <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <FaUserNurse />
      </IconButton>
      <Menu
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
      >
        <MenuItem
          onClick={() => {
            onProfileClick();
            setAnchorEl(null);
          }}
        >
          <Typography>Profile</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleLogout();
            setAnchorEl(null);
          }}
        >
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
