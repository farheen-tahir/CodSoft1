import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, TextField, InputLabel, Button } from "@mui/material";

const labelStyle = {
  mb: 1,
  mt: 2,
  fontWeight: "bold",
  fontSize: "24px",
};

const BlogDetail = () => {
  const [blog, setBlog] = useState();
  const id = useParams().id;
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs"));
  };
  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log("data", data);

    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.setBlog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);
  return (
    <div>
      {inputs && (
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
            <Button
              sx={{ mt: 2, borderRadius: 4, color: "#fff", background: "#000" }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};
export default BlogDetail;
