window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  document.getElementById("loan-amount").value = 100000;
  document.getElementById("loan-years").value = 30;
  document.getElementById("loan-rate").value = 6;
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  updateMonthly(calculateMonthlyPayment());

}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment() {
  let {amount, years, rate } = getCurrentUIValues();
  periodIntrestRate = rate/12/100;
  totalMonths = (years*12);
  cumulativeIntrest = (amount*periodIntrestRate)
  value1 = amount*periodIntrestRate*((1+periodIntrestRate)**totalMonths);
  value2 = ((1+periodIntrestRate)**360)-1;
  monthlyInterst = Math.round(value1/value2*100)/100
  return monthlyInterst;
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthlyIntrestAmount) {
  monthlyInterestPrintArea = document.querySelector("#monthly-payment");
  monthlyInterestPrintArea.innerText = monthlyIntrestAmount;
}
