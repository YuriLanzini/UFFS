import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Carrinho = ({ cart, clienteInfo, setCart, onClose, open }) => {
  const [quantidades, setQuantidades] = useState(0);
  const navigate = useNavigate();
  const [openMessage, setOpenMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSeverity, setMessageSeverity] = useState("success");

  const handleRemoveItem = (index) => {
    const updatedQuantidades = { ...quantidades };
    delete updatedQuantidades[index];
    setQuantidades(updatedQuantidades);

    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleAddQuantity = (index, item) => {
    const quantidadeAtual = quantidades[index] || 1;

    if (quantidadeAtual < item.quantidade) {
      setQuantidades((prevQuantidades) => ({
        ...prevQuantidades,
        [index]: quantidadeAtual + 1,
      }));
    } else {
      setOpenMessage(true);
      setMessageText("Quantidade máxima de estoque da bebida atingida.");
      setMessageSeverity("warning");
    }
  };

  const handleRemoveQuantity = (index) => {
    setQuantidades((prevQuantidades) => {
      const updatedQuantidade = (prevQuantidades[index] || 0) - 1;
      const newQuantidades = { ...prevQuantidades };
      if (updatedQuantidade > 0) {
        newQuantidades[index] = updatedQuantidade;
      } else {
        delete newQuantidades[index];
      }
      return newQuantidades;
    });
  };

  const calcularTotal = () => {
    let total = 0;
    cart.forEach((item, index) => {
      const quantidade = quantidades[index] || 1;
      total += item.precovenda * quantidade;
    });
    total = parseFloat(total.toFixed(2));
    return total;
  };

  function generateRandomID() {
    return Math.floor(Math.random() * 1000000);
  }

  const IrPedido = async () => {
    if (cart.length === 0) {
      setMessageText("Carrinho está vazio.");
      setMessageSeverity("warning");
      setOpenMessage(true);
      return;
    }
    try {
      const OrderID = generateRandomID();

      const pedidos = await axios.post("http://localhost:3020/pedido", {
        ID: OrderID,
        CPF: clienteInfo.cpf,
        Total: calcularTotal(),
        Finalizado: false,
      });

      const ItensProdutos = cart.map((pedido, index) => ({
        PedidoID: OrderID,
        CodigoProduto: pedido.codigoproduto,
        QuantidadeProdutos: quantidades[index] || 1,
        Valor: pedido.precovenda * (quantidades[index] || 1),
      }));

      const insertedItensProdutos = await Promise.all(
        ItensProdutos.map(async (produto) => {
          const response = await axios.post(
            "http://localhost:3020/itemproduto",
            produto
          );
          return response.data;
        })
      );

      navigate("/pedido", { state: { clienteInfo } });
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
    }
  };

  function handleCloseMessage(_, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div
        style={{
          width: "400px",
          margin: "20px",
          display: "flex",
          flexDirection: "column",
          padding: "0px",
        }}
      >
        <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
          Carrinho
        </Typography>
        <List>
          {cart.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.marca}
                secondary={`Preço: R$ ${item.precovenda}`}
              />
              <ListItemSecondaryAction>
                <Typography>{`Quantidade: ${
                  quantidades[index] || 1
                }`}</Typography>
                <IconButton
                  edge="end"
                  onClick={() => handleRemoveQuantity(index)}
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleAddQuantity(index, item)}
                >
                  <AddIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleRemoveItem(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" gutterBottom style={{ margin: "10px" }}>
          {`Total do pedido: R$ ${calcularTotal()}`}
        </Typography>

        <Button variant="contained" color="primary" onClick={() => IrPedido()}>
          Finalizar Pedido
        </Button>

        <Button color="error" style={{ margin: "18px" }} onClick={onClose}>
          Fechar Carrinho
        </Button>
      </div>
      <Snackbar
        open={openMessage}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
      >
        <Alert severity={messageSeverity} onClose={handleCloseMessage}>
          {messageText}
        </Alert>
      </Snackbar>
    </Drawer>
  );
};

export default Carrinho;
