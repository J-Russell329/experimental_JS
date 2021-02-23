describe("testing the helper functions", function() {
 
    beforeAll(function() {
        
    });

    it("should add the amount after each payment update",() => {
        billAmtInput.value = 100;
        tipAmtInput.value = 20;
        submitPaymentInfo();
        expect(sumPaymentTotal('billAmt')).toEqual(100);
        expect(sumPaymentTotal('tipAmt')).toEqual(20);

        billAmtInput.value = 50;
        tipAmtInput.value = 15;
        submitPaymentInfo();
        expect(sumPaymentTotal('billAmt')).toEqual(150);
        expect(sumPaymentTotal('tipAmt')).toEqual(35);

        billAmtInput.value = 10;
        tipAmtInput.value = 0;
        submitPaymentInfo();
        expect(sumPaymentTotal('billAmt')).toEqual(160);
        expect(sumPaymentTotal('tipAmt')).toEqual(35);
    });

    it("should change tip amount into a precentage of rolling total bill amount", function() {
        expect(calculateTipPercent(100,20)).toEqual(20);
        expect(calculateTipPercent(200,25)).toEqual(13);
        expect(calculateTipPercent(1000,225)).toEqual(23);
    });

    it("should crete and append table data to specified area", function(){
        let newTr = document.createElement('tr');
        appendTd(newTr, "test");
        expect(newTr.innerText).toEqual("test");
        newTr.innerText= "";
        appendTd(newTr, "testing-2");
        expect(newTr.innerText).toEqual("testing-2");
    });

    afterEach(function() {
        allPayments = {};
        paymentId = 0;
        paymentTbody.innerText = "";
        summaryTds[0].innerHTML = "";
        summaryTds[1].innerHTML = "";
        summaryTds[2].innerHTML =  "";
    });

});