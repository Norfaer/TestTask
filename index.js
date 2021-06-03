const { coinService } = require("./test.config");

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

module.exports = {
  ///Method 1 - Greedy coin exchange
  doCoinsExchange(n, availableCoins = [1, 5, 10, 25, 100, 200]) {
    // Validating input.
    // We take only cases that are not related to type.
    if (n < 0) {
      throw new ValidationError("Negatives not allowed");
    }
    // Should have non-empty availableCoins array
    if (availableCoins.length <= 1) {
      throw new ValidationError("Available coins array should have at least 1 element");
    }
    // Should not have zero or negative values in availableCoins
    if (~availableCoins.findIndex((el) => el <= 0)) {
      throw new ValidationError("Should not have zero or negative values in availableCoins");
    }
    // To resolve any cases make sure we have coin with "1" value
    if (!~availableCoins.findIndex((el) => el === 1)) {
      throw new ValidationError('Available coins array should have coin with "1" value');
    }
    const sortedCoins = availableCoins.sort((a, b) => b - a);
    let resultSet = [];
    for (let coin of sortedCoins) {
      d = Math.floor(n / coin);
      r = n % coin;
      if (d) {
        let appendedSet = new Array(d).fill(coin);
        resultSet = resultSet.concat(appendedSet);
        n -= d * coin;
      }
      if (!r) {
        return resultSet;
      }
    }
    throw new Error(`Failed to exchange givven value:${n}`);
  },

  doCoinsExchangeMin: function doCoinsExchangeMin(n, availableCoins = [1, 5, 10, 25, 100, 200]) {
    function countCoinsExchangeMin(n, availableCoins, cahedExchange = []) {
      let minCoins = n;
      let idx = availableCoins.findIndex((el) => el === n);
      if (idx !== -1) {
        cahedExchange[n] = 1;
        return 1;
      }
      if (cahedExchange[n]) {
        return cahedExchange[n];
      }
      for (let coin of availableCoins.filter((el) => el <= n)) {
        let numCoins = 1 + countCoinsExchangeMin(n - coin, availableCoins, cahedExchange);
        if (numCoins < minCoins) {
          minCoins = numCoins;
          cahedExchange[n] = minCoins;
        }
      }
      return minCoins;
    }

    let rest = n;
    let resultSet = [];
    let cahedExchange = [];
    while (rest !== 0) {
      let minCoins = rest;
      let nextCoin = 0;
      for (let coin of availableCoins.filter((el) => el <= rest)) {
        if (coin === rest) {
          nextCoin = coin;
          break;
        } else {
          let minCoinsNext = countCoinsExchangeMin(rest - coin, availableCoins, cahedExchange);
          if (minCoins > minCoinsNext) {
            minCoins = minCoinsNext;
            nextCoin = coin;
          }
        }
      }
      resultSet.push(nextCoin);
      rest -= nextCoin;
    }
    return resultSet;
  },

  doHierarchy(inArr) {
    // Validation input
    // Should not be empty
    if (inArr.length <= 1) {
      throw new ValidationError("Hierarchy should contain more than one element");
    }
    // Each elelment should be array of 2 elements
    if (
      !~inArr.findIndex((el) => {
        return Array.isArray(el) && el.length === 2;
      })
    ) {
      throw new ValidationError("Each elelment should be array with 2 elelments");
    }
    // First element should have null parent
    if (inArr[0][1] !== null) {
      throw new ValidationError("The first element must be the root");
    }
    if (
      inArr.findIndex((el, idx) => {
        return idx !== 0 ? el[1] === null : false;
      }) >= 1
    ) {
      throw new ValidationError("The first element must be the only root");
    }
    for (let i = 1; i < inArr.length; i++) {
      // Make sure that array is ordered so that parent go before children
      if (inArr.findIndex((el) => el[0] === inArr[i][1]) > i) {
        throw new ValidationError("Parent element should not be before child in hierarchy");
      }
      // Also make sure we do not have backloop elements where parent=child
      if (inArr[i][0] === inArr[i][1]) {
        throw new ValidationError("Element should not be parent of itself");
      }
    }
    // Get path (indexes only) for the element with given idx
    function getPath(idx) {
      const path = [];
      let parent = inArr[idx][1];
      let i = idx - 1;

      while (i >= 0 && parent) {
        if (inArr[i][0] === parent) {
          path.unshift(i);
          parent = inArr[i][1];
        }
        i--;
      }
      return path;
    }
    // Determine if the element with this index is the last child of it's parent
    function isLast(idx) {
      const parent = inArr[idx][1];
      for (let i = idx + 1; i < inArr.length; i++) {
        if (inArr[i][1] === parent) {
          return false;
        }
      }
      return true;
    }
    let str = "";
    for (let i = 0; i < inArr.length; i++) {
      let path = getPath(i);
      if (i) {
        str += "\n";
      }
      if (path.length) {
        for (let j = 1; j < path.length; j++) {
          str += isLast(path[j]) ? " " : "│";
        }
        str += isLast(i) ? "└" : "├";
      }
      str += inArr[i][0];
    }
    return str;
  },
};
