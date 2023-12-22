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

const Comprar = ({ Bebidas, open, onClose }) => {
  const [CodigoProduto, setCodigoProduto] = useState(null);
  const [Quantidade, setnovaQuantidadeBebida] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSeverity, setMessageSeverity] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const bebidaCorrespondente = Bebidas.find(
        (bebida) => bebida.codigoproduto === CodigoProduto
      );

      if (bebidaCorrespondente) {
        const novaQuantidadeBebida =
          parseInt(bebidaCorrespondente.quantidade) + parseInt(Quantidade);

        const response = await axios.put(
          `http://localhost:3020/atualizarBebida/${CodigoProduto}`,
          {
            Quantidade: novaQuantidadeBebida,
          }
        );

        setMessageText("Bebida comprada com sucesso!");
        setMessageSeverity("success");
        setOpenMessage(true);
        setCodigoProduto("");
        setnovaQuantidadeBebida("");
      } else {
        setMessageText("Falha na compra da bebida!");
        setMessageSeverity("error");
        setOpenMessage(true);
        setCodigoProduto("");
        setnovaQuantidadeBebida("");
      }
    } catch (error) {
      setMessageText("Falha na compra da bebida!");
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
          Comprar Bebida
        </Typography>

        <Stack
          spacing={3}
          style={{ marginTop: "50px" }}
          sx={{ margin: "auto", textAlign: "center", maxWidth: "400px" }}
        >
          <TextField
            required
            label="Codigo do Produto"
            value={CodigoProduto}
            onChange={(e) => {
              const inputValue = e.target.value;
              const validInput = /^\d*$/.test(inputValue) ? inputValue : "";
              setCodigoProduto(
                validInput !== "" ? parseInt(validInput, 10) : ""
              );
            }}
            size="small"
            style={{ backgroundColor: "#fff" }}
          />

          <TextField
            required
            label="Quantidade"
            value={Quantidade}
            onChange={(e) => {
              const inputValue = e.target.value;
              const validInput = /^\d*$/.test(inputValue) ? inputValue : "";
              setnovaQuantidadeBebida(
                validInput !== "" ? parseInt(validInput, 10) : ""
              );
            }}
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
              {formLoading ? <CircularProgress size={24} /> : "Comprar"}
            </Button>

            <Button
              variant="contained"
              type="submit"
              color="error"
              style={{ margin: "25px" }}
              onClick={() => {
                onClose();
                setCodigoProduto("");
                setnovaQuantidadeBebida("");
              }}
            >
              Fechar
            </Button>
            <Snackbar
              open={openMessage}
              autoHideDuration={3000}
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

export default Comprar;
