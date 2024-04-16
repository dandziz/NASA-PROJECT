const { httpGetAllPlanets } = require('../../controllers/planets.controller')

const express = require('express')

const planetsRouter = express.Router();

planetsRouter.get('/', httpGetAllPlanets)

module.exports = planetsRouter;