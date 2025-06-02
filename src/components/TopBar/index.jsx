import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
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
  if (token) {
    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded);
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
        {token ? <Typography variant="h6" color="inherit">
          <Link to="/login"><button onClick={handleLogout}>logout</button></Link>
        </Typography>
          : <Typography variant="h6" color="inherit">
            <Link to="/login"><button>login</button></Link>
            <Link to="/register"><button>register</button></Link>
          </Typography>}

      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
