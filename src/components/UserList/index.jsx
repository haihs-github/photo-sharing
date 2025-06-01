import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";
import models from "../../modelData/models";
import { Link } from "react-router-dom";
import "./styles.css";

function UserList() {
  const users = models.userListModel();

  return (
    <div className="user-list-container">
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
                  primary={`${user.first_name} ${user.last_name}`}
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
