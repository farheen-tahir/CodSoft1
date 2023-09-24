import axios from "axios";
import { useEffect, useState } from "react";
import Blog from "./Blog";
const Blogs = () => {
    const [blogs,setBlogs]=useState();
    const sendRequest = async () => {
        const res = await axios.get(`http://localhost:5000/api/blog`)
          .catch((err) => console.log(err));
        const data = await res.data;
        return data
      };
      useEffect(()=>{
        sendRequest().then((data)=>setBlogs(data.blogs))
       
      },[])
  return (
    <div>{
    blogs&&blogs.map((blog,index)=>{
        return <Blog id={blog._id} isUser={localStorage.getItem("userId")===blog.user._id} key={index} title={blog.title} description={blog.description} image={blog.image} user={blog.user.name}/>
    })}</div>
  )
}
export default Blogs