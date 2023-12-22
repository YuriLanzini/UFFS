import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Box, Button, Stack, TextField, CircularProgress, Snackbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";



const colunas = [

  {
    field: "id_curso", 
    headerName: "Curso",
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    flex: 1,
    align: 'center',
  },
  {
    field: "id_semestre",
    headerName: "Semestre",
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    flex: 1,
    align: 'center',
  },
  {
    field: "dia",
    headerName: "Dia",
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    flex: 1,
    align: 'center',
  },
  {
    field: "horario",
    headerName: "Horário",
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    flex: 1,
    align: 'center',
  },
  {
    field: "id_ccr",
    headerName: "Matéria",
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    flex: 1,
    align: 'center',
  },
];

const Listahorario = () => {
  const [listaHorarios, setListaHorarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openMessage, setOpenMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSeverity, setMessageSeverity] = useState("success");
  const getRowId = (row) => `${row.id_curso}-${row.id_semestre}-${row.dia}-${row.horario}-${row.id_ccr}`;

  const fetchHorariosList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3010/horarios");
      setListaHorarios(response.data);
    } catch (error) {
      setError("Erro ao carregar a lista de horários");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchHorariosList();
  }, []);

  const HorarioForm = ({ updateHorarioList }) => {
    const [id_curso, setId_Curso] = useState("");
    const [id_semestre, setId_semestre] = useState("");
    const [dia, setDia] = useState("");
    const [horario, setHorario] = useState("");
    const [id_ccr, setId_Ccr] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      setFormLoading(true);
      try {
        const response = await axios.post("http://localhost:3010/horario", {
            id_curso, 
            id_semestre, 
            dia, 
            horario, 
            id_ccr,
        });
        setId_Curso("");
        setId_semestre("");
        setDia("");
        setHorario("");
        setId_Ccr("");
        updateHorarioList();
        setMessageText("Horário cadastrado com sucesso!");
        setMessageSeverity("success");
        setOpenMessage(true);
      } catch (error) {
        setMessageText("Falha no cadastro do Horário!");
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
    if (id_curso !== "" || id_semestre !== "" || dia !== "" || horario !== "" || id_ccr !== "") {
        setMessageText("Cadastro de Horário cancelado!");
        setMessageSeverity("warning");
        setOpenMessage(true);
    }
    updateHorarioList();
}
  
    return (
      
    
      <Box component="form" onSubmit={handleSubmit}>

        <Stack spacing={2}>

         <TextField
            required
            label="ID Curso"
            value={id_curso}
            onChange={(e) => setId_Curso(e.target.value)}
            size="small"
          
          />
          <TextField
            required
            label="ID Semestre"
            value={id_semestre}
            onChange={(e) => setId_semestre(e.target.value)}
            size="small"
          
          />
          <TextField
            required
            label="Dia"
            value={dia}
            onChange={(e) => setDia(e.target.value)}
            size="small"
            multiline
          />
          <TextField
            required
            label="Horário"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            size="small"
            multiline
          />
          <TextField
            required
            label="ID CCR"
            value={id_ccr}
            onChange={(e) => setId_Ccr(e.target.value)}
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
            {formLoading ? <CircularProgress size={24} /> : "Adicionar Horário"}
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
        <HorarioForm updateHorarioList={fetchHorariosList} />
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
                    rows={listaHorarios}
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

export default Listahorario;
