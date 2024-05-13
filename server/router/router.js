const Router = require("express");
const router = new Router();
const controllers = require("../controllers/controllers.js");
const adminAuth = require("../middlewares/admin-auth.js");

router.post("/registration", controllers.registration);
router.post("/login", controllers.login);
router.post("/logout", controllers.logout);
router.get("/refresh", controllers.refresh);
router.get("/getUsers",  controllers.getUsers);
router.post("/marker", controllers.createMark);
router.get("/marker", controllers.getMarks);
router.put("/marker/:markId", controllers.updateMark);
router.delete("/marker/:markId", controllers.deleteMark);

module.exports = router;
