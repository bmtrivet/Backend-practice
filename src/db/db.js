const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "nikita8450",
//   port: "5432",
// });

const pool = new Pool({
  user: "qdmvhjnfqathck",
  host: "ec2-176-34-211-0.eu-west-1.compute.amazonaws.com",
  database: "d8ttupo4v4ptq5",
  password: "598496094d4a0a9d821cafb8171c3f42fee0fcec2968710d55187a5a44a40973",
  port: "5432",
  ssl: { rejectUnauthorized: false },
});

const execute = async (query) => {
  try {
    await pool.connect(); // gets connection
    await pool.query(query); // sends queries
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

execute(
  `CREATE TABLE IF NOT EXISTS "news" ("id" SERIAL,"title" VARCHAR(250) NOT NULL,"description" TEXT NOT NULL,PRIMARY KEY ("id"));`
).then((result) => {
  if (result) {
    console.log("Table created");
  }
});

const createNews = (req, res) => {
  const { title, description } = req.body;
  pool.query(
    "INSERT INTO news (title, description) VALUES ($1, $2) RETURNING *",
    [title, description],
    (error, result) => {
      if (error) {
        throw new Error(error);
        res.end();
      }
      res.status(201).send(`News added with ID: ${result.rows[0].id}`);
    }
  );
};

const getAllNews = (req, res) => {
  pool.query("SELECT * FROM news ORDER BY id ASC", (error, result) => {
    if (error) {
      throw new Error(error);
      res.end();
    }
    res.status(200).json(result.rows);
  });
};

const getNewsById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM news WHERE id = $1", [id], (error, result) => {
    if (error) {
      throw new Error(error);
      res.end();
    }
    res.status(200).json(result.rows);
  });
};

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
};
