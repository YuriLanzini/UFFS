import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Box, Button, Stack, TextField, CircularProgress, Snackbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";



const colunas = [

  {
    field: "id_ccr", 
    headerName: "ID",
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    flex: 1,
    align: 'center',
  },
  {
    field: "materia",
    headerName: "Matéria",
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    flex: 1,
    align: 'center',
  },
  {
    field: "descricao_ccr",
    headerName: "Descrição da CCR",
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    flex: 2,
    align: 'center',
  },
];

const ListaCcr = () => {
  const [listaCcr, setListaCcr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openMessage, setOpenMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSeverity, setMessageSeverity] = useState("success");
  const getRowId = (row) => `${row.id_ccr}-${row.materia}-${row.descricao_ccr}`;

  const fetchCcrList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3010/ccrs");
      setListaCcr(response.data);
    } catch (error) {
      setError("Erro ao carregar a lista de ccrs");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchCcrList();
  }, []);

  const CcrForm = ({ updateCcrList }) => {
    const [id_ccr, setId_Ccr] = useState("");
    const [materia, setmateria] = useState("");
    const [descricao_ccr, setDescricao_ccr] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      setFormLoading(true);
      try {
        const response = await axios.post("http://localhost:3010/ccr", {
          id_ccr,
          materia,
          descricao_ccr,
        });
        setId_Ccr("");
        setmateria("");
        setDescricao_ccr("");
        updateCcrList();
        setMessageText("Ccr cadastrado com sucesso!");
        setMessageSeverity("success");
        setOpenMessage(true);
      } catch (error) {
        setMessageText("Falha no cadastro do Ccr!");
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
    if (id_ccr !== "" || materia !== "" || descricao_ccr !== "") {
        setMessageText("Cadastro de Ccr cancelado!");
        setMessageSeverity("warning");
        setOpenMessage(true);
    }
    updateCcrList();
}
  
    return (
      
    
      <Box component="form" onSubmit={handleSubmit}>

        <Stack spacing={2}>

         <TextField
            required
            label="ID"
            value={id_ccr}
            onChange={(e) => setId_Ccr(e.target.value)}
            size="small"
          
          />
          <TextField
            required
            label="Nome da matéria"
            value={materia}
            onChange={(e) => setmateria(e.target.value)}
            size="small"
          
          />
          <TextField
            required
            label="Descrição da CCR"
            value={descricao_ccr}
            onChange={(e) => setDescricao_ccr(e.target.value)}
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
            {formLoading ? <CircularProgress size={24} /> : "Adicionar Ccr"}
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
        <CcrForm updateCcrList={fetchCcrList} />
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
                    rows={listaCcr}
                    columns={colunas}
                    getRowId={getRowId}
                    loading={loading}
                    autoHeight
                  />
          </Box>
          </div>
    </div>
  );


};

export default ListaCcr;
