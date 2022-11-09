import app from "../src/app";
import chai from "chai";
import chaiHttp from "chai-http";
import mocha from "mocha";

chai.use(chaiHttp);
const expect = chai.expect;

describe("users", () => {
  it("should return 200 OK", () => {
    return chai
      .request(app)
      .get("/users")
      .then((res) => {
        expect(res.status).to.equal(200);
      });
  });

  it("should return an array", () => {
    return chai
      .request(app)
      .get("/users")
      .then((res) => {
        expect(Array.isArray(res.body)).to.equal(true);
      });
  });

  it("should create a new user", () => {
    return chai
      .request(app)
      .post("/users")
      .send({
        username: "Test User",
        email: "test@test.se",
        password: "123456",
      })
      .then((res) => {
        expect(res.status).to.equal(200);
      });
  });

  //   it("should return an array of objects", () => {
  //     return chai
  //       .request(app)
  //       .get("/users")
  //       .then((res) => {
  //         expect(res.body[0]).to.be.an("object");
  //       });
  //   });

  //   it("should return an array of objects with id and name", () => {
  //     return chai
  //       .request(app)
  //       .get("/users")
  //       .then((res) => {
  //         expect(res.body[0]).to.have.property("id");
  //         expect(res.body[0]).to.have.property("name");
  //       });
  //   });
});
