import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

import models from "../../modelData/models";
import "./styles.css";

function TopBar(location, params) {
  console.log("pageType", window.location.pathname.split("/")[1]);
  console.log("userid:", window.location.pathname.split("/")[2]);
  const pageType = window.location.pathname.split("/")[1];
  const userId = window.location.pathname.split("/")[2];
  const user = models.userModel(userId);
  console.log("user", user);

  let contextText = "";
  if (pageType === "users") {
    contextText = `Username ${user.first_name} ${user.last_name}`;
  } else if (pageType === "photos") {
    contextText = `Photos of ${user.first_name} ${user.last_name}`;
  }


  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
        {/* Bên trái: Tên của bạn */}
        <Typography variant="h6" color="inherit">
          Hoàng Sơn Hải

        </Typography>

        {/* Bên phải: Nội dung ngữ cảnh */}
        <Typography variant="h6" color="inherit">
          {contextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
