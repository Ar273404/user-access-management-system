const AppDataSource = require("../config/database");
const { Software } = require("../entities/Software");

const softwareRepo = AppDataSource.getRepository(Software);

// ✅ Create Software (Admin only)
const createSoftware = async (req, res) => {
  try {
    const { name, description, accessLevels } = req.body;

    if (
      !name ||
      !description ||
      !Array.isArray(accessLevels) ||
      accessLevels.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Name, description and accessLevels are required" });
    }

    const existing = await softwareRepo.findOne({ where: { name } });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Software with this name already exists" });
    }

    const software = softwareRepo.create({ name, description, accessLevels });
    await softwareRepo.save(software);
    res.status(201).json(software);
  } catch (err) {
    console.error("Create software error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get all Software
const getAllSoftware = async (req, res) => {
  try {
    const softwareList = await softwareRepo.find();
    res.json(softwareList);
  } catch (err) {
    console.error("Fetch software error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get single software by ID (for edit form)
const getSoftwareById = async (req, res) => {
  try {
    const { id } = req.params;
    const software = await softwareRepo.findOne({ where: { id: Number(id) } });

    if (!software) {
      return res.status(404).json({ message: "Software not found" });
    }

    res.json(software);
  } catch (err) {
    console.error("Fetch software by ID error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update Software by ID
const updateSoftware = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const software = await softwareRepo.findOne({ where: { id: Number(id) } });
    if (!software) {
      return res.status(404).json({ message: "Software not found" });
    }

    await softwareRepo.update(id, updates);
    res.json({ message: "Software updated" });
  } catch (err) {
    console.error("Update software error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete Software by ID
const deleteSoftware = async (req, res) => {
  try {
    const id = Number(req.params.id); // Always cast to Number

    console.log("Attempting to delete software with ID:", id);

    const software = await softwareRepo.findOne({ where: { id } });

    if (!software) {
      console.log("Software not found with ID:", id);
      return res.status(404).json({ message: "Software not found" });
    }

    await softwareRepo.remove(software); // ✅ SAFER than .delete(id)
    console.log("Software deleted successfully");

    res.json({ message: "Software deleted" });
  } catch (err) {
    console.error("Delete software error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  createSoftware,
  getAllSoftware,
  getSoftwareById, // ✅ Exported
  updateSoftware,
  deleteSoftware,
};
