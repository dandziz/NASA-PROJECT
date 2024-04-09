const launches = new Map();

let lastesFligherNumber = 100

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: false,
  success: true,
}

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunches(launch) {
  lastesFligherNumber++;
  launches.set(lastesFligherNumber, Object.assign(launch, {
    customer: ['Zero to Mastery', 'NASA'],
    upcoming: true,
    success: true,
    flightNumber: lastesFligherNumber,
  }))
}

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  launches,
  getAllLaunches,
  addNewLaunches,
  existsLaunchWithId,
  abortLaunchById
}