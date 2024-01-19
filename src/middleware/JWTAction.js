require("dotenv").config();
import jwt from "jsonwebtoken";

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

const authMiddleware = (req, res, next, payload) => {
  const token = createJWT(req.header("Authorization"), payload);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verifyToken(token.replace("Bearer ", ""), secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};
// function authMiddleware(req, res, next) {
//   const accessToken = req.header("Authorization");

//   if (!accessToken) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   jwt.verify(
//     accessToken.replace("Bearer ", ""),
//     ACCESS_TOKEN_SECRET,
//     (err, user) => {
//       if (err) {
//         const refreshToken = req.header("Refresh-Token");
//         if (!refreshToken) {
//           return res.status(403).json({ error: "Invalid token" });
//         }

//         jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
//           if (err) {
//             return res.status(403).json({ error: "Invalid refresh token" });
//           }

//           const newAccessToken = generateAccessToken({
//             id: user.id,
//             username: user.username,
//           });
//           req.user = user;
//           req.token = newAccessToken;
//           next();
//         });
//       } else {
//         req.user = user;
//         next();
//       }
//     }
//   );
// }

function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}
module.exports = {
  createJWT,
  verifyToken,
  authMiddleware,
  generateAccessToken,
  generateRefreshToken,
};
