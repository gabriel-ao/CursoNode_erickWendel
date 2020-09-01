DROP TABLE IF EXISTS TB_HEROIS;

-- CREATE
CREATE TABLE TB_HEROIS (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    INDIVIDUALIDADE TEXT NOT NULL,
    STATUS_HEROIS TEXT NOT NULL
)

-- INSERT 
INSERT INTO TB_HEROIS (NOME, INDIVIDUALIDADE, STATUS_HEROIS)
VALUES ('SHOKO TODOROKI', 'MEIO-QUENTE E MEIO-FRIO', 'HEROI'),
('ENDEAVOR TODOROKI', 'QUENTE', 'HEROI')


-- UPDATE
UPDATE TB_HEROIS SET NOME = 'ENDEAVOR' WHERE ID = 2 

-- DELETE

DELETE FROM TB_HEROIS WHERE ID = 2