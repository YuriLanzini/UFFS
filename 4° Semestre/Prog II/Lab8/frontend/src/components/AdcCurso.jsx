import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Box, Button, Stack, TextField, CircularProgress, Snackbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";



const colunas = [

  {
    field: "id", 
    headerName: "ID",
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    flex: 1,
    align: 'center',
  },
  {
    field: "nome",
    headerName: "Nome do Curso",
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    flex: 1,
    align: 'center',
  },
  {
    field: "descricao",
    headerName: "Descrição do Curso",
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    flex: 2,
    align: 'center',
  },
];

const ListaCursos = () => {
  const [listaCursos, setListaCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openMessage, setOpenMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSeverity, setMessageSeverity] = useState("success");

  const fetchCursoList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3010/cursos");
      setListaCursos(response.data);
    } catch (error) {
      setError("Erro ao carregar a lista de cursos");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchCursoList();
  }, []);

  const CursoForm = ({ updateCursoList }) => {
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [formLoading, setFormLoading] = useState(false);
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      setFormLoading(true);
      try {
        const response = await axios.post("http://localhost:3010/curso", {
          id,
          nome,
          descricao,
        });
        setId("");
        setNome("");
        setDescricao("");
        updateCursoList();
        setMessageText("Curso cadastrado com sucesso!");
        setMessageSeverity("success");
        setOpenMessage(true);
      } catch (error) {
        setMessageText("Falha no cadastro do curso!");
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


  function handleCancelClick() {
    if (id !== "" || nome !== "" || descricao !== "") {
        setMessageText("Cadastro de curso cancelado!");
        setMessageSeverity("warning");
        setOpenMessage(true);
    }
    updateCursoList();
}
  
    return (
      
    
      <Box component="form" onSubmit={handleSubmit}>

        <Stack spacing={2}>

         <TextField
            required
            label="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            size="small"
          
          />
          <TextField
            required
            label="Nome do curso"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            size="small"
          
          />
          <TextField
            required
            label="Descrição do curso"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            size="small"
            multiline
          />
       <Stack direction="row" justifyContent="center" width="100%" spacing={4}>
          <Button
            type="submit"
            variant="contained"
            disabled={formLoading}
            color="primary"
          >
            {formLoading ? <CircularProgress size={24} /> : "Adicionar Curso"}
          </Button>  
       
           <Button
             variant="outlined"     
             onClick={handleCancelClick}
             color="error"
                    >
                Cancelar
            </Button> 
            <Snackbar
                        open={openMessage}
                        autoHideDuration={6000}
                        onClose={handleCloseMessage}
                    >
                        <Alert
                            severity={messageSeverity}
                            onClose={handleCloseMessage}
                        >
                            {messageText}
                        </Alert>
            </Snackbar>
          </Stack>
          
        </Stack>

      </Box>
      
    );
  };

  return (
    <div>
    
    <Box sx={{ width: '50%', margin: '0 auto', textAlign: 'center', marginTop: '20px' }}>
        <CursoForm updateCursoList={fetchCursoList} />
      </Box>

      <div className="container">
      <Box sx={{
                width: '100%',
                height: '100%',
                margin: '24px', 
                '& .super-app-theme--header': {
                  backgroundColor: '#00693e',
                  textAlign: 'center',
                  color: 'white',
                  fontSize: '18px',
                
                
              },
              '& .MuiDataGrid-cell': {
                borderRight: '1px solid #e0e0e0',
              },
            }}>
               
                  <DataGrid
                    rows={listaCursos}
                    columns={colunas}
                    loading={loading}
                    autoHeight
                  />
          </Box>
          </div>
    </div>
  );


};

export default ListaCursos;
