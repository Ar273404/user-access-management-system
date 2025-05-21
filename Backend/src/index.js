const app = require("./app.js");
const AppDataSource = require("./config/database.js");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to DB and start server
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });
