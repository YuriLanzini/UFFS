import React, { useState, useEffect } from "react";
import axios from "axios";
import Titulo from "./Titulo";
import Table from "./Table";
import ButtonM from "./ButtonM"

axios.defaults.baseURL = "http://localhost:3010/";
axios.defaults.headers.common["Content-Type"] = "application/json;charset=utf-8";


const Horarios = () => {

  const [listaCursos, setListaCursos] = useState([]);
  const [listaHorarios, setListaHorarios] = useState([]);
  const [listaSemestres, setListaSemestres] = useState([]);

  const cursosComHorarios = listaCursos.filter(curso => {
    return listaHorarios.some(horario => horario.id_curso === curso.id);
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cursos, horarios, semestres] = await Promise.all([
          axios.get("/cursos"),
          axios.get("/horarios"),
          axios.get("/semestres"),
        ]);

        setListaCursos(cursos.data);
        setListaHorarios(horarios.data);
        setListaSemestres(semestres.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);



  return (

    <div>
     
      <nav>
        <div className="container">
          <ul>
            <li className="h3">Cursos:</li>
            {cursosComHorarios.map((curso) => (
              <li key={curso.id}>
                <a href={`#curso-${curso.id}`}>{curso.nome}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="container">
      {cursosComHorarios.map(curso => (
          <div key={curso.id} id={`curso-${curso.id}`}>
            <Titulo nome={curso.nome} info={curso.info} />

            {listaSemestres.map(semestre => {
              const horariosDoSemestre = listaHorarios.filter(
                horario =>
                  horario.id_curso === curso.id &&
                  horario.id_semestre === semestre.id_semestre
                  
              );

              if (horariosDoSemestre.length > 0) {
                return (
                  <div key={semestre.id_semestre}>
                    <h2>{semestre.descricao_sem}</h2>
                    <Table horarios={horariosDoSemestre} />
                  </div>
                );
              }

              return null;
            })}
          </div>
        ))}
      </div>
      <ButtonM />

    </div>
  
  );
}

export default Horarios;
