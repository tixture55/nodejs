'use strict';

function* idMarker() {
  var index = 0;
  while(index < 3) {
    yield index++;
  }
}

var gen = idMarker();
console.log(gen.next()); // { value: 0, done: false }
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: undefined, done: true }
