-- Crie dois diretórios no sistema de arquivos do Linux no diretório raiz 

-- sudo mkdir /tablespace1

-- sudo mkdir /tablespace2

 -- Altere o proprietário e o grupo do diretório "tablespace1" e "tablespace2" para o usuário e grupo "postgres"
 
-- sudo chown -R postgres:postgres /tablespace1

-- sudo chown -R postgres:postgres /tables


-- Crie duas tablespaces

CREATE TABLESPACE tablespc1 LOCATION '/tablespace1';
CREATE TABLESPACE tablespc2 LOCATION '/tablespace2';

-- Crie dois usuários

CREATE USER usuario1 WITH PASSWORD 'senha1';
CREATE USER usuario2 WITH PASSWORD 'senha2';


-- Crie um banco de dados utilizando uma das tablespaces criadas como default (procure na documentação as opções de create database)

CREATE DATABASE banco TABLESPACE tablespc1;


-- Acesse o banco criado


\c banco;


-- Crie um esquema

CREATE SCHEMA esquema;


-- Aponte o esquema criado como padrão para um dos usuários

ALTER SCHEMA esquema OWNER TO usuario1;


-- Altere o dono do BD para um dos usuários criados e o esquema default para o recém criado (procure na documentação as opções do alter database)

ALTER DATABASE banco OWNER TO usuario1;
ALTER DATABASE banco SET search_path TO esquema;


-- Acesse o banco criado com o usuario principal


\c banco usuario1;


-- Crie o script do banco de dados utilizado em aulas anteriores (produto x venda) - a tabela sales foi alterada (acerte o script)

CREATE TABLE product (					
	pid integer not null primary key,				
	name varchar(30) not null,					
	pqty  integer not null);
	
CREATE TABLE sale (
	sid integer not null primary key,
	sdate date not null,
	address varchar(30) not null);

CREATE TABLE sale_item (
	sid integer not null,
	pid integer not null,
	sqty integer not null,
	CONSTRAINT pk_sale_item PRIMARY KEY (sid,pid),
	CONSTRAINT fk_sale_item_sale FOREIGN KEY (sid) REFERENCES sale(sid),
	CONSTRAINT fk_sale_item_product FOREIGN KEY (pid) REFERENCES product(pid)
);


-- Popule o BD com os scripts implementados em sala de aula (1000 produtos, 500 cupons e +1000 produtos vendidos) - a tabela foi alterada, acerte o script

CREATE OR REPLACE PROCEDURE ins_product (qttuple INT) AS $$
DECLARE
    c INT := 1;
    pr_tup product%rowtype;
BEGIN
    LOOP
        EXIT WHEN c > qttuple;
        pr_tup.pid := (random() * 10000)::INT;
        pr_tup.name := LEFT(MD5(random()::text), 30); 
        pr_tup.pqty := (random() * 100)::INT;
        IF NOT EXISTS (SELECT 1 FROM product WHERE pid = pr_tup.pid) THEN
            INSERT INTO product (pid, name, pqty) VALUES (pr_tup.pid, pr_tup.name, pr_tup.pqty);
            c := c + 1;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

CALL ins_product(1000);


CREATE OR REPLACE PROCEDURE ins_sale (qttuple INT) AS $$
DECLARE
    c INT := 1;
    s_item sale%rowtype;
BEGIN
    LOOP
        EXIT WHEN c > qttuple;
        s_item.sid := (random() * 10000)::INT;
        s_item.sdate := '1940-01-01 00:00:00'::timestamp + random() * (now() - timestamp '1940-01-01 00:00:00');
        IF NOT EXISTS (SELECT 1 FROM sale WHERE sid = s_item.sid) THEN
            INSERT INTO sale (sid, sdate, address) VALUES (s_item.sid, s_item.sdate, '');
            c := c + 1;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

CALL ins_sale(500);


CREATE OR REPLACE PROCEDURE ins_sale_item (qttuple INT) AS $$
DECLARE
    c INT := 1;
    s_item sale_item%rowtype;
BEGIN
    LOOP
        EXIT WHEN c > qttuple;
       
        s_item.sid := (SELECT sid FROM sale ORDER BY random() LIMIT 1);
        s_item.pid := (SELECT pid FROM product ORDER BY random() LIMIT 1);
        s_item.sqty := (random() * 10)::INT;
        
        IF NOT EXISTS (SELECT 1 FROM sale_item WHERE sid = s_item.sid AND pid = s_item.pid) THEN
            INSERT INTO sale_item (sid, pid, sqty) VALUES (s_item.sid, s_item.pid, s_item.sqty);
            c := c + 1;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

CALL ins_sale_item(1100);



-- Crie uma trigger que armazene em uma tabela de auditoria todas as vezes que a quantidade vendida de um produto for alterada (ou uma venda de produto for excluída). A tabela de auditoria deverá ter a operação, o valor antigo e novo (se for o caso), data e hora da operação e usuário. Esta tabela não tem PK


CREATE TABLE audit_log (
    operation TEXT,
    old_value INT,
    new_value INT,
    operation_timestamp TIMESTAMP,
    username TEXT
);

CREATE OR REPLACE FUNCTION audit_quantity_change()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (operation, old_value, new_value, operation_timestamp, username)
        VALUES ('Update Quantity', OLD.sqty, NEW.sqty, current_timestamp, current_user);
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (operation, old_value, operation_timestamp, username)
        VALUES ('Delete Sale', OLD.sqty, current_timestamp, current_user);
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sale_item_audit_trigger
AFTER UPDATE OR DELETE ON sale_item
FOR EACH ROW
EXECUTE FUNCTION audit_quantity_change();



-- Crie um índice não único para a data da venda, neste índice, inclua o endereço

CREATE INDEX idx_sale_date ON sale (sdate);
CREATE INDEX idx_sale_date_address ON sale (sdate, address);


-- Para o usuário não dono do BD, dê alguns privilégios: select em product e sale, todos para sale_item


GRANT USAGE ON SCHEMA esquema TO usuario2;
GRANT SELECT ON esquema.product, esquema.sale, esquema.sale_item TO usuario2;
GRANT ALL ON sale_item TO usuario2;
GRANT INSERT ON audit_log TO usuario2;





