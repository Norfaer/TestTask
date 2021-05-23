# TestTask

## Install and launch
Run following commands:
```
npm install
npm run test
```

## Test config file.
In test.config.js file you can set differend parameters for testing.
* For generative tests of "coins task" you can set the depth and range of the test
* For "hierarchy" task you can set the input and expected result data.

## Concerning test tasks.
I have added some validation rules for the input (they are included to the tests also). Also in the first task i made it possible to use variable array of available coin values as the second parameter of the function. As long as it includes "1" coin
