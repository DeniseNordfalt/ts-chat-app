import app from "../src/app";
import chai from "chai";
import chaiHttp from "chai-http";
import mocha from "mocha";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Auth", () => {
  it("should return 200 OK", () => {
    return chai
      .request(app)
      .get("/auth")
      .then((res) => {
        expect(res.status).to.equal(200);
      });
  });

  //   it("should return 200 OK", () => {
  //     return chai
  //       .request(app)
  //       .post("/auth/login")
  //       .then((res) => {
  //         expect(res.status).to.equal(200);
  //       });
  //   });
});
