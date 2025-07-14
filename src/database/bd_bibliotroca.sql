-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bd_bibliotroca
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bd_bibliotroca
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd_bibliotroca` DEFAULT CHARACTER SET utf8 ;
USE `bd_bibliotroca` ;

-- -----------------------------------------------------
-- Table `bd_bibliotroca`.`Estado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_bibliotroca`.`Estado` (
  `id_est` INT NOT NULL AUTO_INCREMENT,
  `uf_est` VARCHAR(45) NULL,
  `nome_est` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_est`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_bibliotroca`.`Cidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_bibliotroca`.`Cidade` (
  `id_cid` INT NOT NULL AUTO_INCREMENT,
  `nome_cid` VARCHAR(45) NOT NULL,
  `id_est_fk` INT NOT NULL,
  PRIMARY KEY (`id_cid`),
  INDEX `fk_Cidade_Estado_idx` (`id_est_fk` ASC) VISIBLE,
  CONSTRAINT `fk_Cidade_Estado`
    FOREIGN KEY (`id_est_fk`)
    REFERENCES `bd_bibliotroca`.`Estado` (`id_est`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_bibliotroca`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_bibliotroca`.`Usuario` (
  `id_usu` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nome_usu` VARCHAR(45) NOT NULL,
  `email_usu` VARCHAR(45) NOT NULL,
  `contato_usu` VARCHAR(45) NULL,
  `admin_usu` BOOLEAN NOT NULL DEFAULT FALSE,
  `senha_usu` VARCHAR(255) NOT NULL,
  `avaliacao_usu` INT NULL,
  `id_cid_fk` INT NOT NULL,
  INDEX `fk_Usuario_Cidade1_idx` (`id_cid_fk` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_Cidade1`
    FOREIGN KEY (`id_cid_fk`)
    REFERENCES `bd_bibliotroca`.`Cidade` (`id_cid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_bibliotroca`.`Editora`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_bibliotroca`.`Editora` (
  `id_edi` INT NOT NULL AUTO_INCREMENT,
  `nome_edi` VARCHAR(45) NOT NULL,
  `url_edi` VARCHAR(45) NULL,
  `contato_edi` VARCHAR(45) NULL,
  PRIMARY KEY (`id_edi`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_bibliotroca`.`Autor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_bibliotroca`.`Autor` (
  `id_aut` INT NOT NULL AUTO_INCREMENT,
  `nome_aut` VARCHAR(45) NOT NULL,
  `email_aut` VARCHAR(45) NULL,
  `imagem_aut` LONGTEXT NULL,
  `dataNascimento_aut` DATE NULL,
  `biografia` LONGTEXT NULL,
  PRIMARY KEY (`id_aut`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_bibliotroca`.`Livro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_bibliotroca`.`Livro` (
  `id_liv` INT NOT NULL AUTO_INCREMENT,
  `nome_liv` VARCHAR(45) NOT NULL,
  `imagem_liv` LONGTEXT NULL,
  `descricao_liv` VARCHAR(45) NULL,
  `dataAquisicao_liv` DATETIME NOT NULL,
  `conservacao_liv` VARCHAR(45) NULL,
  `id_edi_fk` INT NOT NULL,
  `id_aut_fk` INT NOT NULL,
  PRIMARY KEY (`id_liv`),
  INDEX `fk_Livro_Editora1_idx` (`id_edi_fk` ASC) VISIBLE,
  INDEX `fk_Livro_Autor1_idx` (`id_aut_fk` ASC) VISIBLE,
  CONSTRAINT `fk_Livro_Editora1`
    FOREIGN KEY (`id_edi_fk`)
    REFERENCES `bd_bibliotroca`.`Editora` (`id_edi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Livro_Autor1`
    FOREIGN KEY (`id_aut_fk`)
    REFERENCES `bd_bibliotroca`.`Autor` (`id_aut`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_bibliotroca`.`Genero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_bibliotroca`.`Genero` (
  `id_gen` INT NOT NULL AUTO_INCREMENT,
  `nome_gen` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_gen`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_bibliotroca`.`Desejo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_bibliotroca`.`Desejo` (
  `id_des` INT NOT NULL AUTO_INCREMENT,
  `id_usu_fk` INT NOT NULL,
  `id_liv_fk` INT NOT NULL,
  PRIMARY KEY (`id_des`),
  INDEX `fk_Desejo_Usuario1_idx` (`id_usu_fk` ASC) VISIBLE,
  INDEX `fk_Desejo_Livro1_idx` (`id_liv_fk` ASC) VISIBLE,
  CONSTRAINT `fk_Desejo_Usuario1`
    FOREIGN KEY (`id_usu_fk`)
    REFERENCES `bd_bibliotroca`.`Usuario` (`id_usu`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Desejo_Livro1`
    FOREIGN KEY (`id_liv_fk`)
    REFERENCES `bd_bibliotroca`.`Livro` (`id_liv`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_bibliotroca`.`Genero_Livro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_bibliotroca`.`Genero_Livro` (
  `id_gen_liv` INT NOT NULL AUTO_INCREMENT,
  `id_liv_fk` INT NOT NULL,
  `id_gen_fk` INT NOT NULL,
  PRIMARY KEY (`id_gen_liv`),
  INDEX `fk_Genero_Livro_Livro1_idx` (`id_liv_fk` ASC) VISIBLE,
  INDEX `fk_Genero_Livro_Genero1_idx` (`id_gen_fk` ASC) VISIBLE,
  CONSTRAINT `fk_Genero_Livro_Livro1`
    FOREIGN KEY (`id_liv_fk`)
    REFERENCES `bd_bibliotroca`.`Livro` (`id_liv`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Genero_Livro_Genero1`
    FOREIGN KEY (`id_gen_fk`)
    REFERENCES `bd_bibliotroca`.`Genero` (`id_gen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
