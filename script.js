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

let currentTipPercent = 0;

tipButtonsParent.addEventListener("click", (e) => {
  currentTipPercent = stringToTipNumber(e.target.textContent);
  console.log(currentTipPercent);

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

  resultTipAmount.textContent = ` $${currentTipPerPerson}`;
  resultTotalAmount.textContent = `$${currentTotalPerPerson}`;
});

function stringToTipNumber(str) {
  return Number(str.replace("%", ""));
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
