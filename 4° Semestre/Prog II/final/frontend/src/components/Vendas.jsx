import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";

const Vendas = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const clienteInfo = location.state?.clienteInfo;
  const getRowId = (row) =>
    `${row.id}-${row.cpf}-${row.nome}-${row.marca}-${row.quantidade}-${row.valor}`;

  const fetchPedidoList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3020/venda");
      setPedidos(response.data);
    } catch (error) {
      setError("Erro ao carregar a lista de pedidos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidoList();
  }, []);

  const Voltar = () => {
    navigate("/adm", { state: { clienteInfo } });
  };

  const coluna = [
    {
      field: "id",
      headerName: "Id Pedido",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      align: "center",
    },
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
      field: "marca",
      headerName: "Produto",
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

      <Box
        sx={{
          width: "90%",
          margin: "0 auto",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <Typography style={{ margin: "50px" }} variant="h4">
          Vendas de Bebida
        </Typography>

        <Box
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
            "& .MuiDataGrid-cell": {
              borderRight: "1px solid #e0e0e0",
            },
          }}
        >
          <DataGrid
            rows={pedidos}
            columns={coluna}
            getRowId={getRowId}
            autoHeight
          />
        </Box>
      </Box>
    </div>
  );
};

export default Vendas;
