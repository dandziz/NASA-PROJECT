const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
} = require("../controllers/lauchnes.controller");

const express = require("express");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
