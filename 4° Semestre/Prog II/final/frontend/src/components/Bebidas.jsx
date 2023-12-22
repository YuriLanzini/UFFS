import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Snackbar,
  Alert,
  Box,
  Stack,
} from "@mui/material";
import Carrinho from "./Carrinho";

const ListaBebidas = ({ onLogout }) => {
  const [Bebidas, setBebidas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [openMessage, setOpenMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSeverity, setMessageSeverity] = useState("success");
  const navigate = useNavigate();
  const location = useLocation();
  const clienteInfo = location.state?.clienteInfo;
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  const fetchBebidaList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3020/bebidas");
      setBebidas(response.data);
    } catch (error) {
      setError("Erro ao carregar a lista de bebidas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBebidaList();
  }, []);

  const handleLogoutClick = () => {
    onLogout();
  };

  const addToCart = (bebida) => {
    if (cart.some((item) => item.codigoproduto === bebida.codigoproduto)) {
      setMessageText("Bebida já está no carrinho!");
      setMessageSeverity("warning");
    } else {
      setCart([...cart, bebida]);
      setMessageText("Bebida Adicionada!");
      setMessageSeverity("success");
    }

    setOpenMessage(true);
  };

  const atualizarCarrinho = (novoCarrinho) => {
    setCart(novoCarrinho);
  };

  const handleToggleCarrinho = () => {
    setCarrinhoAberto(!carrinhoAberto);
  };

  function handleCloseMessage(_, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  }

  const PagarDebito = () => {
    navigate("/pagardebito", { state: { clienteInfo } });
  };

  return (
    <div>
      <header>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          style={{ marginBottom: "20px" }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={handleLogoutClick}
            style={{ marginLeft: "20px" }}
          >
            Sair da Conta
          </Button>
        </Box>

        <Typography style={{ alignSelf: "flex-start" }} variant="h3">
          Bem-vindo, {clienteInfo.nome}!
        </Typography>

        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          <Stack direction="row" spacing={2}>
            {clienteInfo.autorizacaofiado && (
              <Button variant="contained" color="primary" onClick={PagarDebito}>
                Pagar contas em débito
              </Button>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleToggleCarrinho}
            >
              Ir para o Carrinho
            </Button>
          </Stack>
        </Box>
      </header>

      <Grid style={{ marginTop: "20px" }} container spacing={5}>
        {Bebidas.map((bebida) =>
          bebida.quantidade > 0 ? (
            <Grid item key={bebida.CodigoProduto} xs={12} sm={6} md={3}>
              <Card style={{ margin: "10px" }}>
                <CardMedia
                  component="img"
                  alt={bebida.marca}
                  height="250"
                  image={bebida.ImagemUrl}
                />
                <CardContent>
                  <Typography variant="h6">{bebida.marca}</Typography>
                  <Typography variant="body1">R${bebida.precovenda}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(bebida)}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ) : null
        )}
      </Grid>
      <Snackbar
        open={openMessage}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
      >
        <Alert severity={messageSeverity} onClose={handleCloseMessage}>
          {messageText}
        </Alert>
      </Snackbar>
      <Carrinho
        cart={cart}
        clienteInfo={clienteInfo}
        setCart={atualizarCarrinho}
        open={carrinhoAberto}
        onClose={handleToggleCarrinho}
      />
    </div>
  );
};

export default ListaBebidas;
