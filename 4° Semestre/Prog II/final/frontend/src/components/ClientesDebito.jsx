import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";

const ClientesDebito = () => {
  const [debitos, setDebitos] = useState([]);
  const [ClienteNaoAutorizados, setClienteNaoAutorizados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAutorizarDialog, setShowAutorizarDialog] = useState(false);
  const [cpfAutorizacao, setCpfAutorizacao] = useState("");
  const [openMessage, setOpenMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSeverity, setMessageSeverity] = useState("success");
  const navigate = useNavigate();
  const location = useLocation();
  const clienteInfo = location.state?.clienteInfo;

  const fetchClienteList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3020/clientesnaoautorizados"
      );
      setClienteNaoAutorizados(response.data);
    } catch (error) {
      setError("Erro ao carregar a lista de clientes não autorizados");
    } finally {
      setLoading(false);
    }
  };

  const fetchDebitoList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3020/debitos");
      setDebitos(response.data);
    } catch (error) {
      setError("Erro ao carregar a lista de debitos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClienteList();
    fetchDebitoList();
  }, []);

  const formatCPF = (cpf) => {
    const cleanedCPF = cpf.replace(/\D/g, "");

    return cleanedCPF.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  };

  const formattedCPF = formatCPF(cpfAutorizacao);

  const getRowId = (row) =>
    `${row.cpf}-${row.nome}-${row.valordevido}-${row.datavencimento}-${row.statuspagamento}`;

  const getRowId1 = (row) => `${row.cpf}-${row.nome}`;

  const coluna = [
    {
      field: "cpf",
      headerName: "CPF",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },
    {
      field: "nome",
      headerName: "Cliente",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },
    {
      field: "valordevido",
      headerName: "Valor em Débito",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },
    {
      field: "datavencimento",
      headerName: "Vencimento",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },
    {
      field: "statuspagamento",
      headerName: "Status Pagamento",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },
  ];

  const coluna1 = [
    {
      field: "cpf",
      headerName: "CPF",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },
    {
      field: "nome",
      headerName: "Cliente",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },
  ];

  const handleAutorizarClick = () => {
    setShowAutorizarDialog(true);
  };

  function handleCloseMessage(_, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  }

  const handleAutorizarConfirm = async () => {
    try {
      if (formattedCPF.length != 14) {
        setMessageText("CPF Inválido!");
        setMessageSeverity("error");
        setOpenMessage(true);
        return;
      }

      const response = await axios.put(
        `http://localhost:3020/atualizar/${formattedCPF}`,
        {
          AutorizacaoFiado: true,
        }
      );

      fetchDebitoList();
      fetchClienteList();
      setMessageText("Cliente Autorizado!");
      setMessageSeverity("success");
      setOpenMessage(true);
      setShowAutorizarDialog(false);
    } catch (error) {
      console.error(error);
      setShowAutorizarDialog(false);
      setMessageText("Usuário não encontrado!");
      setMessageSeverity("error");
      setOpenMessage(true);
    }
  };

  const handleAutorizarCancel = () => {
    setShowAutorizarDialog(false);
  };

  const Voltar = () => {
    navigate("/adm", { state: { clienteInfo } });
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
          <Button variant="contained" color="error" onClick={Voltar}>
            Voltar
          </Button>
        </Box>

        <Typography variant="h3">Distribuidora de Bebidas</Typography>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAutorizarClick}
          >
            Autorizar Cliente em débito
          </Button>
        </Box>
      </header>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          margin: "0 auto",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            width: "50%",
            "& .super-app-theme--header": {
              backgroundColor: "hsl(213, 96%, 30%)",
              textAlign: "center",
              color: "white",
              fontSize: "18px",
            },
            "& .MuiDataGrid-cell": {
              borderRight: "1px solid #e0e0e0",
            },
          }}
        >
          <Typography style={{ margin: "50px" }} variant="h4">
            Clientes em Débito
          </Typography>
          <DataGrid
            rows={debitos}
            columns={coluna}
            getRowId={getRowId}
            autoHeight
          />
        </Box>

        <Box
          sx={{
            width: "48%",
            "& .super-app-theme--header": {
              backgroundColor: "hsl(213, 96%, 30%)",
              textAlign: "center",
              color: "white",
              fontSize: "18px",
            },
            "& .MuiDataGrid-cell": {
              borderRight: "1px solid #e0e0e0",
            },
          }}
        >
          <Typography style={{ margin: "50px" }} variant="h4">
            Clientes não Autorizados
          </Typography>
          <DataGrid
            rows={ClienteNaoAutorizados}
            columns={coluna1}
            getRowId={getRowId1}
            autoHeight
          />
        </Box>
      </Box>

      <Dialog
        maxWidth="md"
        open={showAutorizarDialog}
        onClose={handleAutorizarCancel}
      >
        <DialogTitle>Autorizar Cliente em Débito</DialogTitle>
        <DialogContent>
          <TextField
            label="Digite o CPF do cliente"
            variant="outlined"
            fullWidth
            value={cpfAutorizacao}
            onChange={(e) => setCpfAutorizacao(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAutorizarCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAutorizarConfirm} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

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

export default ClientesDebito;
