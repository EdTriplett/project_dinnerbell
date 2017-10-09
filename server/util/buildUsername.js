const faker = require("faker");

const upCaseFirst = str => {
  let firstLetter = str[0].toUpperCase();
  let restOfWord = str.slice(1);

  return firstLetter + restOfWord;
}

module.exports = () => {
  const randomColor = upCaseFirst(faker.commerce.color());
  const randomAdjOne = upCaseFirst(faker.commerce.productAdjective());
  const randomAdjTwo = upCaseFirst(faker.hacker.adjective());
  const randomNounOne = upCaseFirst(faker.hacker.noun());
  const randomNounTwo = upCaseFirst(faker.hacker.noun());
  

  return randomColor + randomAdjOne + randomAdjTwo + randomNounOne + randomNounTwo
}
      
        