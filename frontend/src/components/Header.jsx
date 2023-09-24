import {AppBar,Button,Toolbar, Typography,Box, Tabs, Tab} from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { authActions } from "../store"

const Header = () => {
  const dispatch=useDispatch();
  const [value,setValue]=useState(0)
  const isLoggedIn=useSelector(state=>state.isLoggedIn)

  return (
    <AppBar position="sticky" sx={{background:"black"}}>
        <Toolbar>
            <Typography variant="h4">BlogZone</Typography>
            {isLoggedIn &&<Box display="flex" marginLeft="auto" marginRight="auto">
              <Tabs textColor="inherit" value={value} onChange={(e,val)=>setValue(val)}>
              
               <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
               <Tab LinkComponent={Link} to="/myblogs" label="My Blogs"/>
               <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog"/>

              </Tabs>
            </Box>}
            <Box display="flex" marginLeft="auto">
             {!isLoggedIn &&<> <Button LinkComponent={Link} to="/auth" sx={{color:"white",margin:1,borderRadius:10}}>Login</Button>
              <Button LinkComponent={Link} to="/auth" sx={{color:"white",margin:1,borderRadius:10}}>SignUp</Button>
              </>}{isLoggedIn &&<Button onClick={()=>dispatch(authActions.logout())} LinkComponent={Link} to="/auth" sx={{color:"white",margin:1,borderRadius:10}}>Logout</Button>
              }</Box>
        </Toolbar>
    </AppBar>
  )
}
export default Header