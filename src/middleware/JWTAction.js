require("dotenv").config();
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
    console.log(token);
  } catch (e) {
    console.log(e);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;
  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (e) {
    console.log(err);
  }
  return data;
};

const authMiddleware = (req, res, next) => {
  const accessToken = req.headers["Authorization"];
  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(
    accessToken.replace("Bearer ", ""),
    ACCESS_TOKEN_SECRET,
    async (err, user) => {
      // Thêm async ở đây
      if (err) {
        const refreshToken = req.headers["Refresh-Token"];
        if (!refreshToken) {
          return res.status(403).json({ error: "Invalid token" });
        }
        try {
          // Thêm try/catch ở đây
          jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) {
              return res.status(403).json({ error: "Invalid refresh token" });
            }
            const newAccessToken = generateAccessToken({
              id: user.id,
              username: user.username,
            });

            req.user = user;
            req.token = newAccessToken;
            next();
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      } else {
        req.user = user;
        next();
      }
    }
  );
};
const generateAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
module.exports = {
  createJWT,
  verifyToken,
  authMiddleware,
  generateAccessToken,
  generateRefreshToken,
};
