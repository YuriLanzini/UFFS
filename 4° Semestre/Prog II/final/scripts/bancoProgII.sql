CREATE TABLE Usuarios (
    CPF VARCHAR(14) PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Telefone VARCHAR(15),
    Email VARCHAR(255) UNIQUE,
    Senha VARCHAR(255) NOT NULL,
    Tipo VARCHAR(20),
    AutorizacaoFiado BOOLEAN
);

CREATE TABLE Categorias (
    ID SERIAL PRIMARY KEY,
    Nome VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Produtos (
    CodigoProduto SERIAL PRIMARY KEY,
    PrecoVenda DECIMAL(10, 2),
    Marca VARCHAR(255),
    Quantidade INTEGER,
    DataValidade VARCHAR(10),
    CategoriaID INTEGER REFERENCES Categorias(ID)
);

CREATE TABLE Pedidos (
    ID INTEGER PRIMARY KEY,
    CPF VARCHAR(14) REFERENCES Usuarios(CPF),
    Total DECIMAL(10, 2),
    Finalizado BOOLEAN
);

CREATE TABLE ItensProdutos (
    PedidoID INTEGER REFERENCES Pedidos(ID),
    CodigoProduto INTEGER REFERENCES Produtos(CodigoProduto),
    QuantidadeProdutos INTEGER,
    Valor DECIMAL(10, 2)
);


CREATE TABLE ComprasCredito (
    CPF VARCHAR(14) REFERENCES Usuarios(CPF),
    ValorDevido DECIMAL(10, 2),
    DataVencimento VARCHAR(10),
    StatusPagamento VARCHAR(50)
);

INSERT INTO Categorias (Nome)
VALUES
    ('Cervejas'),
    ('Vinhos'),
    ('Destilados'),
    ('Refrigerantes');


INSERT INTO Produtos (PrecoVenda, Marca, Quantidade, DataValidade, CategoriaID)
VALUES
    (3.49, 'Brahma', 100, '31/12/2023', 1),
    (2.89, 'Skol', 150, '31/12/2023', 1),
    (25.99, 'Concha y Toro', 50, '30/06/2024', 2),
    (34.90, 'Santa Helena', 75, '30/06/2024', 2),
    (120.00, 'Jack Daniel''s', 30, '15/08/2024', 3),
    (133.00, 'Grey Goose', 40, '15/08/2024', 3),
    (3.69, 'Coca-Cola', 200, '01/10/2024', 4),
    (2.99, 'Pepsi', 180, '01/10/2024', 4);








