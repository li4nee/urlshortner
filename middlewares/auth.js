import { getUser } from "../utils/settinguuid.js";

async function checkForAuthentication(req, res, next) {
  req.user = null;
  const authorizationHeaderFromCookie = req.cookies?.uid;
  if (!authorizationHeaderFromCookie) {
    return next();
  }
  const token = authorizationHeaderFromCookie;
  const user = await getUser(token);
  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login");
    }
    const userRole=req.user.role;
    if (!roles.includes(userRole)) {
      console.log("Unauthorized:", req.user, roles);
      return res.end("UnAuthorized");
    }
    return next();
  };
}

export { restrictTo, checkForAuthentication };
