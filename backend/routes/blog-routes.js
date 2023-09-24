import  express  from "express";
import { addBlog, getAllBlog,updateBlog ,deleteBlog, getById, getByUserId} from "../controllers/blog-controller.js";
const blogRouter=express.Router()
blogRouter.get("/",getAllBlog);
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.get("/:id",getById);
blogRouter.delete("/:id",deleteBlog);
blogRouter.get("/user/:id",getByUserId);


export default blogRouter;
