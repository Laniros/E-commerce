const express = require("express");
const router = express.Router();

const {
    create,
    cartById,
    read,
    update,
} = require("../controllers/cart");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/cart/create/:userId", requireSignin, isAuth, create);
router.delete(
    "/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);

router.param("cartId", cartById);
router.param("userId", userById);

module.exports = router;
