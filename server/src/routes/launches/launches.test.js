const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app).get("/launches").expect(200);
  });
});

describe("Test POST /launches", () => {
  const launchDataWithoutDate = {
    mission: "Wow",
    rocket: "Explorer IS1",
    target: "Kepler-1652 b",
  };

  const launchDataWithInvalidDate = {
    mission: "Wow",
    rocket: "Explorer IS1",
    target: "Kepler-1652 b",
    launchDate: "hhee",
  };

  const completeLaunchData = {
    mission: "Wow",
    rocket: "Explorer IS1",
    launchDate: "January 4, 2024",
    target: "Kepler-1652 b",
  };

  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);
    expect(response.body).toMatchObject({
      mission: "Wow",
      rocket: "Explorer IS1",
      launchDate: "2024-01-03T17:00:00.000Z",
      target: "Kepler-1652 b",
    });
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    })
  });

  test('It should catch invalid dates', async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    })
  })

});
