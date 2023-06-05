import { createBrowserRouter } from "react-router-dom";
import Main from "../../Component/Main/Main";
import Home from "../../Pages/Home/Home";

import Dashboard from "../../Pages/Dashboard/Dashboard";
import SignIn from "../../Pages/SignIn/SignIn";
import SignUp from "../../Pages/SignUp/SignUp";
import AddPost from "../../Pages/Dashboard/AddPost/AddPost";
import EditProfile from "../../Pages/Dashboard/EditProfile/EditProfile";
import DashboardHome from "../../Pages/Dashboard/DasboardHome/DashboardHome";
import AddCategory from "../../Pages/Dashboard/AddCategory/AddCategory";
import PostDetails from "../../Pages/Home/Posts/PostDetails/PostDetails";
// import SaveWorkout from "../../Pages/Dashboard/SaveWorkout/SaveWorkout";
import MySavedWorkout from "../../Pages/Dashboard/MySavedWorkout/MySavedWorkout";
import MyAllPost from "../../Pages/Dashboard/MyAllPost/MyAllPost";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {

        path: "/postDetails/:id",
        element: <PostDetails></PostDetails>,
        loader: ({ params }) =>
        fetch(
          `http://localhost:5000/getPost/${params?.id}`
        ),
      },
     
      {
        path: "/Login",
        element: <SignIn></SignIn>,
      },
      {
        path: "/Register",
        element: <SignUp></SignUp>,
      },
      
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children:[{
          path: "/dashboard",
          element: <DashboardHome></DashboardHome>,
        },
          {
            path: "/dashboard/editProfile",
            element: <EditProfile></EditProfile>,
          },
          {
          path: "/dashboard/addPost",
          element: <AddPost></AddPost>
        },
        {
          path: "/dashboard/addCategory",
          element: <AddCategory></AddCategory>,
        },
        {
          path: "/dashboard/myAllPosts",
          element: <MyAllPost></MyAllPost>
        },
      
        {
          path: "/dashboard/mySaveWorkout",
          element: <MySavedWorkout></MySavedWorkout>
        },
      ],
      },
    ],
  },
]);
export default router;
