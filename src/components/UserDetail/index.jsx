import { useState, useEffect } from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";
import TopBar from "../TopBar";

function UserDetail() {
  const params = useParams();
  const userId = params.userId;
  const [user, setUsers] = useState({});
  useEffect(() => {
    fetchModel(`http://localhost:8081/api/user/${userId}`)
      .then((data) => {
        setUsers(data.user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId])

  return (
    <div className="user-detail-container">
      <TopBar />
      <Card className="user-card" elevation={3}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            About
          </Typography>

          <Typography variant="body1" className="user-info">
            <strong>Fullname:</strong> {user.last_name}
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
