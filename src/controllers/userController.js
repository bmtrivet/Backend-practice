const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
const { User } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

const registration = async (req, res, next) => {
  const { email, password, role } = req.body;
  console.log(email);
  if (!email || !password) {
    return next(ApiError.badRequest("Uncorrect email or password"));
  }
  const candidate = await User.findOne({ where: { email } });
  if (candidate) {
    return next(ApiError.badRequest("User with such email already exist"));
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({ email, role, password: hashPassword });
  const token = generateJwt(user.id, user.email, user.role);
  return res.json(token);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(password);
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(ApiError.internal("User dont find"));
  }
  const comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    return next(ApiError.internal("Incorrect password"));
  }
  const token = generateJwt(user.id, user.email, user.role);
  return res.json(token);
};

const check = async (req, res) => {
  const token = generateJwt(req.user.id, req.user.email, req.user.role);
  return res.json(token);
};

module.exports = {
  registration,
  login,
  check,
};
