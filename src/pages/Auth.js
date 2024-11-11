import { Container, TextField, Typography, Box, Button, Alert } from "@mui/material";
import React, { useContext, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Auth() {
    const [email,setEmail]=useState("")
  const [password,setPassword]=useState("");
  const { login } = useContext(AuthContext);
  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if (!email || !password) {
        return { error: "Email and password are required" };
      }
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        return; 
      }
    
      const data = await response.json();
      login(data);
      console.log(data)
    navigate("/admin")
  }
  return (
    <div>
        
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Login Page
      </Typography>
      <Container
        maxWidth={false}
        sx={{
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
            gap: 2,
            padding: "2rem",
          }}
        >
          <Form method="post" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Email"
                name="email"
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                placeholder="email"
                type="email"
                fullWidth
              />
              <TextField
                label="Password"
                name="password"
                placeholder="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
        
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Box>
          </Form>
        </Box>
      </Container>
    </div>
  );
}

export default Auth;
