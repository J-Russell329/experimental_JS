describe("monhtly rate calculations", () => {
 
  it('test 1', function () {
    document.getElementById("loan-amount").value = 100000;
    document.getElementById("loan-years").value = 30;
    document.getElementById("loan-rate").value = 6;
    expect(calculateMonthlyPayment()).toEqual(599.55);
  });
 
  it('test 2', function () {
    document.getElementById("loan-amount").value = 0;
    document.getElementById("loan-years").value = 30;
    document.getElementById("loan-rate").value = 6;
    expect(calculateMonthlyPayment()).toEqual(0.00);
  });
  
  it('test 3', function () {
    document.getElementById("loan-amount").value = 10000;
    document.getElementById("loan-years").value = 2;
    document.getElementById("loan-rate").value = 20;
    expect(calculateMonthlyPayment()).toEqual(.65);
  });
})

describe("should return a result with 2 decimal places", () => {
  it('test 11', function () {
    document.getElementById("loan-amount").value = 100000;
    document.getElementById("loan-years").value = 30;
    document.getElementById("loan-rate").value = 6;
    expect(calculateMonthlyPayment()).toBe(599.55);
  });
  it('test 12', function () {
    document.getElementById("loan-amount").value = 0;
    document.getElementById("loan-years").value = 30;
    document.getElementById("loan-rate").value = 6;
    expect(calculateMonthlyPayment()).toBe(0.00);
  });
  it('test 13', function () {
    document.getElementById("loan-amount").value = 10000;
    document.getElementById("loan-years").value = 2;
    document.getElementById("loan-rate").value = 20;
    expect(calculateMonthlyPayment()).toBe(0.65);
  });
})

/// etc

afterAll(function(){
  document.getElementById("loan-amount").value = 100000;
  document.getElementById("loan-years").value = 30;
  document.getElementById("loan-rate").value = 6;
})