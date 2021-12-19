/* eslint-disable no-console */
const Topics = require("../DBOperations/topics");
const Topic = require("../models/Topic");
const DBConnection = require("./connect");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });
let db;
const dbUrl = process.env.DB_URL || "defaultUrl";

describe("test database connection", () => {
  test("fail to retrieve data", async () => {
    try {
      db = await DBConnection.connect("invalidUrl");
    } catch (err) {
      console.log(err.message);
      expect(err.message).toBe("Could not connect to the database");
    }
  });
});
