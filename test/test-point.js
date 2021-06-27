const { expect } = require("chai");

describe("Test points", function() {
  it("Inits point", async function() {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy([[1,2],[3,4]]);
    console.log(greeter.address);
    const point = await greeter.getPoint();
    console.log(point);
  });
});
