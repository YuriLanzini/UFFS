create table cursos (
    id varchar(40) primary key,
    nome varchar(40),
    descricao varchar(1000),
    info varchar(40)
);

create table semestres (
    id_semestre serial primary key,
    descricao_sem varchar(40)
);

create table ccr (
    id_ccr varchar(40) primary key,
    materia varchar(40),
    descricao_ccr varchar(1000)
);

create table horarios (
    id_horario serial primary key,
    id_curso varchar(40) not null,
    id_semestre integer not null,
    dia varchar(40),
    horario varchar(40),
    id_ccr varchar(40),
    constraint fk_cursos foreign key (id_curso) references cursos(id),
    constraint fk_semestres foreign key (id_semestre) references semestres(id_semestre),
    constraint fk_ccr foreign key (id_ccr) references ccr(id_ccr)
);


insert into cursos (id, nome, descricao ,info) values 
('CCCC-CH','Curso de Computação', 'O Curso de Ciência da Computação da UFFS é um curso que pretende, através de bases sólidas da área de computação, formar cientistas capazes de terem um papel importante em áreas da tecnologia da informação (TI), tanto na indústria quanto na academia. O curso oferece várias opções para o estudante se aprofundar: banco de dados, computação gráfica, redes de computadores, engenharia de software, hardware e teoria da computação. T','Prof. Yuri'),

('CCADCH','Curso de Administração', 'O curso de Graduação em Administração da Universidade Federal da Fronteira Sul forma profissionais administradores com conhecimentos, habilidades e atitudes para gerenciarem e liderarem todos os tipos de empreendimentos, sejam eles empresas, organizações ou projetos, planejando, controlando, organizando e dirigindo essas atividades.','Prof. João');


insert into semestres (descricao_sem) values 
('1° Semestre Noturno'),
('2° Semestre Noturno');


insert into ccr (id_ccr, materia, descricao_ccr) values 
( 'GCH293','Introdução a Filosofia','A natureza e especificidade do discurso filosófico e sua relação com outros campos do conhecimento; principais correntes do pensamento filosófico; Fundamentos filosóficos da Modernidade. Tópicos de Ética e de Epistemologia.'),

( 'GEX208','Informática Básica','Fundamentos de informática. Conhecimentos de sistemas operacionais. Utilização da rede mundial de computadores. Ambientes virtuais de aprendizagem. Conhecimentos de softwares de produtividade para criação de projetos educativos e/ou técnicos e/ou multimidiáticos.'),

( 'GEX213','Matemática C', 'Grandezas proporcionais. Noções de geometria. Conjuntos numéricos. Equações e inequações. Funções.'),

( 'GEX003','Algoritmos e Programação', 'Conceito e construção de algoritmos. Tipos básicos de dados. Comandos de atribuição, condicionais e de repetição. Registros/estruturas. Vetores e Matrizes. Strings. Modularização. Operações básicas em arquivos. Recursão. Ponteiros.'),

( 'GEX210','Estatísca Básica', 'Noções básicas de Estatística. Séries e gráficos estatísticos. Distribuições de frequências. Medidas de tendência central. Medidas de dispersão. Medidas separatrizes. Análise de Assimetria. Noções de probabilidade e inferência.'),

('GEX605', 'Estruturas de dados', 'Conceitos básicos de complexidade de algoritmos. Alocação dinâmica de memória. Tipos Abstratos de Dados. Listas lineares e suas generalizações: listas ordenadas, listas encadeadas, pilhas e filas. Hashing: funções e tratamento de colisões. Árvores: representação, operações e percursos em árvores. Árvores binárias de busca e balanceadas. Heaps. Árvore de Fenwick. Implementações com linguagem imperativa estruturada.'),

('GEX055', 'Probabilidade e estatística', 'Probabilidade. Teorema de Bayes. Variáveis aleatórias discretas e contínuas. Principais distribuições discretas. Principais distribuições contínuas. Estimação de parâmetros. Testes de hipóteses. Correlação e Regressão. Princípios Básicos de Experimentação.'),

('GLA104', 'Produção textual acadêmica', 'Língua, linguagem e sociedade. Leitura e produção de textos. Mecanismos de textualização e de argumentação dos gêneros acadêmicos: resumo, resenha, handout, seminário. Estrutura geral e função sociodiscursiva do artigo científico. Tópicos de revisão textual.'),

('GEX178', 'Cálculo I', 'Limite e continuidade de funções de uma variável real. Derivadas. Aplicações da derivada. Integrais definidas e indefinidas. Teorema fundamental do Cálculo. Cálculo de áreas. Aplicações da integral.'),

('GEN253', 'Circuitos digitais', 'Fundamentos de Eletrônica. Famílias Lógicas. Simulação de Circuitos Lógicos. Álgebra de Boole. Circuitos Combinacionais: codificadores, multiplexadores e aritméticos. Circuitos Sequenciais: Latches, Flip-Flops e Registradores. Memórias.');


insert into horarios (id_curso, id_semestre, dia, horario, id_ccr) values 
('CCCC-CH', 1, 'Segunda-feira', '19:10h - 21h', 'GCH293'),
('CCCC-CH', 1, 'Terça-feira', '19:10h - 21h', 'GEX208'),
('CCCC-CH', 1, 'Quarta-feira', '19:10h - 21h','GEX213'),
('CCCC-CH', 1, 'Quinta-feira', '19:10h - 21h', 'GEX003'),
('CCCC-CH', 1, 'Sexta-feira', '19:10h - 21h',  'GEX210'),

('CCCC-CH', 2, 'Segunda-feira', '19:10h - 21h', 'GEX605'),
('CCCC-CH', 2, 'Terça-feira', '19:10h - 21h', 'GEX055'),
('CCCC-CH', 2, 'Quarta-feira', '19:10h - 21h', 'GLA104'),
('CCCC-CH', 2, 'Quinta-feira', '19:10h - 21h', 'GEX178'),
('CCCC-CH', 2, 'Sexta-feira', '19:10h - 21h',  'GEN253'),


('CCADCH', 1, 'Segunda-feira', '19:10h - 21h', 'GCH293'),
('CCADCH', 1, 'Terça-feira', '19:10h - 21h', 'GEX208'),
('CCADCH', 1, 'Quarta-feira', '19:10h - 21h','GEX213'),
('CCADCH', 1, 'Quinta-feira', '19:10h - 21h', 'GEX003'),
('CCADCH', 1, 'Sexta-feira', '19:10h - 21h',  'GEX210'),

('CCADCH', 2, 'Segunda-feira', '19:10h - 21h', 'GEX605'),
('CCADCH', 2, 'Terça-feira', '19:10h - 21h', 'GEX055'),
('CCADCH', 2, 'Quarta-feira', '19:10h - 21h', 'GLA104'),
('CCADCH', 2, 'Quinta-feira', '19:10h - 21h', 'GEX178'),
('CCADCH', 2, 'Sexta-feira', '19:10h - 21h',  'GEN253');


