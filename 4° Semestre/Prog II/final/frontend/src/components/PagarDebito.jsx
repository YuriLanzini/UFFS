import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CircularProgress,
  Button,
  Select,
  MenuItem,
  FormControl,
  Paper,
  Alert,
  Snackbar,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import NotaFiscalDebito from "./NotaFiscalDebito";
import { useLocation, useNavigate } from "react-router-dom";

const PagarDebito = () => {
  const [ContasPendentes, setContasPendentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMessage, setOpenMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSeverity, setMessageSeverity] = useState("success");
  const [notaFiscal, setNotaFiscal] = useState(false);
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const location = useLocation();
  const clienteInfo = location.state?.clienteInfo;
  const navigate = useNavigate();

  const getRowId = (row) => `${row.valordevido}-${row.datavencimento}`;

  const fetchContasDebitoList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3020/pagardebito/${clienteInfo.cpf}`,
        {}
      );

      setContasPendentes(response.data);
    } catch (error) {
      setError("Erro ao carregar a lista de pedidos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContasDebitoList();
  }, []);

  const TotalCompra = () => {
    let totalValue = ContasPendentes.reduce((total, conta) => {
      let value = parseFloat(conta.valordevido);
      return total + value;
    }, 0);

    return totalValue.toFixed(2);
  };

  const closeNota = async () => {
    try {
      setNotaFiscal(false);

      await axios.put(
        `http://localhost:3020/atualizarConta/${clienteInfo.cpf}`,
        {
          statuspagamento: "Pago",
        }
      );

      setMessageText("Pagamento Efetuado!");
      setMessageSeverity("success");
      setOpenMessage(true);

      navigate("/bebidas", { state: { clienteInfo } });
    } catch (error) {
      console.error(error);

      setMessageText("Erro ao pagar conta!");
      setMessageSeverity("error");
      setOpenMessage(true);
    }
  };

  const handleMetodoPagamentoChange = (event) => {
    setMetodoPagamento(event.target.value);
  };

  function handleCloseMessage(_, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  }

  const handleFinalizarCompra = async () => {
    if (ContasPendentes.length === 0) {
      setOpenMessage(true);
      setMessageSeverity("error");
      setMessageText("Não há contas pendentes para finalizar.");
      return;
    }

    if (!metodoPagamento) {
      setOpenMessage(true);
      setMessageSeverity("error");
      setMessageText(
        "Selecione um método de pagamento antes de finalizar a compra."
      );
      return;
    }

    setNotaFiscal(true);
  };

  const Voltar = () => {
    navigate("/bebidas", { state: { clienteInfo } });
  };

  const coluna1 = [
    {
      field: "valordevido",
      headerName: "Valor",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },
    {
      field: "datavencimento",
      headerName: "Data de Vencimento",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },
  ];

  return (
    <div>
      <header id="header">
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          style={{ marginBottom: "20px" }}
        >
          <Button variant="contained" color="error" onClick={Voltar}>
            Voltar
          </Button>
        </Box>

        <h1>Distribuidora de Bebidas</h1>
      </header>

      <h2 style={{ margin: "20px" }}>Contas Pendentes:</h2>

      {loading ? (
        <CircularProgress />
      ) : (
        <div className="container">
          <Paper
            sx={{
              width: "100%",
              height: "100%",
              margin: "24px",
              "& .super-app-theme--header": {
                backgroundColor: "hsl(213, 96%, 30%)",
                textAlign: "center",
                color: "white",
                fontSize: "18px",
              },
            }}
            style={{ height: 400, width: "100%" }}
          >
            <DataGrid
              rows={ContasPendentes}
              columns={coluna1}
              getRowId={getRowId}
              pageSize={5}
            />
          </Paper>

          <p>Método de pagamento:</p>
          <FormControl style={{ marginBottom: "25px", minWidth: "200px" }}>
            <Select
              labelId="metodoPagamento-label"
              id="metodoPagamento"
              value={metodoPagamento}
              onChange={handleMetodoPagamentoChange}
            >
              <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
              <MenuItem value="PIX">PIX</MenuItem>
            </Select>
          </FormControl>

          <p>Total da Dívida: R$ {TotalCompra()}</p>
          <Button variant="contained" onClick={handleFinalizarCompra}>
            Finalizar Compra
          </Button>
        </div>
      )}

      {notaFiscal && (
        <NotaFiscalDebito
          onClose={closeNota}
          totalValor={TotalCompra()}
          ContaDetalhes={ContasPendentes}
          clienteInfo={clienteInfo}
          metodoPagamento={metodoPagamento}
        />
      )}

      <Snackbar
        open={openMessage}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
      >
        <Alert severity={messageSeverity} onClose={handleCloseMessage}>
          {messageText}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PagarDebito;
