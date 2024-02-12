import { getUser } from "../utils/settinguuid.js";

const checkLogin = async (req, res, next) => {
  const userUUID = req.cookies.uid;

  if (!userUUID) {
    return res.redirect("/login");
  }

  try {
    const user = await getUser(userUUID);

    if (!user) {
      return res.redirect("/login");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.redirect("/login");
  }
};
const checkAuth = async (req, res, next) => {
  const userUUID = req.cookies.uid;
  const user = await getUser(userUUID);
  if (user) {
    req.user = user;
  }
  next();
};

export { checkLogin, checkAuth };
