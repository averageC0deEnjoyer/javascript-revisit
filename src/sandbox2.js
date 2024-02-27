Array.prototype.cbTest = function (cb = (x) => x * 2) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr.push(cb(this[i]));
  }
  return newArr;
};

console.log([1, 2, 3].cbTest());

let personTest = {
  firstName: 'testFirst',
  lastName: 'testLast',
};

function testFunc(city) {
  console.log(
    `hello my name is ${this.firstName} ${this.lastName} and i live in ${city}`
  );
}

testFunc.call(personTest, 'jakarta');
