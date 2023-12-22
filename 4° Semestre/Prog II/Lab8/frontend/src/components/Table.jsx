import React from "react";
import Box from '@mui/material/Box';
import { DataGrid } from "@mui/x-data-grid";

const colunas = [
  {
    field: "dia",
    headerName: "Dia da Semana",
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    borderRight: '1px solid #e0e0e0',
    flex: 1,
    align: 'center',
  },

  {
    field: "horario",
    headerName: "Horário",
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    borderRight: '1px solid #e0e0e0',
    flex: 1,
    align: 'center',
  },

  {
    field: "materia",
    headerName: "Matéria",
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    borderRight: '1px solid #e0e0e0',
    flex: 1,
    align: 'center',
  },
  
];

function Table(props) {

  const getRowId = (row) => `${row.cursoId}-${row.dia}-${row.horario}-${row.materia}`;

  return (
    <Box
      sx={{
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
      }}
    >
      <DataGrid
        rows={props.horarios}
        columns={colunas}
        getRowId={getRowId}
        autoHeight
      />
    </Box>
  );
}

export default Table;