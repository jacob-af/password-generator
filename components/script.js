// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

//Breaks the creation process into 3 chained functions: getCriteria, confirmOptions, and constructPassword


function generatePassword() {
  let criteria = getCriteria();
  let charStringandLength = confirmOptions(criteria);
  return constructPassword(charStringandLength);
}

//Returns the criteria for selection as an object

function getCriteria() {
  let pwlength = getLength();
  let characters = getCharacters();
  characters.passwordLength = pwlength;
  return characters;
}

//user inputs desired length of password

function getLength() {
  let chooseLength = prompt("How long would you like the password to be?\n(Choose a length between in 8 and 128)")
  while (chooseLength < 8 || chooseLength > 128) {
    return getLength();
  }
  return chooseLength;
}

//gets them to select the necessary character types

function getCharacters() {
  let lowerCase = confirm('Do you want to use lower case letters?')
  let upperCase = confirm('Do you want to use upper case letters?')
  let numeric = confirm('Do you want to use numeric characters?')
  let special = confirm('Do you want to use special characters?')
  if (!lowerCase && !upperCase && !numeric && !special) {
    alert('you have to select at least one option!');
    return getCharacters();
  }
  return { lowerCase: lowerCase, upperCase: upperCase, numeric: numeric, special: special, passwordLength: 0 };
}

//Confirms the selections of user

function confirmOptions(options) {
  let charDisplay = [];
  let charString = '';
  if (options.lowerCase) {
    charDisplay.push('lowercase letters');
    charString += 'abcdefghijklmnopqrstuvwxyz';
  }
  if (options.upperCase) {
    charDisplay.push('uppercase letters');
    charString += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  };
  if (options.numeric) {
    charDisplay.push('numerals');
    charString += '1234567890';
  }
  if (options.special) {
    charDisplay.push('special characters');
    charString += "!#$%&()*+,-./:;<=>'?@[]^_`{|}~" + '"' + '\u005C';
  };
  let displayString = ''
  displayString += charDisplay[0]
  if (charDisplay.length > 1) {
    for (i = 1; i < charDisplay.length - 1; i++) {
      displayString += ", " + charDisplay[i]
    };
    displayString += ' and ' + charDisplay[charDisplay.length - 1]
  }
  let askAgain = confirm(`You want to generate a password with ${options.passwordLength} characters, comprised of ${displayString}?`)
  if (askAgain) {
  return [charString, options.passwordLength]
  } else {
    return confirmOptions(getCriteria())
  }
}

//actually constructs the password from their chosen options

function constructPassword(charStringAndLength) {
  charString = charStringAndLength[0]
  passwordLength = charStringAndLength[1]
  let password = ''
  for (i = 0; i < passwordLength; i++) {
    password += charString[Math.floor(Math.random() * charString.length)];
  }
  return password
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
