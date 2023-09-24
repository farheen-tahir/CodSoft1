import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const labelStyle = {
  mb: 1,
  mt: 2,
  fontWeight: "bold",
  fontSize: "24px",
};
const AddBlog = () => {
    const navigate=useNavigate()
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  const handleChange=(e)=>{
    
    setInputs((prevState)=>({
...prevState,
[e.target.name]:e.target.value
    }))
  }
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/blog/add`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user:localStorage.getItem("userId")
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
   sendRequest().then(()=>navigate("/myBlogs"))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor={"black"}
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display={"flex"}
          flexDirection={"column"}
          width="80%"
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            variant="h2"
            color={"grey"}
            textAlign={"center"}
          >
            POST YOUR BLOG HERE
          </Typography>
          <InputLabel sx={labelStyle}>Title:</InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <InputLabel sx={labelStyle}>Description:</InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <InputLabel sx={labelStyle}>Image URL:</InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <Button sx={{mt:2,borderRadius:4,color:"#fff",background:"#000"}} type="submit">Submit</Button>
        </Box>
      </form>
    </div>
  );
};
export default AddBlog;
