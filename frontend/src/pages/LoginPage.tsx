import Header from "../components/Header";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import muralImage from "../assets/photos/mural.png";
import StyledGoogleButton from "../components/StyledGoogleButton.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { resolveSoa } from "dns";

//API callovi se trebaju raditi preko enviroment varijabli jer deployana aplikacija ne salje zahtjeve na localHost
const API_BASE_URL = import.meta.env.VITE_BASE || 'http://localhost:8080';

const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();
  
    const handleLogin = async (event: React.FormEvent) => {
      event.preventDefault();
      if (!email || !password) {
        setError("Please enter both username and password.");
        return;
      }
      
      /*
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);
      */
      try {
        const response = await fetch(`${API_BASE_URL}/login?username=${email}&password=${password}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          /*
          body: formData.toString()
          */
        });
        if (response.ok) {
          console.log("Login successful!");
          navigate("/mapRegistered")
        } else {
          const data = await response.json();
          setError(data.message || "Login failed. Please try again.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
        console.error("Login request error:", error);
      }
    };

  return (
      <Box
          sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${muralImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              textAlign: "center",
              height: "100vh",
              width: "100%",
          }}
      >
          <Header/>
          <Box
              sx={{
                  position: "absolute",
                  top: "30%",
                  width: "auto",
                  height: "auto",
                  paddingBottom: "3rem",
                  backgroundColor: "white",
                  borderRadius: 4,
                  overflow: "hidden",
              }}>
                
              <Container maxWidth="xs">
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" color={"black"}>
              Login
            </Typography>
            {error && (
              <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <form onSubmit={handleLogin}>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ backgroundColor: "rgba(212, 111, 38, 0.9)" }}
                fullWidth
              >
                Login
              </Button>
            </form>
            <Typography align="center" sx={{ mt: 2, color: "black", paddingBottom: "1rem" }}>
              OR
            </Typography>
            <StyledGoogleButton />
          </Box>
        </Container>
          </Box>
      </Box>
  )
};


export default LoginPage