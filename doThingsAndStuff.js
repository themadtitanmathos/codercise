// New function
const fp = require('lodash/fp');

const getPostSpace = str => str.substr(str.indexOf(' ') + 1);

const reduceStringToCharCodeArray = fp.flow([
  fp.map(fp.identity),
  fp.map(l => l.charCodeAt(0))
]);

const determineShouldInjectOrContinue = (postSpaceOfVal, postSpaceOfRes) => {
  let shouldInject = false;
  let shouldContinue = true;

  const valCharCodes = reduceStringToCharCodeArray(postSpaceOfVal);
  const resCharCodes = reduceStringToCharCodeArray(postSpaceOfRes);

  // Iterate over the char codes of the result string, determine if we should
  // A) continue (if the strings are equal and the res string is shorter)
  // B) inject (if the val string is shorter or comes before the res string alphabetically)
  // C) neither continue, nor inject (the val string comes after the res string alphabetically)
  for (let i = 0; i < resCharCodes.length; i += 1) {
    const resCharCode = resCharCodes[i];
    const valCharCode = valCharCodes[i];
    if (valCharCode === resCharCode) {
      continue;
    }

    if (!valCharCode || valCharCode < resCharCode) {
      shouldInject = true;
      shouldContinue = false;
      break;
    }

    shouldContinue = false;
    break;
  }

  return { shouldInject, shouldContinue };
};

const doThingsAndStuffFP = fp.flow([
  fp.filter(str => str && str.includes(' ')),
  fp.reverse,
  fp.reduce((res, val) => {
    if (!res.length) { return [val]; }

    const postSpaceOfVal = getPostSpace(val);
    for (let i = 0; i < res.length; i += 1) {
      const postSpaceOfRes = getPostSpace(res[i]);
      const { shouldInject, shouldContinue } = determineShouldInjectOrContinue(postSpaceOfVal, postSpaceOfRes);
      if (shouldContinue) {
        continue;
      }

      if (shouldInject) {
        res.splice(Math.max(i - 1, 0), 0, val);
        break;
      }
      
      res.push(val);
      break;
    }

    return res;
  }, []),
  fp.reverse,
  fp.uniq
]);
// End new function

// Original function
var doThingsAndStuff = x => {
  var temp = [];
  var temp2;
  var tmep3;
  var temp4;
 
  while(x.length) {
    temp2 = x.pop();
    if (!temp2) continue;
    for (tmep3 = 0; tmep3 < temp2.length; tmep3++)
      if (temp2 && temp2.charCodeAt(tmep3) == 32) {
        var start = tmep3++ + 1;
        var doBreak = false;
        var isFound = false;
        for (temp4 = 0; temp4 < temp.length; temp4++) {
          if (doBreak) {
            break;
          }
          tmep3 = start;
          isFound = false;
          for (var y = 0; y < temp[temp4].length; y++) {
            if (!isFound && temp[temp4].charCodeAt(y) == 32) {
              isFound = true;
              continue;
            } else if (!isFound) {
              continue;
            }

            if (!temp2.charCodeAt(tmep3) || temp2.charCodeAt(tmep3) < temp[temp4].charCodeAt(y)) {
              temp4--;
              if (temp4 < 0) {
                temp4 = 0;
              }

              temp.splice(temp4, 0, temp2);
              doBreak = true;
              break;
            } else if (temp2.charCodeAt(tmep3) == temp[temp4].charCodeAt(y)) {
              tmep3++;
              continue;
            } else {
              doBreak = true;
              break;
            }
          }
        }
        isFound = false;
        for (temp4 = 0; temp4 < temp.length; temp4++)
        if (temp2 === temp[temp4]) {
          isFound = true;
          break;
        }

        // Logic to see if we should add it
        if (!isFound) {
          temp.push(temp2);
        }
        break
      }
  };

  while(temp.length) {
    var newThing = temp.pop();
    x.push(newThing);
  };
 };
// End original funciton

// Test zone
const tests = [
  ['test a', 'test b', 'test a b', 'why are you mocking me'],
  ['a space', 'a space', 'a space', 'a space', 'a  space', 'a  space', 'a   space'],
  [''],
  ['hello', 'goodbye', 'hello'],
  ['a b', 'b a', 'a b c', 'a c b', 'a a c', 'b a c', 'c a b', 'z ', 'a ', 'z   ', 'a   ', 'c b a', 'c z', 'a b ', 'z  ', 'xyz'],
  ['12 hello', 'good day there sir', '  a lot of spaces', ' z stuff and such', 'do things'],
  ['gard darg harg', 'a sentence, for sure'],
  [],
  ['nospace'],
  ['one space']
];

for (let i = 0; i < tests.length; i += 1) {
  const testCase = tests[i];
  const res = doThingsAndStuffFP(testCase);
  doThingsAndStuff(testCase);
  const passed = fp.isEqual(res, testCase);
  console.log(`Test Case ${i}: ${passed}`);
}
// End test zone