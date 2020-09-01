const ContextStrategy = require("./db/strategies/base/contenxtStrategy");
const MongoDB = require("./db/strategies/mongodb");
// const Postgres = require("./db/strategies/postgres");

const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();
// contextMongo.read();
// console.log("================================");
// const contextPostgres = new ContextStrategy(new Postgres());
// contextPostgres.create();
