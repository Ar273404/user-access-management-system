const { Request } = require("../entities/Request.js");
const { Software } = require("../entities/Software.js");
const { User } = require("../entities/User.js");
const AppDataSource = require("../config/database.js");

// ✅ Submit Request (Employee)
const submitRequest = async (req, res) => {
  try {
    const { softwareId, accessType, reason } = req.body;

    if (!softwareId || !accessType || !reason) {
      return res
        .status(400)
        .json({ message: "softwareId, accessType, and reason are required" });
    }

    const softwareRepository = AppDataSource.getRepository(Software);
    const software = await softwareRepository.findOne({
      where: { id: softwareId },
    });

    if (!software) {
      return res.status(404).json({ message: "Software not found" });
    }

    if (!software.accessLevels.includes(accessType)) {
      return res
        .status(400)
        .json({ message: "Invalid accessType for this software" });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const requestRepository = AppDataSource.getRepository(Request);
    const request = requestRepository.create({
      user,
      software,
      accessType,
      reason,
      status: "Pending",
    });

    await requestRepository.save(request);

    res.status(201).json(request);
  } catch (err) {
    console.error("Error submitting request:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Manager: Get all pending requests
const getPendingRequests = async (req, res) => {
  try {
    const requestRepository = AppDataSource.getRepository(Request);
    const pendingRequests = await requestRepository.find({
      where: { status: "Pending" },
      relations: ["user", "software"],
    });

    res.json(pendingRequests);
  } catch (err) {
    console.error("Error fetching pending requests:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Manager: Update request status
const updateRequestStatus = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Status must be Approved or Rejected" });
    }

    const requestRepository = AppDataSource.getRepository(Request);
    const request = await requestRepository.findOne({
      where: { id: requestId },
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    request.status = status;
    await requestRepository.save(request);

    res.json(request);
  } catch (err) {
    console.error("Error updating request:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Employee: Get my own submitted requests
const getMyRequests = async (req, res) => {
  try {
    const requestRepository = AppDataSource.getRepository(Request);
    const myRequests = await requestRepository.find({
      where: { user: { id: req.user.id } },
      relations: ["software"],
      order: { id: "DESC" },
    });

    res.json(myRequests);
  } catch (err) {
    console.error("Error fetching my requests:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  submitRequest,
  getPendingRequests,
  updateRequestStatus,
  getMyRequests, // ✅ include this
};
