import React, { useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  CircularProgress,
  Snackbar,
  Typography,
  Drawer,
} from "@mui/material";

const ClientForm = ({ updateClienteList, open, onClose }) => {
  const [CPF, setCPF] = useState("");
  const [Nome, setNome] = useState("");
  const [Email, setEmail] = useState("");
  const [Senha, setSenha] = useState("");
  const [Telefone, setTelefone] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSeverity, setMessageSeverity] = useState("success");

  const formatCPF = (cpf) => {
    const cleanedCPF = cpf.replace(/\D/g, "");

    return cleanedCPF.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formatarTelefone = (input) => {
    const numeroLimpo = input.replace(/\D/g, "");

    let numeroFormatado = numeroLimpo;
    if (numeroLimpo.length >= 2) {
      numeroFormatado = `(${numeroLimpo.slice(0, 2)}`;
      if (numeroLimpo.length > 2) {
        numeroFormatado += `) ${numeroLimpo.slice(2, 11)}`;
      }
    }

    return numeroFormatado;
  };

  const handleChangeTelefone = (e) => {
    const numeroDigitado = e.target.value;
    const numeroFormatado = formatarTelefone(numeroDigitado);
    setTelefone(numeroFormatado);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const formattedCPF = formatCPF(CPF);

      if (formattedCPF.length != 14) {
        setMessageText("CPF Inválido!");
        setMessageSeverity("error");
        setOpenMessage(true);
        return;
      }

      if (!isEmailValid(Email)) {
        setMessageText("E-mail Inválido!");
        setMessageSeverity("error");
        setOpenMessage(true);
        return;
      }

      const response = await axios.post("http://localhost:3020/usuario", {
        CPF: formattedCPF,
        Nome,
        Telefone: Telefone,
        Email,
        Senha,
        Tipo: "Cliente",
        AutorizacaoFiado: false,
      });
      setCPF("");
      setNome("");
      setEmail("");
      setSenha("");
      setTelefone("");
      updateClienteList();
      setMessageText("Cliente cadastrado com sucesso!");
      setMessageSeverity("success");
      setOpenMessage(true);
    } catch (error) {
      setMessageText("Falha no cadastro do cliente!");
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
    <Drawer anchor="top" open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          background: "linear-gradient(to top, #ffffff, hsl(213, 100%, 23%))",
        }}
      >
        <Typography
          sx={{
            marginBottom: "40 px",
            textAlign: "center",
            marginTop: "20px",
            color: "white",
          }}
          variant="h4"
        >
          Criar Conta
        </Typography>

        <Stack
          spacing={3}
          style={{ marginTop: "50px" }}
          sx={{ margin: "auto", textAlign: "center", maxWidth: "400px" }}
        >
          <TextField
            required
            label="CPF"
            value={CPF}
            onChange={(e) => setCPF(e.target.value)}
            size="small"
            style={{ backgroundColor: "#fff" }}
          />
          <TextField
            required
            label="Nome Completo"
            value={Nome}
            onChange={(e) => setNome(e.target.value)}
            size="small"
            style={{ backgroundColor: "#fff" }}
          />
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
          <TextField
            label="Telefone Ex:(DD) 999999999"
            value={Telefone}
            onChange={handleChangeTelefone}
            size="small"
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
              style={{ margin: "25px" }}
            >
              {formLoading ? <CircularProgress size={24} /> : "Criar Conta"}
            </Button>

            <Button
              variant="contained"
              type="submit"
              color="error"
              style={{ margin: "25px" }}
              onClick={() => {
                onClose();
                setCPF("");
                setNome("");
                setEmail("");
                setSenha("");
                setTelefone("");
              }}
            >
              Fechar
            </Button>
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
    </Drawer>
  );
};

export default ClientForm;
