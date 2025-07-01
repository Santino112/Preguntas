import { use, useState } from 'react'
import axios from "axios";
import { Stack, Box, Button, TextField, Typography, InputAdornment, CircularProgress, AlertTitle, IconButton, Alert, Snackbar, Card, CardContent, Skeleton } from '@mui/material';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';

function App() {
  const [respuesta, setRespuesta] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [gif, setGif] = useState("");
  const [severity, setSeverity] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(false);
  const [cargando, setCargando] = useState(false);

  const obtenerRespuesta = async (event) => {
    event.preventDefault();
    setLoading(true);
    setCargando(true);

    const preguntaValida = pregunta.trim();
    const tieneSignos = preguntaValida.startsWith("?") && preguntaValida.endsWith("?");
    const terminaConSigno = preguntaValida.endsWith("?");

    if (!tieneSignos && !terminaConSigno) {
      setTitulo("Error");
      setMensaje("La pregunta debe tener signos de pregunta (¿ y ?)")
      setSeverity("error");
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
      setTitulo("Error");
      setMensaje("La pregunta debe tener signos de pregunta (¿ y ?)")
      setSeverity("error");
    } finally {
      setLoading(false);
      setCargando(false);
    }
  };

  return (
    <Box component="section" sx={{
      height: "100dvh",
      minWidth: "100vw",
      background: 'linear-gradient(115deg, rgba(0, 0, 0, 0.8), rgba(78, 78, 78, 0.7))',
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    }}>
      <Snackbar
        open={Boolean(mensaje)}
        autoHideDuration={3000}
        onClose={() => setMensaje(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: "2rem" }}
      >
        <Alert
          onClose={() => setMensaje(null)}
          variant="filled"
          severity={severity}
          sx={{
            color: "#ffff",
            width: {
              xs: "100%",
              sm: "100%",
              md: 300,
              lg: 400,
              xl: 400
            }
          }}
        >
          {mensaje}
        </Alert>
      </Snackbar>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-around"
        alignItems="center"
        spacing={5}
        sx={{ width: "100%", p: 3 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: { xs: "100%", sm: "100%", md: 500, lg: 500, xl: 500 },
            backgroundColor: "#212121",
            p: 3,
            borderRadius: 2,
            justifyContent: "center",
            height: {
              xs: "auto",
              sm: "auto",
              md: 360,
              lg: 350,
              xl: 300
            },
            backdropFilter: "blur(30px)",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            boxShadow: 6,
          }}
        >
          <Stack spacing={5} direction="column" justifyContent="center" alignItems="center" sx={{ width: "100%", color: "white", fontFamily: "Inter" }}>
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
                Hola, bienvenido de vuelta!
              </Typography>
              <Typography variant="h5" sx={{
                fontSize: {
                  xs: "1.1rem",
                  sm: "1.2rem",
                  md: "1.6rem",
                  lg: "1.5rem",
                  xl: "1.5rem"
                },
                textAlign: "center"
              }}>
                Ingresa una pregunta y te la responderemos con si o no!
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
                {loading ? "Cargando..." : (
                  <>
                    Preguntar
                  </>
                )}
              </Button>
            </Box>
          </Stack>
        </Stack>
        {gif && (
          <Stack sx={{
            position: "relative",
            width: { xs: "100%", sm: "100%", md: 500, lg: 500, xl: 500 },
            backgroundColor: "#212121",
            p: 3,
            borderRadius: 2,
            justifyContent: "center",
            height: {
              xs: "auto",
              sm: "auto",
              md: 360,
              lg: 350,
              xl: 300
            },
            backdropFilter: "blur(30px)",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            boxShadow: 6,
          }}>
            {cargando ? (
              <CircularProgress sx={{
                size: 70,
                textAlign: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }} />
            ) : (
              <>
                <Box
                  component="img"
                  alt="Respuesta de la API"
                  src={gif}
                  sx={{
                    height: {
                      xs: "auto",
                      sm: "auto",
                      md: 360,
                      lg: 350,
                      xl: 300
                    },
                  }}
                >
                </Box>
                <Typography variant="h1" sx={{
                  mb: 1,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: {
                    xs: "1.2rem",
                    sm: "1.2rem",
                    md: "1.9rem",
                    lg: "1.9rem",
                    xl: "1.8rem"
                  },
                  textAlign: "center"
                }}>
                  {respuesta}
                </Typography>
              </>
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  )
}

export default App
