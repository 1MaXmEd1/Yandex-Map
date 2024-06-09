const Router = require("express");
const router = new Router();
const userControllers = require("../controllers/userControllers.js");
const markControllers = require("../controllers/markControllers.js");
const adminAuth = require("../middleware/adminAuth.js");

router.post("/registration", userControllers.registration);
router.post("/login", userControllers.login);
router.post("/logout", userControllers.logout);
router.get("/refresh", userControllers.refresh);
router.get("/getUsers", adminAuth, userControllers.getUsers);
router.post("/marker", markControllers.createMark);
router.get("/marker", markControllers.getMarks);
router.put("/marker/:markId", markControllers.updateMark);
router.delete("/marker/:markId", markControllers.deleteMark);

module.exports = router;