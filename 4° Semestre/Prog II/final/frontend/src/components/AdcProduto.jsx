import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Drawer,
  Stack,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Snackbar,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

const ProdutoForm = ({ updateProdutoList, open, onClose }) => {
  const [PrecoVenda, setPrecoVenda] = useState("");
  const [Marca, setMarca] = useState("");
  const [Quantidade, setQuantidade] = useState("");
  const [DataValidade, setDataValidade] = useState("");
  const [CategoriaID, setCategoria] = useState("");
  const [CategoriasList, setCategoriasList] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMessage, setOpenMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSeverity, setMessageSeverity] = useState("success");

  const fetchCategoriaList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3020/categorias");
      setCategoriasList(response.data);
    } catch (error) {
      setError("Erro ao carregar a lista de categorias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriaList();
  }, []);

  const formatarData = (input) => {
    const datalimpa = input.replace(/\D/g, "");

    let dataFormatada = datalimpa;

    if (datalimpa.length >= 2) {
      dataFormatada = `${datalimpa.slice(0, 2)}`;
      if (datalimpa.length > 2) {
        dataFormatada += `/${datalimpa.slice(2, 4)}`;
        if (datalimpa.length > 4) {
          dataFormatada += `/${datalimpa.slice(4, 8)}`;
        }
      }
    }

    return dataFormatada;
  };

  const handleDateChange = (e) => {
    const dataDigitada = e.target.value;
    const dataFormatada = formatarData(dataDigitada);
    setDataValidade(dataFormatada);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const response = await axios.post("http://localhost:3020/produto", {
        PrecoVenda,
        Marca,
        Quantidade,
        DataValidade,
        CategoriaID,
      });
      setPrecoVenda("");
      setMarca("");
      setQuantidade("");
      setDataValidade("");
      setCategoria("");
      updateProdutoList();
      setMessageText("Produto cadastrado com sucesso!");
      setMessageSeverity("success");
      setOpenMessage(true);
    } catch (error) {
      setMessageText("Falha no cadastro do Produto!");
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
          Cadastrar Produto
        </Typography>

        <Stack
          spacing={3}
          style={{ marginTop: "50px" }}
          sx={{ margin: "auto", textAlign: "center", maxWidth: "400px" }}
        >
          <TextField
            required
            label="Preço"
            value={PrecoVenda}
            onChange={(e) => setPrecoVenda(e.target.value)}
            size="small"
            style={{ backgroundColor: "#fff" }}
          />
          <TextField
            required
            label="Marca"
            value={Marca}
            onChange={(e) => setMarca(e.target.value)}
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
              setQuantidade(validInput !== "" ? parseInt(validInput, 10) : "");
            }}
            size="small"
            style={{ backgroundColor: "#fff" }}
          />
          <TextField
            required
            label="Validade (DD/MM/AAAA)"
            value={DataValidade}
            onChange={handleDateChange}
            size="small"
            style={{ backgroundColor: "#fff" }}
          />
          <FormControl fullWidth>
            <InputLabel id="label">Categoria</InputLabel>
            <Select
              required
              labelId="label"
              value={CategoriaID}
              onChange={(e) => setCategoria(e.target.value)}
              style={{ height: "50px", backgroundColor: "#fff" }}
            >
              {CategoriasList.map((opcao, index) => (
                <MenuItem key={index} value={opcao.id}>
                  {opcao.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
              {formLoading ? <CircularProgress size={24} /> : "Cadastrar"}
            </Button>

            <Button
              variant="contained"
              type="submit"
              style={{ margin: "25px" }}
              color="error"
              onClick={() => {
                onClose();
                setPrecoVenda("");
                setMarca("");
                setQuantidade("");
                setDataValidade("");
                setCategoria("");
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

export default ProdutoForm;
