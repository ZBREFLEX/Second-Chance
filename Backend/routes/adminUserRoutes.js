const express = require("express");
const ctrl    = require("../controllers/adminUserController");
const router  = express.Router();

router.get("/",                 ctrl.getUsers);
router.post("/",                ctrl.createUser);
router.put("/:id",              ctrl.updateUser);
router.put("/bulk-status",      ctrl.bulkStatus);
router.delete("/",              ctrl.bulkDelete);

module.exports = router;
