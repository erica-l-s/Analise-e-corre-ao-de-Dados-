-- TABLE
CREATE TABLE 'fixed_database_1' (data TEXT,id_marca_ INTEGER,vendas INTEGER,valor_do_veiculo INTEGER,nome TEXT);
CREATE TABLE 'fixed_database_2' (id_marca INTEGER,marca TEXT);
CREATE TABLE Vendas (
  data DATE,
  id_marca INTEGER PRIMARY KEY,
  vendas REAL,
  valor_do_veiculo REAL,
  nome TEXT,
  marca TEXT);
 
INSERT INTO Vendas (data, vendas, valor_do_veiculo, nome)
SELECT data, vendas, valor_do_veiculo, nome
FROM fixed_database_1;

INSERT INTO Vendas (marca)
SELECT marca
FROM fixed_database_2;

INSERT INTO Vendas (nome, marca, vendas, data, valor_do_veiculo)
SELECT
    f1.nome,
    f2.marca,
    f1.valor_do_veiculo,
    f1.vendas,
    f1.id_marca_ AS id_marca
FROM
    fixed_database_1 f1
INNER JOIN
    fixed_database_2 f2 ON f1.id_marca_ = f2.id_marca;

-- 1. Qual marca teve o maior volume de vendas?
SELECT nome, SUM(valor_do_veiculo) AS volumeVendas
FROM Vendas
GROUP BY nome
ORDER BY volumeVendas DESC
LIMIT 1;

-- 2. Qual veículo gerou a maior receita?
SELECT nome, MAX(valor_do_veiculo) AS maiorReceita
FROM Vendas;

-- 2.1 Qual veículo gerou a menor receita?
SELECT nome, MIN(valor_do_veiculo) AS menorReceita
FROM Vendas;

-- 3. Média de vendas do ano por marca
SELECT nome, AVG(valor_do_veiculo) AS mediaVendas
FROM Vendas
GROUP BY nome;

-- 4. Marcas que geraram uma receita maior com número menor de vendasSELECT
 SELECT
    marca,
    SUM(valor_do_veiculo) AS receita_total,
    COUNT(*) AS volume_de_vendas
FROM
    Vendas
GROUP BY
    marca
ORDER BY
    receita_total DESC, volume_de_vendas ASC;


   
 
