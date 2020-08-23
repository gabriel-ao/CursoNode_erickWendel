class MongoDB extends ICrud {
  constructor() {
    super();
  }
  create(item) {
    console.log("O item foi salvo em mongoDB");
  }
}

class Postgres extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("O item foi salvo em Postgres");
  }
}

class ContextStrategy {
  constructor(strategy) {
    this._database = strategy;
  }

  create(item) {
    return this._database.create(item);
  }

  read(item) {
    return this._database.read(item);
  }

  update(id, item) {
    return this._database.update(id, item);
  }

  delete(id) {
    return this._database.delete(id);
  }
}

const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();
contextMongo.read();
console.log("================================");
const contextPostgres = new ContextStrategy(new Postgres());
contextPostgres.create();
