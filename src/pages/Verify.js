import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QrReader } from "react-qr-reader";

import { collection, query, where } from "firebase/firestore";
import { database } from "../utils/FirebaseInfo";
import logo from "../assets/1.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Votty App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Verify() {
  const verfRef = collection(database, "votty-verf");

  const [data, setData] = useState("No result");

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        > <img src={logo} alt="logo" width={150} />
          <Typography component="h1" variant="h5">
            Verificación de Votos
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  const q = query(verfRef, where("hash", "==", result?.text));
                  if (!q) {
                    setData(<CheckIcon />, "Voto OK");
                  }
                }

                if (!!error) {
                  setData(<CloseIcon />, "Error Voto")
                  console.info(error);
                }
              }}
              style={{ width: "100%" }}
            />
            <p>{data}</p>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
