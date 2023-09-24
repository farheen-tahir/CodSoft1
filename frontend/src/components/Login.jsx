import { Button, TextField, Typography, Box } from "@mui/material";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const Login = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs")).then(data=>console.log(data));
    }else {
      sendRequest().then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs")).then(data=>console.log(data));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          maxWidth={400}
          margin={"auto"}
          marginTop={5}
          padding={3}
          boxShadow={"10px 10px 20px #ccc"}
          borderRadius={5}
        >
          <Typography variant="h4" textAlign={"center"} padding={3}>
            {!isSignUp ? "Login" : "SignUp"} To BlogZone
          </Typography>
          {isSignUp && (
            <TextField
              name="name"
              value={inputs.name}
              onChange={handleChange}
              placeholder="Name"
              margin="normal"
            />
          )}
          <TextField
            name="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            value={inputs.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            sx={{
              background: "#000",
              color: "#ffff",
              borderRadius: 3,
              marginTop: 3,
            }}
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignUp(!isSignUp)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change to {isSignUp ? "Login" : "signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};
export default Login;
