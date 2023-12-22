const express = require("express");
const cors = require("cors");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const pgp = require("pg-promise")({});

const usuario = "postgres";
const senha = "123456";
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/final`);
const app = express();
app.use(cors());
app.use(express.json());
app.use(
  "/imagens",
  express.static("/home/yuri_lanzini/Imagens/TrabFInal/final/backend/imagens")
);

app.use(
  session({
    secret: "VAMOO_GRÊMIOO",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await db.oneOrNone(
          "SELECT * FROM Usuarios WHERE Email = $1;",
          [username]
        );

        if (!user) {
          return done(null, false, { message: "Usuário incorreto." });
        }

        const passwordMatch = await bcrypt.compare(password, user.senha);

        if (passwordMatch) {
          console.log("Usuário autenticado!");
          return done(null, user);
        } else {
          return done(null, false, { message: "Senha incorreta." });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your-secret-key",
    },
    async (payload, done) => {
      try {
        const user = await db.oneOrNone(
          "SELECT * FROM Usuarios WHERE Email = $1;",
          [payload.username]
        );

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      user_id: user.user_id,
      username: user.user_id,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const requireJWTAuth = passport.authenticate("jwt", { session: false });

app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = jwt.sign({ username: req.body.username }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token: token });
  }
);

app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

///////////////////////////LOGIN PRA CIMA

app.get("/cliente", requireJWTAuth, async (req, res) => {
  try {
    const cliente = await db.oneOrNone(
      "SELECT * FROM Usuarios WHERE Email = $1;",
      [req.user.email]
    );

    if (cliente) {
      res.json(cliente).status(200);
    } else {
      res.status(404).json({ error: "Cliente não encontrado." });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/clientes", async (req, res) => {
  try {
    const clientes = await db.any(
      "SELECT * FROM Usuarios where Tipo='Cliente';"
    );

    console.log("Retornando todos clientes.");
    res.json(clientes).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/clientesnaoautorizados", async (req, res) => {
  try {
    const clientes = await db.any(
      "SELECT * FROM Usuarios where Tipo='Cliente' AND AutorizacaoFiado = 'false';"
    );

    console.log("Retornando todos clientes não autorizados.");
    res.json(clientes).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/adms", async (req, res) => {
  try {
    const administrador = await db.any(
      "SELECT * FROM Usuarios where Tipo='Admin';"
    );

    console.log("Retornando todos adms.");
    res.json(administrador).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/bebidas", async (req, res) => {
  try {
    const bebidas = await db.any(
      "SELECT p.*, c.Nome FROM Produtos p JOIN Categorias c ON p.CategoriaID = c.ID ORDER BY p.CodigoProduto;"
    );

    const bebidasComImagem = bebidas.map((bebida) => {
      return {
        ...bebida,
        ImagemUrl: `http://localhost:3020/imagens/${bebida.codigoproduto}.jpg`,
      };
    });

    console.log("Retornando todos bebidas.");
    res.json(bebidasComImagem).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/estoquebaixo", async (req, res) => {
  try {
    const bebidas = await db.any(
      "SELECT p.marca, p.quantidade, c.nome FROM Produtos p JOIN Categorias c ON C.ID=P.CategoriaID WHERE Quantidade < 5;"
    );

    console.log("Retornando todos bebidas.");
    res.json(bebidas).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/pedidos", async (req, res) => {
  try {
    const pedidos = await db.any(
      "SELECT u.nome, p.cpf ,b.marca, i.valor, p.total, i.quantidadeprodutos, i.codigoproduto  FROM ItensProdutos i JOIN Produtos b ON i.codigoproduto=b.codigoproduto JOIN Pedidos p ON  i.PedidoID=p.ID JOIN Usuarios u ON u.cpf=p.cpf   WHERE p.Finalizado='false' ORDER BY p.id;"
    );

    console.log("Retornando todos pedidos.");
    res.json(pedidos).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/pedidosAdm", async (req, res) => {
  try {
    const pedidos = await db.any(
      "SELECT p.id, u.nome, p.total FROM Pedidos p JOIN Usuarios u ON u.cpf=p.cpf  WHERE p.Finalizado='true' ORDER BY p.id; "
    );

    console.log("Retornando todos pedidos.");
    res.json(pedidos).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/itensprodutos", async (req, res) => {
  try {
    const item = await db.any("SELECT * FROM ItensProdutos; ");

    console.log("Retornando todos itens.");
    res.json(item).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/venda", async (req, res) => {
  try {
    const pedidos = await db.any(
      "SELECT p.id, u.nome, p.cpf ,b.marca, i.valor, p.total, i.quantidadeprodutos FROM ItensProdutos i JOIN Produtos b ON i.codigoproduto=b.codigoproduto JOIN Pedidos p ON  i.PedidoID=p.ID JOIN Usuarios u ON u.cpf=p.cpf   WHERE p.Finalizado='true' ORDER BY p.id;"
    );

    console.log("Retornando todos pedidos.");
    res.json(pedidos).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/debitos", async (req, res) => {
  try {
    const debitos = await db.any(
      "SELECT CR.CPF ,U.Nome, CR.ValorDevido, CR.DataVencimento, CR.StatusPagamento FROM  ComprasCredito CR JOIN Usuarios U ON CR.CPF = U.CPF;"
    );

    console.log("Retornando todos debitos.");
    res.json(debitos).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/pagardebito/:cpf", async (req, res) => {
  try {
    const cpf = req.params.cpf;

    const result = await db.any(
      "SELECT DISTINCT ON (cpf, valordevido) c.* FROM comprascredito c NATURAL JOIN pedidos p WHERE statuspagamento = 'Pendente' AND CPF=$1",
      [cpf]
    );

    console.log("Retornando todas as contas.");
    res.json(result).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/categorias", async (req, res) => {
  try {
    const categorias = await db.any("SELECT * FROM Categorias;");

    console.log("Retornando todas as contas.");
    res.json(categorias).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.post("/usuario", async (req, res) => {
  try {
    const { CPF, Nome, Telefone, Email, Senha, Tipo, AutorizacaoFiado } =
      req.body;
    if (!CPF || !Nome || !Email || !Senha) {
      return res
        .status(400)
        .json({ error: "Todos os dados são obrigatórios." });
    }

    const hashedPassword = await bcrypt.hash(Senha, 10);

    const newUsuario = await db.one(
      "INSERT INTO Usuarios (CPF, Nome, Telefone, Email, Senha, Tipo, AutorizacaoFiado) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      [CPF, Nome, Telefone, Email, hashedPassword, Tipo, AutorizacaoFiado]
    );

    res.status(201).json(newUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao inserir o usuario." });
  }
});

app.post("/produto", async (req, res) => {
  try {
    const { PrecoVenda, Marca, Quantidade, DataValidade, CategoriaID } =
      req.body;
    if (!PrecoVenda || !Marca || !Quantidade || !DataValidade || !CategoriaID) {
      return res
        .status(400)
        .json({ error: "Todos os dados são obrigatórios." });
    }

    const newProduto = await db.one(
      "INSERT INTO Produtos (PrecoVenda, Marca, Quantidade, DataValidade, CategoriaID) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [PrecoVenda, Marca, Quantidade, DataValidade, CategoriaID]
    );

    res.status(201).json(newProduto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao inserir o produto." });
  }
});

app.post("/pedido", async (req, res) => {
  try {
    const {ID, CPF, Total, Finalizado } = req.body;
    if (!ID || !CPF || !Total) {
      return res
        .status(500)
        .json({ error: "Todos os dados são obrigatórios." });
    }

    const newPedido = await db.one(
      "INSERT INTO Pedidos (ID, CPF, Total, Finalizado) VALUES ($1, $2, $3, $4) RETURNING *;",
      [ID, CPF, Total, Finalizado]
    );

    res.status(201).json(newPedido);
  } catch (error) {
    console.error(error);
    console.log("aqui");
    res.status(500).json({ error: "Erro ao inserir o pedido." });
  }
});

app.post("/itemproduto", async (req, res) => {
  try {
    const { PedidoID, CodigoProduto, QuantidadeProdutos, Valor } = req.body;
    if (!PedidoID || !CodigoProduto || !QuantidadeProdutos || !Valor) {
      return res
        .status(500)
        .json({ error: "Todos os dados são obrigatórios." });
    }

    const newItem = await db.one(
      "INSERT INTO ItensProdutos (PedidoID, CodigoProduto, QuantidadeProdutos, Valor) VALUES ($1, $2, $3, $4) RETURNING *;",
      [PedidoID, CodigoProduto, QuantidadeProdutos, Valor]
    );

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    console.log("aqui");
    res.status(500).json({ error: "Erro ao inserir o item." });
  }
});

app.post("/fiado", async (req, res) => {
  try {
    const { CPF, ValorDevido, DataVencimento, StatusPagamento } = req.body;
    if (!CPF || !ValorDevido || !DataVencimento || !StatusPagamento) {
      return res
        .status(400)
        .json({ error: "Todos os dados são obrigatórios." });
    }

    const newUsuario = await db.one(
      "INSERT INTO ComprasCredito (CPF, ValorDevido, DataVencimento, StatusPagamento) VALUES ($1, $2, $3, $4) RETURNING *;",
      [CPF, ValorDevido, DataVencimento, StatusPagamento]
    );

    res.status(201).json(newUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao comprar crédito." });
  }
});

app.put("/atualizar/:cpf", async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const { AutorizacaoFiado } = req.body;

    const result = await db.oneOrNone("SELECT * FROM Usuarios WHERE CPF = $1", [
      cpf,
    ]);

    if (!result) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await db.none("UPDATE Usuarios SET AutorizacaoFiado = $1 WHERE CPF = $2;", [
      AutorizacaoFiado,
      cpf,
    ]);

    res
      .status(200)
      .json({ message: "AutorizacaoFiado atualizado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar AutorizacaoFiado." });
  }
});

app.put("/atualizarBebida/:codigoproduto", async (req, res) => {
  try {
    const codigoproduto = req.params.codigoproduto;
    const { Quantidade } = req.body;

    await db.oneOrNone(
      "UPDATE Produtos SET Quantidade = $1 WHERE CodigoProduto = $2;",
      [Quantidade, codigoproduto]
    );

    res.status(200).json({ message: "Quantidade atualizado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar Quantidade." });
  }
});

app.put("/finalizar", async (req, res) => {
  try {
    const { Finalizado, FinalizadoItens } = req.body;

    await db.oneOrNone("UPDATE Pedidos SET Finalizado = $1;", [Finalizado]);

    res.status(200).json({ message: "Finalizado atualizado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar Finalizado." });
  }
});

app.put("/atualizarConta/:cpf", async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const { statuspagamento } = req.body;

    await db.oneOrNone(
      "UPDATE ComprasCredito SET StatusPagamento = $1 WHERE CPF = $2;",
      [statuspagamento, cpf]
    );

    res.status(200).json({ message: "Conta atualizado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar Conta." });
  }
});

app.listen(3020, () => console.log("Servidor rodando na porta 3020."));
