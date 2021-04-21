const consoleUtil = require('../util_modules/util');

async function mgFun(cTab, medicine) {
    try {
        await cTab.goto("https://www.1mg.com");
        await cTab.type("input#srchBarShwInfo", medicine, { delay: 200 });
        await cTab.keyboard.press("Enter");
        await cTab.waitForNavigation();
        let obj = await cTab.evaluate(consoleUtil.consoleFn,
            "div.row.style__grid-container___3OfcL div.col-md-3.col-sm-4.col-xs-6.style__container___jkjS2",
            "div.style__interaction___3cb12",
            "div.style__product-description___zY35s",
            "div.style__product-box___3oEU6 a",
            "div.style__price-tag___KzOkY");
        if (obj == 0) {
            medDetails = {
                website: "1mg",
                name: "Medicine Not Available!!!",
                price: "Medicine Not Available!!!",
                link: "Medicine Not Available!!!"
            }
        } else {
            medDetails = {
                website: "1mg",
                name: obj.name,
                price: obj.price,
                link: "https://www.1mg.com" + obj.link,
            }
        }
        return medDetails;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    mgFun
}