const express = require("express");
const cors = require("cors");

const pgp = require("pg-promise")({});

const usuario = "postgres";
const senha = "123456";
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/lab8`);
const app = express();
app.use(cors());
app.use(express.json());


app.get("/cursos", async (req, res) => {
    try {
        const cursos = await db.any("SELECT * FROM cursos;");
        console.log('Retornando todos cursos.');
        res.json(cursos).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/horarios", async (req, res) => {
    try {
        const horarios = await db.any("SELECT h.id_curso, h.id_semestre, h.dia, h.horario, h.id_ccr, c.materia FROM horarios h NATURAL JOIN ccr c;");
        console.log('Retornando todos horarios.');
        res.json(horarios).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/semestres", async (req, res) => {
    try {
        const semestres = await db.any("SELECT * FROM semestres;");
        console.log('Retornando todos semestres.');
        res.json(semestres).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/ccrs", async (req, res) => {
    try {
        const ccr = await db.any("SELECT * FROM ccr;");
        console.log('Retornando todos CCRS.');
        res.json(ccr).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});


app.post("/curso", async (req, res) => {
    try {
        const { id, nome, descricao } = req.body;
        if (!id || !nome || !descricao) {
            return res.status(400).json({ error: "Id ,Nome e descrição são obrigatórios." });
        }

        const newCurso = await db.one(
            "INSERT INTO cursos (id, nome, descricao) VALUES ($1, $2, $3) RETURNING *;",
            [id, nome, descricao]
        );

        res.status(201).json(newCurso);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro ao inserir o curso." });
    }
});

app.post("/ccr", async (req, res) => {
    try {
        const { id_ccr, materia, descricao_ccr } = req.body;
        if (!id_ccr || !materia || !descricao_ccr) {
            return res.status(400).json({ error: "Id, Matéria, Descriçao são obrigatórios." });
        }

        const newCcr = await db.one(
            "INSERT INTO ccr (id_ccr, materia, descricao_ccr) VALUES ($1, $2, $3) RETURNING *;",
            [id_ccr, materia, descricao_ccr]
        );

        res.status(201).json(newCcr);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro ao inserir o CCR." });
    }
});

app.post("/horario", async (req, res) => {
    try {
        const { id_curso, id_semestre, dia, horario, id_ccr } = req.body;
        if (!id_curso || !id_semestre || !dia || !horario || !id_ccr) {
            return res.status(400).json({ error: "Todos os atributos são obrigatórios." });
        }

        const newHorario = await db.one(
            "INSERT INTO horarios (id_curso, id_semestre, dia, horario, id_ccr) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
            [id_curso, id_semestre, dia, horario, id_ccr]
        );

        res.status(201).json(newHorario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro ao inserir o horário." });
    }
});

app.listen(3010, () => console.log("Servidor rodando na porta 3010."));