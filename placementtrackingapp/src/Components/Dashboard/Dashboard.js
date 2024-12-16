import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import { FileDownload as FileDownloadIcon } from "@mui/icons-material";
import * as XLSX from "xlsx";
import Derejalogo from "../../Images/Derejalogo.png";
import LogoutIcon from "@mui/icons-material/Logout";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const employedCount = data.filter(
    (item) => item.employmentStatus === "Employed"
  ).length;
  const unemployedCount = data.filter(
    (item) => item.employmentStatus === "Unemployed"
  ).length;
  const selfEmployedCount = data.filter(
    (item) => item.employmentStatus === "Self-Employed"
  ).length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3001/api/candidate/show",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",

              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          if (response.status === 401) {
            navigate("/");
            return;
          }
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownload = () => {
    const filteredData = data.map(({ _id, __v, ...rest }) => rest);

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "dashboard_data.xlsx");
  };

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
        <Toolbar>
          <img
            src={Derejalogo}
            alt="Dereja Logo"
            style={{ width: "100px", height: "40px" }}
          />
          <Typography
            sx={{
              flexGrow: 1,
              color: "#000",
              paddingLeft: 4,
              paddingTop: 2,
              textTransform: "none",
            }}
          >
            Dereja Placement Tracking App
          </Typography>
          <Button
            startIcon={<LogoutIcon />}
            sx={{ color: "#000", textTransform: "none" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          onClick={handleDownload}
          sx={{ marginBottom: 3, backgroundColor: "#ff9800", color: "#fff" }}
        >
          Download Excel
        </Button>

        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: "#fff",
                boxShadow: 3,
                borderLeft: "6px solid #ff9800",
              }}
            >
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Employed
                </Typography>
                <Typography variant="h4" color="textPrimary">
                  {employedCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: "#fff",
                boxShadow: 3,
                borderLeft: "6px solid #ff9800",
              }}
            >
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Unemployed
                </Typography>
                <Typography variant="h4" color="textPrimary">
                  {unemployedCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: "#fff",
                boxShadow: 3,
                borderLeft: "6px solid #ff9800",
              }}
            >
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Self-Employed
                </Typography>
                <Typography variant="h4" color="textPrimary">
                  {selfEmployedCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ boxShadow: 3, minWidth: 1000 }}>
          <Table sx={{ minWidth: 1050 }} aria-label="user table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#ff9800" }}>
                <TableCell sx={{ color: "#fff" }}>Full Name</TableCell>
                <TableCell sx={{ color: "#fff" }}>Phone Number</TableCell>
                <TableCell sx={{ color: "#fff" }}>Year of Graduation</TableCell>
                <TableCell sx={{ color: "#fff" }}>Company</TableCell>
                <TableCell sx={{ color: "#fff" }}>Position</TableCell>
                <TableCell sx={{ color: "#fff" }}>Sector</TableCell>
                <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.graduationYear}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.position}</TableCell>
                  <TableCell>{row.sector}</TableCell>
                  <TableCell>{row.employmentStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Dashboard;
