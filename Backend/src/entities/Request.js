const { EntitySchema } = require("typeorm");

const Request = new EntitySchema({
  name: "Request",
  tableName: "requests",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    accessType: {
      type: "varchar",
    },
    reason: {
      type: "text",
    },
    status: {
      type: "varchar",
    },
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: true,
      eager: true,
      cascade: false,
    },
    software: {
      target: "Software",
      type: "many-to-one",
      joinColumn: true,
      eager: true,
      cascade: false,
    },
  },
});

module.exports = {Request}