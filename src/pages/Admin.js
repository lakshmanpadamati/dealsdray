import { Container, Typography } from "@mui/material";
import React from "react";

function Admin() {
  return (
    <Container sx={{ textAlign: "center" }}>
      {" "}
      <Typography component="h1" variant="h3">Admin Panel</Typography>
    </Container>
  );
}

export default Admin;
