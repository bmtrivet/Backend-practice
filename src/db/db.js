const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "nikita8450",
//   port: "5432",
// });

class Database {
  static instanse = null;
  #pool;

  constructor() {
    this.#pool = new Pool({
      user: "qdmvhjnfqathck",
      host: "ec2-176-34-211-0.eu-west-1.compute.amazonaws.com",
      database: "d8ttupo4v4ptq5",
      password:
        "598496094d4a0a9d821cafb8171c3f42fee0fcec2968710d55187a5a44a40973",
      port: "5432",
      ssl: { rejectUnauthorized: false },
    });
  }

  static getInstance() {
    if (Database.instanse == null) {
      Database.instanse = new Database();
    }
    return Database.instanse;
  }

  execute = async (query) => {
    try {
      await this.#pool.connect(); // gets connection
      await this.#pool.query(query); // sends queries
      return true;
    } catch (error) {
      console.error(error.stack);
      return false;
    }
  };

  getPool = () => {
    return this.#pool;
  };
}

module.exports = {
  Database,
};
