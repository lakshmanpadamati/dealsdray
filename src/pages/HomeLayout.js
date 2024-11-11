import { AppBar, Toolbar, Button, Box } from "@mui/material";
import React, { useContext } from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";

import logo from "./../Unknown.png";
import { AuthContext } from "../context/AuthContext";

function HomeLayout() {
  const { logout, user } = useContext(AuthContext);
  return (
    <>
      <AppBar position="static" color="none" sx={{}}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button component={RouterLink} to="/admin">
            <img src={logo} alt="Logo" style={{ height: "40px" }} />
          </Button>
          <Box sx={{ display: "flex" }}>
            {user && (
              <Box sx={{ display: "flex", direction: "row", gap: 2 }}>
                <Button variant="contained" color="none" sx={{ backgroundColor: "steelgray" }}>
                  {user.charAt(0).toUpperCase() + user.slice(1)}
                </Button>
                <Button component={RouterLink} to="/employees">
                  Employee List
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Button>{" "}
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 0, margin: 0 }}>
        <Outlet />
      </Box>
    </>
  );
}

export default HomeLayout;
