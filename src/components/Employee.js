import React from "react";
import { TableRow, TableCell, Button, Avatar } from "@mui/material";
import {Link as RouterLink} from 'react-router-dom'
function Employee({
  updateEmployees,
 _id,
  name,
  image,
  index,
  email,
  mobile,
  age,
  designation,
  gender,
  courses,
  createdAt,
})
 {

  const deleteEmployee = async (id) => {
    const response = await fetch("http://localhost:8000/employees/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  id }),
    });
    if (response.ok) {
   
      alert("Employee deleted successfully")
    } else {
      alert("Could not delete employee. Try again!");
    }
  };

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Avatar
          sx={{ width: 56, height: 56 }}
          src={`http://localhost:8000/images/${image}`}
        />
      </TableCell>
      <TableCell align="center">{name}</TableCell>
      <TableCell align="center">{email}</TableCell>
      <TableCell align="center">{age}</TableCell>
      <TableCell align="center">{gender}</TableCell>
      <TableCell align="center">{mobile}</TableCell>
      <TableCell align="center">{courses.join(", ")}</TableCell>
      <TableCell align="center">{designation}</TableCell>
      <TableCell align="center">{createdAt.split("T")[0]}</TableCell>

      <TableCell align="center" sx={{display:"flex"}}>
        <Button  component={RouterLink} size="small" variant="contained" to={`/edit/${_id}`}>Edit</Button>
        <Button
        variant="contained" color="error"
          onClick={() => {
            deleteEmployee(_id);
          }}
        >
          Delete{" "}
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default Employee;
