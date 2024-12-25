import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Mainlayout from '../layout/Mainlayout';
import Home from '../pages/Home/Home';
import SignIn from '../pages/SignIn/SignIn';
import Register from '../pages/register/Register';
import AddVolunteer from '../pages/addVolunteer/addVolunteer';
import AllVolunteers from '../pages/AllVolunteer/AllVolunteers';
import VolunteerDetails from '../pages/volunteerDetails/VolunteerDetails';
import PrivateRoute from './PrivateRoute';
import UserAddedVolunteer from '../pages/userAddedvolunteer/UserAddedVolunteer';
import MyVolunteerNeedPost from '../pages/MyVolunteerNeedPost/MyVolunteerNeedPost';
import UpdateVolunteerneedPost from '../pages/updateVolunteerneedPost/UpdateVolunteerneedPost';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    errorElement: <h2>Route Not Found</h2>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/allvolunteer',
          element:<AllVolunteers></AllVolunteers>
        },
        {
          path:'volunteerDetails/:id',
          element:<PrivateRoute><VolunteerDetails></VolunteerDetails></PrivateRoute>,
          loader:({params})=>fetch(`http://localhost:5000/allvolunteer/${params.id}`)
        },
        {
          path:'useraddedvolunteer',
          element:<PrivateRoute><UserAddedVolunteer></UserAddedVolunteer></PrivateRoute>
        },
        {
          path:'myvolunteerneedpost',
          element:<PrivateRoute><MyVolunteerNeedPost></MyVolunteerNeedPost></PrivateRoute>
        },
        {
          path:'updatevolunteerneedpost/:id',
          element:
            <UpdateVolunteerneedPost></UpdateVolunteerneedPost>
         ,
          loader:({params})=>fetch(`http://localhost:5000/useraddedvolunteer/${params.id}`)

        },
        {
          path:'signin',
          element:<SignIn></SignIn>
        },
        {
          path:'register',
          element:<Register></Register>
        },
        {
          path:'addVolunteer',
          element:<PrivateRoute><AddVolunteer></AddVolunteer></PrivateRoute>
        }
    ]
  },
]);

export default router;