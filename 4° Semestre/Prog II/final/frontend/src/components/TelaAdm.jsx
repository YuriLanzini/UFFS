import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Typography,
  Grid,
  Paper,
  Menu,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdcAdm from "./AdcAdm";
import AdcProduto from "./AdcProduto";

const TelaAdm = ({ onLogout }) => {
  const [ListaAdm, setListaAdm] = useState([]);
  const [ListaProdutos, setListaProdutos] = useState([]);
  const [EstoqueBaixo, setEstoBaixoProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const location = useLocation();
  const clienteInfo = location.state?.clienteInfo;
  const getRowId = (row) => `${row.id}-${row.nome}${row.total}`;
  const getRowId1 = (row) => `${row.marca}-${row.quantidade}-${row.categoria}`;
  const navigate = useNavigate();
  const [admAberto, setAdmAberto] = useState(false);
  const [ProdutoAberto, setProdutoAberto] = useState(false);

  const fetchAdmList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3020/adms");
      setListaAdm(response.data);
    } catch (error) {
      setError("Erro ao carregar a lista de Administradores");
    } finally {
      setLoading(false);
    }
  };

  const fetchProdutoList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3020/bebidas");
      setListaProdutos(response.data);
    } catch (error) {
      setError("Erro ao carregar a lista de bebidas");
    } finally {
      setLoading(false);
    }
  };

  const fetchEstoBaixoList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3020/estoquebaixo");
      setEstoBaixoProdutos(response.data);
    } catch (error) {
      setError("Erro ao carregar a Lista estoque baixo.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPedidoList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3020/pedidosAdm");
      const pedidosOrdenados = response.data.sort(
        (a, b) => new Date(b.data) - new Date(a.data)
      );
      setPedidos(pedidosOrdenados.slice(0, 7));
    } catch (error) {
      setError("Erro ao carregar a lista de pedidos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmList();
    fetchProdutoList();
    fetchEstoBaixoList();
    fetchPedidoList();
  }, []);

  const handleLogoutClick = () => {
    onLogout();
  };

  const handleToggleAdm = () => {
    setAdmAberto(!admAberto);
    setAnchorElCadastro(null);
  };

  const handleToggleProduto = () => {
    setProdutoAberto(!ProdutoAberto);
    setAnchorElCadastro(null);
  };

  const [anchorElCadastro, setAnchorElCadastro] = useState(null);
  const [anchorElRelatorios, setAnchorElRelatorios] = useState(null);

  const handleButtonClickCadastro = (event) => {
    setAnchorElCadastro(event.currentTarget);
  };

  const handleButtonClickRelatorios = (event) => {
    setAnchorElRelatorios(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElCadastro(null);
    setAnchorElRelatorios(null);
  };

  const Estoque = () => {
    setAnchorElCadastro(null);
    navigate("/estoque", { state: { clienteInfo } });
  };

  const Vendas = () => {
    setAnchorElCadastro(null);
    navigate("/vendas", { state: { clienteInfo } });
  };

  const CLientesDebito = () => {
    setAnchorElCadastro(null);
    navigate("/debito", { state: { clienteInfo } });
  };

  const coluna1 = [
    {
      field: "id",
      headerName: "Id Pedido",
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
      field: "total",
      headerName: "Valor Total",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },
  ];

  const coluna = [
    {
      field: "marca",
      headerName: "Marca",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },

    {
      field: "quantidade",
      headerName: "Quantidade",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },
    {
      field: "nome",
      headerName: "Categoria",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },
  ];

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

        <Typography variant="h3"> Bem-vindo, {clienteInfo.nome}! </Typography>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleButtonClickCadastro}>
              Cadastrar
            </Button>

            <Menu
              anchorEl={anchorElCadastro}
              open={Boolean(anchorElCadastro)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleToggleAdm}>Administrador</MenuItem>
              <MenuItem onClick={handleToggleProduto}>Produto</MenuItem>
            </Menu>

            <Button variant="contained" onClick={handleButtonClickRelatorios}>
              Relatórios
            </Button>
            <Menu
              anchorEl={anchorElRelatorios}
              open={Boolean(anchorElRelatorios)}
              onClose={handleClose}
            >
              <MenuItem onClick={Estoque}>Estoque</MenuItem>
              <MenuItem onClick={Vendas}>Vendas</MenuItem>
            </Menu>

            <Button variant="contained" onClick={CLientesDebito}>
              Clientes em Débito
            </Button>
          </Stack>
        </Box>
      </header>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography style={{ margin: "20px" }} variant="h5">
            Últimas Vendas:
          </Typography>
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
            style={{ height: 500, width: "100%" }}
          >
            <DataGrid rows={pedidos} columns={coluna1} getRowId={getRowId} />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Typography style={{ margin: "20px" }} variant="h5">
            Estoque Baixo:
          </Typography>
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
            style={{ height: 500, width: "95%" }}
          >
            <DataGrid
              rows={EstoqueBaixo}
              columns={coluna}
              getRowId={getRowId1}
            />
          </Paper>
        </Grid>
      </Grid>

      <AdcAdm
        updateAdmList={fetchAdmList}
        open={admAberto}
        onClose={handleToggleAdm}
      />

      <AdcProduto
        updateProdutoList={fetchProdutoList}
        open={ProdutoAberto}
        onClose={handleToggleProduto}
      />
    </div>
  );
};

export default TelaAdm;
