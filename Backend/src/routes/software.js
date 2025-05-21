const express = require("express");
const auth = require("../middleware/auth.js"); // Verifies JWT
const roleMiddleware = require("../middleware/role.js"); // Verifies role

const {
  createSoftware,
  getAllSoftware,
  getSoftwareById, // ✅ Added for editing
  updateSoftware,
  deleteSoftware,
} = require("../controllers/softwareController.js");

const router = express.Router();

// 🟢 Any logged-in user can fetch software
router.get("/", auth, getAllSoftware);
router.get("/:id", auth, getSoftwareById); // ✅ Needed for frontend edit form

// 🔐 Admin only can modify software
router.post("/", auth, roleMiddleware(["Admin"]), createSoftware);
router.patch("/:id", auth, roleMiddleware(["Admin"]), updateSoftware);
router.delete("/:id", auth, roleMiddleware(["Admin"]), deleteSoftware);

module.exports = router;
