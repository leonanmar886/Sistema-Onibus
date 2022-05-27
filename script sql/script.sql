CREATE TABLE `sistemaonibus`.`onibus` (
  `oni_id` INT NOT NULL AUTO_INCREMENT,
  `oni_linha` INT NULL,
  `oni_assentos` VARCHAR(90) NULL,
  `oni_data` DATE,
  PRIMARY KEY (`oni_id`));

GO 

CREATE TABLE `sistemaonibus`.`linhas` (
  `lin_id` INT NOT NULL AUTO_INCREMENT,
  `lin_destino` INT NULL,
  `lin_valor` FLOAT NULL,
  `lin_horario` TIME,
  `lin_descricao` VARCHAR(45) NULL,
  PRIMARY KEY (`lin_id`));

  GO 

  CREATE TABLE `sistemaonibus`.`destinos` (
  `des_id` INT NOT NULL AUTO_INCREMENT,
  `des_nome` VARCHAR(45) NULL,
  `des_endereco` VARCHAR(45) NULL,
  PRIMARY KEY (`des_id`));
