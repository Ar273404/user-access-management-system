const express = require("express");
const auth = require("../middleware/auth.js");
const roleMiddleware = require("../middleware/role.js");
const {
  submitRequest,
  getPendingRequests,
  updateRequestStatus,
  getMyRequests
} = require("../controllers/requestController.js");

const router = express.Router();

// Employee submits access request
router.post("/", auth, roleMiddleware(["Employee"]), submitRequest);

// Manager views pending requests
router.get("/pending", auth, roleMiddleware(["Manager"]), getPendingRequests);

// Manager approves or rejects a request
router.patch("/:id", auth, roleMiddleware(["Manager"]), updateRequestStatus);

//get request ststus by id
router.get("/my", auth, roleMiddleware(["Employee"]), getMyRequests);


module.exports = router;
