import { use, useState } from 'react'
import axios from "axios";
import { Stack, Box, Button, TextField, Typography, InputAdornment, AlertTitle, IconButton, Alert, Snackbar, Card, CardContent } from '@mui/material';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';

function App() {
  const [respuesta, setRespuesta] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [gif, setGif] = useState("");

  const obtenerRespuesta = async (event) => {
    event.preventDefault();

    const preguntaValida = pregunta.trim();
    const tieneSignos = preguntaValida.startsWith("?") && preguntaValida.endsWith("?");
    const terminaConSigno = preguntaValida.endsWith("?");

    if (!tieneSignos && !terminaConSigno) {
      alert("Debe poseer los 2 signos");
      return;
    }

    try {
      const response = await axios.get("https://yesno.wtf/api");
      const res = response.data
      if (res) {
        setRespuesta(res.answer);
        setGif(res.image);
      }
    } catch (error) {
      console.error("Error al obtener infomración:", error)
    }
  };

  return (
    <Box component="section" sx={{
      minHeight: "100vh",
      minWidth: "100vw",
      backgroundImage: 'linear-gradient(115deg, rgba(84, 41, 111, 0.8), rgba(37, 11, 57, 0.7))',
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      overflow: "hidden",
    }}>
      <Stack
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        spacing={5}
        sx={{ width: "100%", p: 3, }}
      >
        <Stack
          direction="row"
          sx={{
            width: { xs: "100%", sm: "100%", md: 500, lg: 500, xl: 500 },
            backgroundColor: "#212121",
            p: 3,
            borderRadius: 2,
            justifyContent: "center",
            height: {
              xs: "auto",
              sm: "auto",
              md: 300,
              lg: 300,
              xl: 300
            },
            backdropFilter: "blur(30px)",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            boxShadow: 6,
          }}
        >
          <Stack spacing={5} direction="column" alignItems="center" sx={{ width: "100%", color: "white", fontFamily: "Inter" }}>
            <Box>
              <Typography variant="h5" sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: {
                  xs: "1.3rem",
                  sm: "1.3rem",
                  md: "1.6rem",
                  lg: "2rem",
                  xl: "2rem"
                },
                textAlign: "center"
              }}>
                Hola bienvenido de vuelta!
              </Typography>
              <Typography variant="h5" sx={{
                mb: 1,
                fontSize: {
                  xs: "1.1rem",
                  sm: "1.2rem",
                  md: "1.6rem",
                  lg: "1.6rem",
                  xl: "1.5rem"
                },
                textAlign: "center"
              }}>
                Ingresa una pregunta y te la responderemos!
              </Typography>
            </Box>
            <Box
              component="form"
              onSubmit={obtenerRespuesta}
              sx={{ width: "100%" }}
            >
              <TextField
                type="text"
                variant="outlined"
                value={pregunta}
                onChange={(e) => setPregunta(e.target.value)}
                placeholder="¿Hoy debería...?"
                InputLabelProps={{ required: false }}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LiveHelpOutlinedIcon style={{ color: "white" }} />
                    </InputAdornment>
                  )
                }}
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  "& label.Mui-focused": { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" }
                  },
                  width: "100%",
                  mb: 4
                }}
              />
              <Button variant="contained" type="submit" sx={{
                cursor: "pointer",
                fontSize: "1rem",
                color: "white",
                backgroundColor: "#2485e9",
                "&:hover": {
                  backgroundColor: "#1f73ca",
                  color: "white",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#1f73ca",
                  color: "white",
                },
                boxShadow: 3,
                width: "100%"

              }} disableElevation>
                Enviar
              </Button>
            </Box>
          </Stack>
        </Stack>
        <Stack
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: {
              xs: "auto",
              sm: "auto",
              md: 300,
              lg: 300,
              xl: 300
            },
            overflowY: "auto",
            backgroundColor: "#121212",
            p: 3,
            borderRadius: 2,
            color: "white",
            backdropFilter: "blur(30px)",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            boxShadow: 6,
            width: { xs: "100%", sm: "100%", md: 500, lg: 500, xl: 500 },
          }}
        >
          <Typography sx={{
            mb: 1,
            fontSize: {
              xs: "1.1rem",
              sm: "1.2rem",
              md: "1.6rem",
              lg: "1.6rem",
              xl: "1.5rem"
            },
            textAlign: "center"
          }}>{respuesta}</Typography>
          {gif && (
            <Box
              component="img"
              alt="Respuesta de la API"
              src={gif}
              sx={{
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: "35%",
                  lg: "40%",
                  xl: "40%",
                },
                backgroundColor: "#f9f9f9",
                boxShadow: 6,
              }}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  )
}

export default App
