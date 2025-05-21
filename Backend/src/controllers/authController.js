// const { getRepository } = require("typeorm");
const {User} = require("../entities/User.js");
const { generateToken } = require("../utils/jwtUtils.js");
const { hashPassword, comparePasswords } = require("../utils/passwordUtils.js");
const AppDataSource = require("../config/database.js");
// const signup = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     // console.log(username,password);
//     if (!username || !password) {
//       return res
//         .status(400)
//         .json({ message: "Username and password required" });
//     }

//     const userRepository = AppDataSource.getRepository(User);
//     // console.log(userRepository)
//     const existingUser = await userRepository.findOne({ where: { username } });
//     if (existingUser) {
//       return res.status(400).json({ message: "Username already taken" });
//     }

//     const hashedPassword = await hashPassword(password);

//     const user = userRepository.create({
//       username,
//       password: hashedPassword,
//       role: "Employee",
//     });
//     // console.log(user);
//     await userRepository.save(user);

//     res.status(201).json({ message: "User  registered successfully" });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await hashPassword(password);

    const user = userRepository.create({
      username,
      password: hashedPassword,
      role: role || "Employee", // ✅ allow custom role (Admin, Manager, etc.)
    });

    await userRepository.save(user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: user.id, role: user.role });
    console.log(user,token);

    res.json({ token, role: user.role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login };
