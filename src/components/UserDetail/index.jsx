import React from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css"; // Gợi ý: dùng SCSS hoặc module CSS để dễ quản lý

function UserDetail() {
  const params = useParams();
  const user = models.userModel(params.userId);

  return (
    <div className="user-detail-container">
      <Card className="user-card" elevation={3}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            About {user.first_name}
          </Typography>

          <Typography variant="body1" className="user-info">
            <strong>Fullname:</strong> {user.first_name} {user.last_name}
          </Typography>

          <Typography variant="body1" className="user-info">
            <strong>Location:</strong> {user.location}
          </Typography>

          <Typography variant="body1" className="user-info">
            <strong>Description:</strong> {user.description}
          </Typography>

          <Typography variant="body1" className="user-info">
            <strong>Occupation:</strong> {user.occupation}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/photos/${user._id}`}
            className="see-photo-button"
          >
            See my photos
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserDetail;
