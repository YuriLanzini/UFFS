import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Horario from "./Horarios";
import AdcCurso from "./AdcCurso";
import AdcCcr from "./AdcCcr";
import AdcHorario from "./AdcHorario";
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const CustomButton = styled(Button)({
  background: '#00693e',
  color: 'white',
  '&:hover': {
    background: '#004d2c', 
  },

  padding: '15px 30px', 
  margin: '15px', 
});

function App() {
  return (
    <Router>
      <header id="header">
        <div>
          <img src="logo-uffs.png" alt="Logo UFFS" />
          <h1>Universidade Federal da Fronteira Sul - UFFS</h1>
        </div>
      </header>
      <nav>
        <Link to="/">
          <CustomButton>Ver Horários</CustomButton>
        </Link>
        <Link to="/curso">
          <CustomButton>Adicionar Curso</CustomButton>
        </Link>  
        <Link to="/ccr">
          <CustomButton>Adicionar Ccr</CustomButton>
        </Link>
        <Link to="/horario">
          <CustomButton>Adicionar Horário</CustomButton>
        </Link>

      </nav>
      <Routes>
        <Route path="/" element={<Horario />} />
        <Route path="/curso" element={<AdcCurso />} />
        <Route path="/ccr" element={<AdcCcr />} />
        <Route path="/horario" element={<AdcHorario />} />
      </Routes>
    </Router>
  );
}

export default App;
