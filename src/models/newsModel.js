const Database = require("../db/db.js");
const express = require("express");
const router = express.Router();

const db = Database.Database.getInstance();
const pool = db.getPool();

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

const updateNewsById = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;

  pool.query(
    "UPDATE news SET title = $1, description = $2 WHERE id = $3",
    [title, description, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`News modified with ID: ${id}`);
    }
  );
};

const deleteNewsById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM news WHERE id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`News deleted with ID: ${id}`);
  });
};

router.get("/news", getAllNews);
router.get("/news/:id", getNewsById);
router.post("/news", createNews);
router.put("/news/:id", updateNewsById);
router.delete("/news/:id", deleteNewsById);

module.exports = {
  router,
};
