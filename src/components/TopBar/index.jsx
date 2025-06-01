import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function TopBar() {
  const location = useLocation();
  const { userId } = useParams();
  const pageType = location.pathname.split("/")[1];

  const [user, setUser] = useState({});

  useEffect(() => {
    if (userId) {
      fetchModel(`http://localhost:8081/api/user/${userId}`)
        .then((data) => {
          setUser(data.user);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  let contextText = "";
  if (pageType === "users" && user) {
    contextText = `Username ${user.last_name}`;
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
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
