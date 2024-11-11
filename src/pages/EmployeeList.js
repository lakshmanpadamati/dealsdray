import React, { useEffect, useCallback, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Pagination,
  TableContainer,
  TableCell,
  TableRow,
  Box,
  Button,
  TableHead,
  TableBody,
  TextField,
  Typography,
} from "@mui/material";
import Employee from "../components/Employee";
function EmployeeList() {
  const [page, setPage] = useState(1);
  const [searchterm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [totalCount, settotalCount] = useState(1);
  const limit = 10;
  const fetchEmployees = useCallback(async () => {
    const response = await fetch(
      `http://localhost:8000/employees?page=${page}&limit=${limit}&searchterm=${searchterm}`
    );
    if (!response.ok) alert("unable to fetch employees");
    const data = await response.json();
    setEmployees(data.employees);
    settotalCount(data.length);
    console.log(data.length);
  }, [page, searchterm]);
  const handlePageChange = (e, pageno) => {
    console.log(pageno);
    setPage(pageno);
  };
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees, page]);
  const handleDeleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp._id !== id));
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Search</Typography>
          <TextField
            sx={{ margin: 1, width: "300px" }}
            value={searchterm}
            placeholder="Name/Email/Designation"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </Box>
        <Button component={RouterLink} to="/create" variant="contained">
          Create Employee
        </Button>
      </Box>
      {totalCount === 0 ? (
        <div>No employees found </div>
      ) : (
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="center">Profile</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Mobile</TableCell>
              <TableCell align="center">course</TableCell>
              <TableCell align="center">Designation</TableCell>
              <TableCell align="center">Created Date</TableCell>

              <TableCell align="center">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => {
              return (
                <Employee
                  key={employee._id}
                  {...employee}
                  index={index}
                  handleDeleteEmployee={handleDeleteEmployee}
                />
              );
            })}
          </TableBody>
        </TableContainer>
      )}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalCount > 0 && (
          <Pagination
            shape="rounded"
            color="secondary"
            onChange={handlePageChange}
            count={
              parseInt(totalCount / 10, 10) + (totalCount % 10 === 0 ? 0 : 1)
            }
          />
        )}
      </Box>
    </Container>
  );
}

export default EmployeeList;
