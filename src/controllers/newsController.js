const { News } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

const createNews = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { img } = req.files;
    const fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));

    const news = await News.create({ title, description, img: fileName });
    return res.json(news);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

const getAllNews = async (req, res) => {
  let { limit, page } = req.query;
  page = page || 1;
  limit = limit || 10;

  let offset = page * limit - limit;

  const newses = await News.findAll({ limit, offset });
  return res.json(newses);
};

const getNewsById = async (req, res) => {
  const id = parseInt(req.params.id);

  const news = await News.findOne({
    where: { id },
  });

  return res.json(news);
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

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  deleteNewsById,
  updateNewsById,
};
