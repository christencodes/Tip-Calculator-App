"use strict";

//lets grab the two input fields
//place the select tip btns in an array
//grab the tipamount number
//grab the total number

const billInputField = document.getElementById("bill-input");
// billInputField.value = 0;

const peopleInputField = document.getElementById("people-input");
// peopleInputField.value = 0;

const resultTipAmount = document.getElementById("resultTipAmount");

resultTipAmount.textContent = "5.00";

const resultTotalAmount = document.getElementById("resultTotalAmount");

resultTotalAmount.textContent = "10.00";

//so instead of loopng and adding the event listener to every button I will use delegation and add to the parent element so it can listen for event clicks of its children

const tipButtonsParent = document.querySelector(".tip-btns");

let customTip;

let currentTipPercent = 0;

const resetButton = document.querySelector(".reset-btn");
console.log(resetButton);

// EVENT LISTENERS

resetButton.addEventListener("click", (e) => {
  resetCalc();
});

tipButtonsParent.addEventListener("click", (e) => {
  currentTipPercent = stringToTipNumber(e.target.textContent);
  inputErrorCheck(billInputField, peopleInputField);

  updateTipAmountAndTotal(currentTipPercent);
});

window.addEventListener("keypress", (e) => {
  console.log(e.code);

  customTip = document.getElementById("custom");

  updateTipAmountAndTotal(enterKeypress(e.code, customTip));
});

// --------------------FUNCTIONS-------------------------

function enterKeypress(keyPress, customTip) {
  if (keyPress == "Enter") {
    return stringToTipNumber(customTip.value);
  } else {
    console.log("error");
    return 0;
  }
}

function updateTipAmountAndTotal(currentTipPercent) {
  let currentTipPerPerson = calcTipPerPerson(
    billInputField.value,
    currentTipPercent,
    peopleInputField.value
  );

  let currentTotalPerPerson = calcTotalPerPerson(
    billInputField.value,
    currentTipPerPerson,
    peopleInputField.value
  );

  resultTipAmount.textContent = ` $${currentTipPerPerson.toFixed(2)}`;
  resultTotalAmount.textContent = `$${currentTotalPerPerson.toFixed(2)}`;
}

function stringToTipNumber(str) {
  if (str.includes("%")) {
    return Number(str.replace("%", ""));
  } else {
    return Number(str);
  }
}

function calcTipPerPerson(currentBill, tipPercentage, people) {
  //dividing tip by 100 to get percent
  let percentTip = tipPercentage / 100;
  let totalTip = currentBill * percentTip;
  let tipPerPerson = totalTip / people;
  return tipPerPerson;
}

function calcTotalPerPerson(currentBill, tipPerPerson, people) {
  //tip per person
  //bill / people = bill per person
  let billPerPerson = currentBill / people;
  //totalperPerson = tip per person + bill per person
  return tipPerPerson + billPerPerson;
}

function inputErrorCheck(billInput, nofInput) {
  if (!nofInput.value || nofInput.value == "0") {
    nofInput.classList.add("error");
    nofInput.classList.remove("success");
  } else {
    nofInput.classList.remove("error");
    nofInput.classList.add("success");
  }

  if (!billInput.value || billInput.value == "0") {
    billInput.classList.add("error");
    billInput.classList.remove("success");
  } else {
    billInput.classList.remove("error");
    billInput.classList.add("success");
  }
}

function resetCalc() {
  billInputField.value = 0;
  peopleInputField.value = 0;

  resultTipAmount.textContent = "$0.00";
  resultTotalAmount.textContent = "$0.00";
}
