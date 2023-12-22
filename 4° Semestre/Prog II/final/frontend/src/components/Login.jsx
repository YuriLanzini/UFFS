import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdcCliente from "./AdcCliente";

const Login = (props) => {
  const [ListaCliente, setListaCliente] = useState([]);
  const [clienteAberto, setclienteAberto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Email, setEmail] = useState("");
  const [Senha, setSenha] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSeverity, setMessageSeverity] = useState("success");
  const navigate = useNavigate();

  const fetchClienteList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3020/usuario");
      setListaCliente(response.data);
    } catch (error) {
      setError("Erro ao carregar a lista de Administradores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClienteList();
  }, []);

  const handleToggleCliente = () => {
    setclienteAberto(!clienteAberto);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const response = await axios.post("http://localhost:3020/login", {
        username: Email,
        password: Senha,
      });

      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem("token", response.data.token);

        const clienteResponse = await axios.get(
          "http://localhost:3020/cliente",
          {
            headers: {
              Authorization: `Bearer ${response.data.token}`,
            },
          }
        );

        const clienteInfo = clienteResponse.data;

        localStorage.setItem("Tipo", clienteInfo.tipo);

        props.onLogin();

        if (clienteInfo.tipo === "Cliente") {
          navigate("/bebidas", { state: { clienteInfo } });
        }
        if (clienteInfo.tipo === "Admin") {
          navigate("/adm", { state: { clienteInfo } });
        }
      } else {
        console.error("Falha na autenticação");
      }
    } catch (error) {
      setMessageText("Email ou senha incorreto");
      setMessageSeverity("error");
      setOpenMessage(true);
    } finally {
      setFormLoading(false);
    }
  };

  function handleCloseMessage(_, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  }

  return (
    <div>
      <header id="header">
        <div>
          <h1>Distribuidora de Bebidas</h1>
        </div>
      </header>

      <Box
        sx={{
          width: "50%",
          margin: "0 auto",
          textAlign: "center",
          marginTop: "20px",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography
          style={{ marginBottom: "50px", marginTop: "120px" }}
          variant="h4"
        >
          Login
        </Typography>

        <Stack
          spacing={3}
          sx={{ margin: "auto", textAlign: "center", maxWidth: "400px" }}
        >
          <TextField
            required
            label="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
            style={{ backgroundColor: "#fff" }}
          />
          <TextField
            required
            label="Senha"
            value={Senha}
            onChange={(e) => setSenha(e.target.value)}
            size="small"
            type="password"
            style={{ backgroundColor: "#fff" }}
          />
          <Stack
            direction="row"
            justifyContent="center"
            width="100%"
            spacing={4}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={formLoading}
              color="primary"
            >
              {formLoading ? <CircularProgress size={24} /> : "Login"}
            </Button>

            <Button onClick={handleToggleCliente}>Criar Conta</Button>

            <Snackbar
              open={openMessage}
              autoHideDuration={6000}
              onClose={handleCloseMessage}
            >
              <Alert severity={messageSeverity} onClose={handleCloseMessage}>
                {messageText}
              </Alert>
            </Snackbar>
          </Stack>
        </Stack>
      </Box>

      <AdcCliente
        updateClienteList={fetchClienteList}
        open={clienteAberto}
        onClose={handleToggleCliente}
      />
    </div>
  );
};

export default Login;
