import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Blog = ({id,title,description,image,user,isUser}) => {
    const navigate=useNavigate();
    const handleEdit=(e)=>{
navigate(`/myBlogs/${id}/`)
    }
    const handleDelete=(e)=>{
        deleteRequest()
        .then((data) => console.log(data))
        .then(() => navigate("/myBlogs"));
    }
    
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data
  };
  return (
    <div>
      <Card sx={{ width: "40%", margin:"auto",marginTop:2,padding:2,boxShadow:"5px 5px 10px #ccc",":hover":{
        boxShadow:"10px 10px 20px #ccc"
      } }}>
      {isUser&&(
        <Box display={"flex"}><IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}><EditIcon /></IconButton>
        <IconButton onClick={handleDelete}><DeleteIcon /></IconButton></Box>
      )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {user && user.charAt(0).toUpperCase() }
            </Avatar>
          }
        
          title={title}
          subheader="September 14, 2016"
        />
        
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt={user}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
        <b>{user}</b>{": "}{description}
          </Typography>
        </CardContent>
        
      </Card>
    </div>
  );
};

export default Blog;
