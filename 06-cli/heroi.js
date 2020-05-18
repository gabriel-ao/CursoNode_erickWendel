class Heroi {
  constructor({ nome, individualidade, status, id }) {
    (this.nome = nome),
      (this.individualidade = individualidade),
      (this.status = status),
      (this.id = id);
  }
}

module.exports = Heroi;
