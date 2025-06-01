import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Box,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";

function UserPhotos() {
  const params = useParams();
  const photos = models.photoOfUserModel(params.userId);
  const user = models.userModel(params.userId);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        {user.first_name}'s Photos
      </Typography>

      {photos.map((photo, index) => (
        <Card key={index} sx={{ marginBottom: 3 }}>
          <CardMedia
            component="img"
            image={`/${photo.file_name}`}
            alt={photo.file_name}
            sx={{ maxHeight: 400, objectFit: "contain", backgroundColor: "#eee" }}
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              upload at: {new Date(photo.date_time).toLocaleString()}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              comments:
            </Typography>

            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((comment, idx) => (
                <Paper
                  key={idx}
                  elevation={2}
                  sx={{
                    padding: 1.5,
                    marginBottom: 1,
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {new Date(comment.date_time).toLocaleString()}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {comment.user.first_name} {comment.user.last_name}
                  </Typography>
                  <Typography variant="body2">{comment.comment}</Typography>
                </Paper>
              ))
            ) : (
              <Typography variant="body2">Không có bình luận</Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;
