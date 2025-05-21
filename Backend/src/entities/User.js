// const { EntitySchema } = require("typeorm");

// module.exports = new EntitySchema({
//   name: "User",
//   tableName: "users",
//   columns: {
//     id: {
//       primary: true,
//       type: "int",
//       generated: true,
//     },
//     username: {
//       type: "varchar",
//       unique: true,
//     },
//     password: {
//       type: "varchar",
//     },
//     role: {
//       type: "varchar",
//     },
//   },
// });

// src/entities/User.js
const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
  name: "User", // 👈 make sure there is no trailing space
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
    role: {
      type: "varchar",
      default: "Employee",
    },
  },
});

module.exports = { User }; // ✅ must be named export
