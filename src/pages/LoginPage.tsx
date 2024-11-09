import Header from "../components/Header";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import muralImage from "../assets/photos/mural.png";
import GoogleOAuthButton from "../components/GoogleOAuthButton.tsx";


const LoginPage = () => {
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
                  top: "45%",
                  left: "40%",
                  width: "auto",
                  height: "auto",
                  paddingBottom: "3rem",
                  backgroundColor: "white",
                  borderRadius: 4,
                  overflow: "hidden",
              }}>
              <Container maxWidth="xs">
                  <Box sx={{mt: 4}}>
                      <Typography variant="h4" align="center" color={"black"}>Login</Typography>
                      <TextField label="Email" fullWidth margin="normal"/>
                      <TextField label="Password" type="password" fullWidth margin="normal"/>
                      <Button variant="contained" color="primary" sx={{backgroundColor: "rgba(212, 111, 38, 0.9)"}} fullWidth>
                          Login
                      </Button>
                      <Typography align="center" sx={{mt: 2, color: "black", paddingBottom: "1rem"}}>
                          OR
                      </Typography>
                      <GoogleOAuthButton/>
                  </Box>
              </Container>
          </Box>
      </Box>
  )
};


export default LoginPage