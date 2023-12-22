import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ComprarBebi from "./ComprarBebi";
import { useNavigate, useLocation } from "react-router-dom";

const Estoque = () => {
  const [Bebidas, setBebidas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ComprarAberto, setComprarAberto] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const clienteInfo = location.state?.clienteInfo;
  const getRowId = (row) =>
    `${row.codigoproduto}-${row.marca}-${row.quantidade}-${row.precovenda}-${row.datavalidade}-${row.nome}`;

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

  const handleToggleComprar = () => {
    setComprarAberto(!ComprarAberto);
    fetchBebidaList();
  };

  useEffect(() => {
    fetchBebidaList();
  }, []);

  const Voltar = () => {
    navigate("/adm", { state: { clienteInfo } });
  };

  const coluna = [
    {
      field: "codigoproduto",
      headerName: "Código",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 2,
      align: "center",
    },

    {
      field: "marca",
      headerName: "Marca",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 2,
      align: "center",
    },

    {
      field: "quantidade",
      headerName: "Quantidade",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 2,
      align: "center",
    },

    {
      field: "precovenda",
      headerName: "Preço",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 2,
      align: "center",
    },
    {
      field: "datavalidade",
      headerName: "Validade",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 2,
      align: "center",
    },
    {
      field: "nome",
      headerName: "Categoria",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 2,
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
            onClick={handleToggleComprar}
          >
            Comprar Bebida
          </Button>
        </Box>
      </header>

      <Box
        sx={{
          width: "90%",
          margin: "0 auto",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <Typography style={{ margin: "30px" }} variant="h4">
          Estoque de Bebida
        </Typography>

        <Box
          sx={{
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
            rows={Bebidas}
            columns={coluna}
            getRowId={getRowId}
            autoHeight
          />
        </Box>
      </Box>

      <ComprarBebi
        Bebidas={Bebidas}
        open={ComprarAberto}
        onClose={handleToggleComprar}
      />
    </div>
  );
};

export default Estoque;
