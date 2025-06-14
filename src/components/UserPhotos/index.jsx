import { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Paper,
  TextField,
  Button
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import TopBar from "../TopBar";
import axios from "axios";

function UserPhotos() {
  const params = useParams();
  const userId = params.userId;
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reloadComments, setReloadComments] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }
  checkLogin();

  useEffect(() => {
    fetchModel(`http://localhost:8081/api/user/${userId}`, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    })
      .then((data) => {
        console.log('data.user', data.user);
        setUser(data.user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId])

  useEffect(() => {
    fetchModel(`http://localhost:8081/api/photo/photosOfUser/${userId}`, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    })
      .then((data) => {
        console.log('data.photos', data.photos);
        setPhotos(data.photos);
      })
      .catch((error) => {
        console.error("Error fetching photos data:", error);
      });
  }, [userId, reloadComments])

  const handleAddComment = async (photo_id) => {
    await axios.post(`http://localhost:8081/api/comments/commentsOfPhoto/${photo_id}`, {
      comment: newComment
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    setNewComment(""); // Reset the comment input field
    setReloadComments(!reloadComments); // Trigger a reload of comments
  }

  return (
    <Box sx={{ padding: 3 }}>
      <TopBar />
      <Typography variant="h5" gutterBottom>
        {user.last_name}'s Photos
        <br />
        {photos.length} photos
      </Typography>
      {photos.map((photo, index) => (
        <Card key={index} sx={{ marginBottom: 3 }}>
          <CardMedia
            component="img"
            image={photo.file_name.startsWith('http') ? photo.file_name : `/${photo.file_name}`}
            alt={photo.file_name}
            sx={{ maxHeight: 400, objectFit: "contain", backgroundColor: "#eee" }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                <TextField
                  fullWidth // Chiếm toàn bộ chiều rộng có sẵn
                  variant="outlined" // Kiểu đường viền
                  size="small" // Kích thước nhỏ gọn
                  placeholder="Add a comment..."
                  name="comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  sx={{ flexGrow: 1 }} // Cho phép TextField mở rộng
                />
                <Button
                  variant="contained" // Kiểu nút có nền
                  onClick={() => handleAddComment(photo._id)} // Hàm xử lý khi nhấn nút
                >
                  Add
                </Button>
              </Box>
            </Typography>
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
                    {comment.user_id.last_name}
                    {console.log('comment.user_id', comment.user_id.last_name)}
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
