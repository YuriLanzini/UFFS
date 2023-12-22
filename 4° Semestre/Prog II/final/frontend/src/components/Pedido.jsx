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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import NotaFiscal from "./NotaFiscal";
import { useLocation, useNavigate } from "react-router-dom";

const PedidosComponent = () => {
  const [pedidos, setPedidos] = useState([]);
  const [ItensProdutos, setItensProdutos] = useState([]);
  const [Bebidas, setBebidas] = useState([]);
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
  const moment = require("moment");
  const getRowId = (row) =>
    `${row.marca}-${row.quantidadeprodutos}-${row.valor}`;

  const fetchPedidoList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3020/pedidos");
      setPedidos(response.data);
    } catch (error) {
      setError("Erro ao carregar a lista de pedidos");
    } finally {
      setLoading(false);
    }
  };

  const fetchItensProdutosList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3020/itensprodutos");
      setItensProdutos(response.data);
    } catch (error) {
      setError("Erro ao carregar a lista de itens produtos");
    } finally {
      setLoading(false);
    }
  };

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
    fetchPedidoList();
    fetchBebidaList();
    fetchItensProdutosList();
  }, []);

  const TotalCompra = () => {
    let totalValue = pedidos.reduce((total, pedido) => {
      let value = parseFloat(pedido.valor);
      return total + value;
    }, 0);

    if (metodoPagamento === "Cartão de Crédito") {
      return (totalValue + totalValue * 0.05).toFixed(2);
    } else {
      return totalValue.toFixed(2);
    }
  };

  const closeNota = async () => {
    try {
      setNotaFiscal(false);
      await axios.put(`http://localhost:3020/finalizar`, {
        Finalizado: true,
      });

      ItensProdutos.map(async (produto) => {
        const bebidaCorrespondente = Bebidas.find(
          (bebida) => bebida.codigoproduto === produto.codigoproduto
        );

        if (bebidaCorrespondente.quantidade > 0 && bebidaCorrespondente) {
          const novaQuantidadeBebida =
            bebidaCorrespondente.quantidade - produto.quantidadeprodutos;

          await axios.put(
            `http://localhost:3020/atualizarBebida/${bebidaCorrespondente.codigoproduto}`,
            {
              Quantidade: novaQuantidadeBebida,
            }
          );
        }
      });
      setMessageText("Pedido Finalizado!");
      setMessageSeverity("success");
      setOpenMessage(true);

      if (metodoPagamento === "Fiado") {
        const dataAtual = moment();

        const dataVencimento = dataAtual.add(1, "months").format("DD/MM/YYYY");

        await axios.post("http://localhost:3020/fiado", {
          CPF: clienteInfo.cpf,
          ValorDevido: TotalCompra(),
          DataVencimento: dataVencimento,
          StatusPagamento: "Pendente",
        });
      }

      navigate("/bebidas", { state: { clienteInfo } });
    } catch (error) {
      console.error(error);

      setMessageText("Erro ao finalizar pedido!");
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

  const coluna1 = [
    {
      field: "marca",
      headerName: "Marca",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },
    {
      field: "quantidadeprodutos",
      headerName: "Quantidade",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },
    {
      field: "valor",
      headerName: "Valor",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },
  ];

  return (
    <div>
      <header id="header">
        <div>
          <h1>Distribuidora de Bebidas</h1>
        </div>
      </header>

      <h2 style={{ margin: "20px" }}>Produtos:</h2>

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
              rows={pedidos}
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
              {clienteInfo.autorizacaofiado && (
                <MenuItem value="Fiado">Fiado</MenuItem>
              )}
            </Select>
          </FormControl>

          <p>Total da compra: R$ {TotalCompra()}</p>
          <Button
            style={{ marginBottom: "20px" }}
            variant="contained"
            onClick={handleFinalizarCompra}
          >
            Finalizar Compra
          </Button>
        </div>
      )}

      {notaFiscal && (
        <NotaFiscal
          onClose={closeNota}
          totalValor={TotalCompra()}
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

export default PedidosComponent;
