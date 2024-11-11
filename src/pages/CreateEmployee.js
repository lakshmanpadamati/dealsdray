import {
  Box,
  Radio,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Avatar,
  Button,
  FormLabel,
  InputLabel,
  Container,
  Checkbox,
  Select,
  TextField,
  MenuItem,
  FormGroup,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

function CreateEmployee() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [designation, setDesignation] = useState("Designation");
  const [gender, setGender] = useState("female");
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // Handlers for updating state
  const handleDesignation = (e) => setDesignation(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setCourse((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  // Fetch employee data for update if id exists
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/employees/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setEmail(data.email);
          setMobile(data.mobile);
          setAge(data.age);
          setDesignation(data.designation);
          setGender(data.gender);
          setCourse(data.courses);
          setImageUrl("http://localhost:8000/images/" + data.image); // Set image URL for update
        })
        .catch((error) => console.error("Error fetching employee:", error));
    }
  }, [id]);

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("age", age);
    formData.append("designation", designation);
    formData.append("gender", gender);
    formData.append("courses", course);

    // Append the image if available (either file or URL)
    if (image) formData.append("image", image);

    try {
      const url = id
        ? `http://localhost:8000/employees/${id}` // Update route
        : "http://localhost:8000/employees"; // Create route
      const method = id ? "PUT" : "POST"; // Determine method based on id presence
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        return alert(error.error);
      }
     
      alert(id ? "Employee updated successfully!" : "Employee created successfully!");
    } catch (error) {
      alert("Failed to save employee");
    }
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h5">{id ? "Update " : "Create "}Employee</Typography>
      <form onSubmit={handleSubmit}>
        <Box>
          <InputLabel id="name">Name</InputLabel>
          <TextField
            name="name"
            placeholder="name"
            labelId="name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box>
          <InputLabel id="email">Email</InputLabel>
          <TextField
            name="email"
            placeholder="Email"
            labelId="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <InputLabel id="age">Age</InputLabel>
          <TextField
            name="age"
            placeholder="age"
            labelId="age"
            fullWidth
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Box>
        <Box>
          <InputLabel id="mobile">Mobile</InputLabel>
          <TextField
            fullWidth
            name="mobile"
            placeholder="mobile"
            labelId="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </Box>
        <Box>
          <InputLabel id="Designation">Designation</InputLabel>
          <Select
            fullWidth
            label="Designation"
            value={designation}
            onChange={handleDesignation}
            renderValue={(selected) => (selected ? selected : "Select")}
          >
            <MenuItem value="Hr">Hr</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
          </Select>
        </Box>
        <Box>
          <FormControl>
            <FormLabel id="gender-group">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender-group"
              value={gender}
              onChange={handleGenderChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box>
          <FormLabel>Course</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox />}
              value="BCA"
              label="BCA"
              checked={course.includes("BCA")}
              onChange={handleCourseChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              value="MCA"
              label="MCA"
              checked={course.includes("MCA")}
              onChange={handleCourseChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              value="BSC"
              label="BSC"
              checked={course.includes("BSC")}
              onChange={handleCourseChange}
            />
          </FormGroup>
        </Box>

        {imageUrl && !image && (
          <Avatar src={imageUrl} alt="Employee Image" sx={{ width: 100, height: 100 }} />
        )}
        {image && (
          <Avatar
            src={URL.createObjectURL(image)}
            alt="Employee Image"
            sx={{ width: 100, height: 100 }}
          />
        )}

        <FormLabel>Upload Image</FormLabel>
        <Button variant="outlined" component="label">
          Choose Image
          <input
            type="file"
            hidden
            onChange={handleImageChange}
            accept="image/jpeg, image/png"
          />
        </Button>
        <Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            sx={{
              margin: "1rem",
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default CreateEmployee;
