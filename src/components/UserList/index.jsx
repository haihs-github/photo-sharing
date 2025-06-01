import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";
import TopBar from "../TopBar";

function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchModel(`http://localhost:8081/api/user/list`)
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [])

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
