import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useParams, useLocation, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";


function TopBar() {
  const location = useLocation();
  const { userId } = useParams();
  const pageType = location.pathname.split("/")[1];

  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  let decoded = {};
  if (token) {
    decoded = jwtDecode(token);
  }

  useEffect(() => {
    if (userId) {
      fetchModel(`http://localhost:8081/api/user/${userId}`, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      })
        .then((data) => {
          setUser(data.user);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  let contextText = "";
  if (pageType === "users" && user) {
    contextText = `Userdetail: ${user.last_name}`;
  } else if (pageType === "photos") {
    contextText = `Photos of ${user.last_name}`;
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="inherit">
          Hoàng Sơn Hải
        </Typography>
        <Typography variant="h6" color="inherit">
          {contextText}
        </Typography>
        {token ? (
          <Typography variant="h6" color="inherit" component="span"> {/* component="span" để tránh lỗi nesting block elements */}
            Hi {decoded?.login_name}!
            {/* Nút "Add Photo" */}
            <Button
              component={Link} // Sử dụng Link từ react-router-dom
              to="/upload"
              variant="contained" // Kiểu nút chứa nền
              color="secondary" // Màu sắc (có thể là primary, secondary, success, error, info, warning)
              sx={{ ml: 2 }} // margin-left 2 đơn vị
            >
              Add Photo
            </Button>
            {/* Nút "Logout" */}
            <Button
              onClick={handleLogout}
              variant="outlined" // Kiểu nút viền
              color="inherit" // Màu kế thừa từ AppBar (thường là trắng)
              sx={{ ml: 2 }} // margin-left 2 đơn vị
            >
              Logout
            </Button>
          </Typography>
        ) : (
          <Box> {/* Dùng Box để nhóm 2 nút Login/Register */}
            {/* Nút "Login" */}
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              sx={{ mr: 1 }} // margin-right 1 đơn vị
            >
              Login
            </Button>
            {/* Nút "Register" */}
            <Button
              component={Link}
              to="/register"
              variant="outlined"
              color="inherit"
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
