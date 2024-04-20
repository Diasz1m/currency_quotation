import express from "express";
const env = require("../../.env");
const app = express();
const request = require("request");
import axios from "axios";
const router = express.Router();


router.get("/api/", () => {
  axios.get(process.env.URL + "/json/last/USD-BRL").then((res: any) => {
    console.log(res.json());
  })
});

module.exports = router;
