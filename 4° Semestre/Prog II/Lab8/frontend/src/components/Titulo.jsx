import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Titulo(props){

    return(

    <Box>
        <Typography
            variant="h2"
            gutterBottom
            style={{ fontSize: "20px"}}
        >

            <div className="row">
                <div className="col">
                    <h2>{props.nome}</h2>
                    <p>Cordenação: {props.info}</p>
                    <h3>{props.semestre}</h3>
                </div>
            </div>
        </Typography>
    </Box>
      
    );
}

export default Titulo;