require('mocha-testcheck').install();
const lib = require('./index');
const assert = require('assert').strict;
const { coinService, hierarchyService } = require('./test.config');

describe(`Coin service test group:`, () => {
  it('Should fail test with negative input', () => {
    try {
      lib.doCoinsExchange(-3);
      assert.fail("Should never get here");
    }
    catch ({ code, name, message}) {
      assert.strictEqual(name, "ValidationError");
    }
  });
  it('Should fail test empty array', () => {
    try {
      lib.doCoinsExchange(10, []);
      assert.fail("Should never get here");
    }
    catch ({ code, name, message}) {
      assert.strictEqual(name, "ValidationError");
    }
  });
  it("Should fail test with zero elemnts in array", () => {
    try {
      lib.doCoinsExchange(10, [1,0,3,5,10]);
      assert.fail("Should never get here");
    }
    catch ({ code, name, message}) {
      assert.strictEqual(name, "ValidationError");
    }
  });
  it("Should fail test with negative elemnts in array", () => {
    try {
      lib.doCoinsExchange(10, [1,-10,3,5,10]);
      assert.fail("Should never get here");
    }
    catch ({ code, name, message}) {
      assert.strictEqual(name, "ValidationError");
    }
  });
  it('Should fail test with array without "1"', () => {
    try {
      lib.doCoinsExchange(10, [3,5,10]);
      assert.fail("Should never get here");
    }
    catch ({ code, name, message}) {
      assert.strictEqual(name, "ValidationError");
    }
  });

  // Here we use generative testing with int property within given interval
  // Generate random array of available coins.
  var genUniqueInts = gen.uniqueArray(gen.intWithin(1, 100), int => int, { minSize: 5, maxSize: 10 });
  check.it(`Run test for ${coinService.testCount} times`, { times: coinService.testCount }, gen.intWithin(coinService.minValue, coinService.maxValue), genUniqueInts, (n, a) => {
    // Make sure we have 1 in array;
    a.push(1);
    try {
      result = lib.doCoinsExchange(n, a);
    }
    catch (e) {
      assert.fail('Should never get here');
    }
    let minCoins = lib.countCoinsExchangeMin(n, a);
    console.log(`Test case ${n} => ${a.join(',')} => ${result.join(',')} (greedy: ${result.length}, min: ${minCoins})`);
    // The main assumption is that the summ of the array with coins values should be equal to the input value which we decomposed
    checkSum = result.reduce((acc, cur) => acc + cur, 0);
    // Also we check that returned array is within [1,n] size range
    return n === checkSum && result.length >=1 && result.length <=n;
  });
});

describe(`Hierarchy service test group:`, () => {
  let i = 1;

  it('Should fail test with empty input', () => {
    try {
      lib.doHierarchy([]);
      assert.fail("Should never get here");
    }
    catch ({ code, name, message}) {
      assert.strictEqual(name, "ValidationError");
    }
  });
  it('Should fail test with invalid element format', () => {
    try {
      lib.doHierarchy([{a:"b"},2,"str"]);
      assert.fail("Should never get here");
    }
    catch ({ code, name, message}) {
      assert.strictEqual(name, "ValidationError");
    }
  });
  it('Should fail test with first element not being the root', () => {
    try {
      lib.doHierarchy([["A","B"],["C","A"]]);
      assert.fail("Should never get here");
    }
    catch ({ code, name, message}) {
      assert.strictEqual(name, "ValidationError");
    }
  });
  it('Should fail test with two elements being root', () => {
    try {
      lib.doHierarchy([["A",null],["B",null]]);
      assert.fail("Should never get here");
    }
    catch ({ code, name, message}) {
      assert.strictEqual(name, "ValidationError");
    }
  });
  it('Should fail test with unordered array', () => {
    try {
      lib.doHierarchy([["A",null],["D","B"],["B","A"]]);
      assert.fail("Should never get here");
    }
    catch ({ code, name, message}) {
      assert.strictEqual(name, "ValidationError");
    }
  });
  it('Should fail test with backloop elements like ["A", "A"]', () => {
    try {
      lib.doHierarchy([["A",null],["B","A"],["C","C"]]);
      assert.fail("Should never get here");
    }
    catch ({ code, name, message}) {
      assert.strictEqual(name, "ValidationError");
    }
  });

  for (let test of hierarchyService.tests) {
    describe(`Hierarchy test case ${i}.`, () => {
      it('Result of function is as expected', () => {
        let result = lib.doHierarchy(test.input);
        console.log(`RESULT:\n${result}\nEXPECTED:\n${test.expected}`);
        assert.strictEqual(result, test.expected);
      })
    });
    i++;
  }
});