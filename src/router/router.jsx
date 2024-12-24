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
          path:'signin',
          element:<SignIn></SignIn>
        },
        {
          path:'register',
          element:<Register></Register>
        },
        {
          path:'addVolunteer',
          element:<AddVolunteer></AddVolunteer>
        }
    ]
  },
]);

export default router;