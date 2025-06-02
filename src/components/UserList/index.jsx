import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";
import TopBar from "../TopBar";

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Di chuyển logic kiểm tra đăng nhập vào useEffect
    const token = localStorage.getItem("token");
    if (!token) {
      return
    }

    fetchModel(`http://localhost:8081/api/user/list`, {
      Authorization: `Bearer ${token}`, // Sử dụng token từ localStorage
    })
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // Xử lý lỗi fetch data, có thể điều hướng hoặc hiển thị thông báo
      });
  }, [navigate]); // Thêm navigate vào dependency array

  return (
    <div className="user-list-container">
      <TopBar />
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <Paper elevation={3} className="user-list-paper">
        <List>
          {users.map((user) => (
            <React.Fragment key={user._id}>
              <ListItem
                button
                component={Link}
                to={`/users/${user._id}`}
                className="user-list-item"
              >
                <ListItemText
                  primary={`${user.last_name}`}
                  secondary={`Click to view details`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </div>
  );
}

export default UserList;