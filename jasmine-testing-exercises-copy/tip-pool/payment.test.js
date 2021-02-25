describe("going through functions related to Payments", function(){

    beforeAll(function () {
        billAmtInput.value = 100;
        tipAmtInput.value = 20;
        submitPaymentInfo();
        billAmtInput.value = 50;
        tipAmtInput.value = 15;
        submitPaymentInfo();
        billAmtInput.value = 10;
        tipAmtInput.value = 0;
        submitPaymentInfo();
      });

    it("should create an object with payment info using createCurPayment()- round 1", function(){
        
        // expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment' + 1].billAmt).toEqual('100');
        expect(allPayments['payment' + 1].tipAmt).toEqual('20');
        expect(allPayments['payment' + 1].tipPercent).toEqual(20);
    });
    it("should create an object with payment info using createCurPayment()- round 2", function(){
        
        // expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment' + 2].billAmt).toEqual('50');
        expect(allPayments['payment' + 2].tipAmt).toEqual('15');
        expect(allPayments['payment' + 2].tipPercent).toEqual(30);
    });
    it("should create an object with payment info using createCurPayment()- round 3", function(){
        
        // expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment' + 3].billAmt).toEqual('10');
        expect(allPayments['payment' + 3].tipAmt).toEqual('0');
        expect(allPayments['payment' + 3].tipPercent).toEqual(0);
    });

    it("should finish by emptying the input forms", function() {
        submitPaymentInfo();
        expect(billAmtInput.value).toEqual('');
        expect(tipAmtInput.value).toEqual('');
    })

    it("should append the object data into the payment table", function() {
        expect(document.querySelector("#payment1").children[0].innerText).toEqual("$100");
        expect(document.querySelector("#payment1").children[1].innerText).toEqual("$20");
        expect(document.querySelector("#payment1").children[2].innerText).toEqual("20%");
    });

    it("should update the grand total ", function() {
        expect(summaryTds[0].innerHTML).toEqual("$160");
        expect(summaryTds[1].innerHTML).toEqual("$35");
        expect(summaryTds[2].innerHTML).toEqual("17%");
        billAmtInput.value = 160;
        tipAmtInput.value = 35;
        submitPaymentInfo();
        expect(summaryTds[0].innerHTML).toEqual("$320");
        expect(summaryTds[1].innerHTML).toEqual("$70");
        expect(summaryTds[2].innerHTML).toEqual("18%");
    });

    afterAll(function() {
        allPayments = {};
        paymentId = 0;
        paymentTbody.innerText = "";
        summaryTds[0].innerHTML = "";
        summaryTds[1].innerHTML = "";
        summaryTds[2].innerHTML =  "";
    });
});
