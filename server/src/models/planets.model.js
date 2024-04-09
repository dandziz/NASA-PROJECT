'use sctrict';

const mongoose = require('mongoose'),
Schema = mongoose.Schema,
fs = require('fs'),
path = require('path'),
{ parse } = require('csv-parse');

const planetSchema = new Schema({
  keplerName: {
    type: String,
    require: true
  }
})

mongoose.model('Planet', planetSchema);
const planets = mongoose.model('Planet');

const habitablePlanets = []

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
  && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
  && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
    .pipe(parse({
      comment: '#',
      columns: true
    }))
    .on('data', async (data) => {
      if (isHabitablePlanet(data)) {
        //savePlanet(data)
        habitablePlanets.push(data)
      }
    })
    .on('error', (err) => {
      console.log(err);
      reject(err);
    })
    .on('end', async () => {
      //const countPlanetsFound = (await getAllPlanets()).length;
      habitablePlanets.map((planet) => {
        return planet['kepler_name']
      })
      console.log(`${habitablePlanets.length} habitable planets found!`);
      resolve();
    })
  })
}

async function getAllPlanets() {
  /*
  return await planets.find({}, {
    '_id': 0, '__v': 0,
  }) */
}

async function savePlanet(planet) {
  try {
    await planets.updateOne({
      keplerName: planet.kepler_name,
    }, {
      keplerName: planet.kepler_name,
    }, {
      upsert: true
    })
  } catch (e) {
    console.error(`Could not save planet ${e}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
  planets: habitablePlanets
}