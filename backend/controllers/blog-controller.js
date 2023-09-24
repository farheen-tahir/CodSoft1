import mongoose, { mongo } from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const getAllBlog = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (error) {
    console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "NO BLOGS FOUND" });
  }
  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "no user by this id" });
  }
  const newBlog = new Blog({ title, description, image, user });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }

  return res.status(201).json({ newBlog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let updateBlog;

  try {
    updateBlog = await Blog.findByIdAndUpdate(blogId, { title, description });
  } catch (error) {
    console.log(error);
  }
  if (!updateBlog) {
    return res.status(500).json({ message: "not updated" });
  }
  return res.status(201).json({ updateBlog });
};

export const getById = async (req, res, next) => {
  const blogId = req.params.id;
  let blog;

  try {
    blog = await Blog.findById(blogId);
  } catch (error) {
    console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "no blog found" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;
  let blog;

  try {
    blog = await Blog.findByIdAndRemove(blogId).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save()
  } catch (error) {
    console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "not deleted" });
  }
  return res.status(200).json({ message:"deleted successfull" });
};
export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
  
    try {
      userBlogs = await User.findById(userId).populate("blogs");
    
    } catch (error) {
      console.log(error);
    }
    if (!userBlogs) {
      return res.status(500).json({ message: "no blogs" });
    }
    return res.status(200).json({user:userBlogs });
  };
