import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Login from "./components/login"
import Signup from "./components/signup"
import {ProtectedRoute} from "./components/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  

  return (


    
    <Router>

      <Navbar />


      <Routes>

        <Route  path="/" element={<ProtectedRoute>
                                       <Main />
                                  </ProtectedRoute>
                                 } 
        />


        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        
      </Routes>


    </Router>







   
  );
};

export default App;
