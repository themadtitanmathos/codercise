const fp = require('lodash/fp');

const doThingsAndStuffFP = fp.flow([
  fp.filter(Boolean),
  
]);

// OLD + comments for algorithm
var doThingsAndStuff = x => {
 var temp = [];
 var temp2;
 var tmep3;
 var temp4;

 // iterator over x
 while(x.length) {
   // take next element
   temp2 = x.pop();
   // if falsy, continue
   if (!temp2) continue;
   // iterate over the length of the string (assuming it's a string at this point)
   // **
   for (tmep3 = 0; tmep3 < temp2.length; tmep3++)
     // if our iterator has hit a space, do something special
     if (temp2 && temp2.charCodeAt(tmep3) == 32) {
       var start = tmep3++ + 1;
       // start = tmep3 + 1;
       // tmep3 += 1;

       var doBreak = false;
       var isFound = false;

       // First time through, temp will be empty, so this will be skipped
       // Otherwise, reset temp4 to 0 and iterate over the temp array with it
       for (temp4 = 0; temp4 < temp.length; temp4++) {
         // If we've decided to break, break
         if (doBreak) {
           break;
         }

         // Reset tmep3 to start, which was just tmep3 + 1.
         tmep3 = start;

         isFound = false;

         // Get the string at temp4 in temp, iterate over it's length
         for (var y = 0; y < temp[temp4].length; y++) {
           // If we haven't found, and the string in temp at temp4 has a space at index y
           if (!isFound && temp[temp4].charCodeAt(y) == 32) {
             // Set isFound to true, continue
             isFound = true;
             continue;
           } else if (!isFound) {
             // if !isFound, continue. Basically iterate until we hit the above case
             continue;
           }

           // The last thing we hit was a space, so now we're immediately after it
           // If temp2 is shorter than the string we're looking at in temp or it alphabetizes after the first space ahead of it?
           if (!temp2.charCodeAt(tmep3) || temp2.charCodeAt(tmep3) < temp[temp4].charCodeAt(y)) {
             temp4--;
             if (temp4 < 0) {
               temp4 = 0;
             }
             // Insert temp2 in before temp4's spot in temp (alphabetize, basically?)
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

       // First time through, temp will be empty, so this will be skipped (does the following line even do anything?)
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

 // Iterate over temp and glue onto our original arg (v impure, v naughty)
 while(temp.length) {
   var newThing = temp.pop();
   x.push(newThing);
 };
};

const test = ['hello', 'how are you', 'i asked you first', 'why are you mocking me'];
const test2 = ['a space', 'a space', 'a space', 'a space', 'a  space', 'a  space', 'a   space'];
const test3 = [''];
const test4 = ['hello', 'goodbye', 'hello'];
const test5 = ['a b', 'b a', 'a b c', 'a c b', 'a a c', 'b a c', 'c a b', 'c b a']

doThingsAndStuff(test);
doThingsAndStuff(test2);
doThingsAndStuff(test3);
doThingsAndStuff(test4);
doThingsAndStuff(test5);

console.log(test);
console.log(test2);
console.log(test3);
console.log(test4);
console.log(test5);

console.log(doThingsAndStuffFP(['h', null, 'i']));