module.exports = {
  coinService: {
    testCount: 200,
    minValue: 100,
    maxValue: 1000,
  },
  hierarchyService: {
    tests: [
      {
        input: [
          ["A", null],
          ["B", "A"],
          ["C", "B"],
          ["D", "C"],
          ["E", "A"],
        ],
        expected: "A\n├B\n│└C\n│ └D\n└E",
      },
      {
        input: [
          ["A", null],
          ["B", "A"],
          ["C", "B"],
          ["D", "B"],
          ["E", "A"],
        ],
        expected: "A\n├B\n│├C\n│└D\n└E",
      },
      {
        input: [
          ["A", null],
          ["B", "A"],
          ["C", "B"],
          ["D", "B"],
          ["E", "B"],
          ["F", "E"],
          ["G", "A"],
          ["H", "A"],
          ["J", "H"],
          ["K", "J"],
          ["L", "K"],
          ["M", "A"],
        ],
        expected: "A\n├B\n│├C\n│├D\n│└E\n│ └F\n├G\n├H\n│└J\n│ └K\n│  └L\n└M",
      },
    ],
  },
};
