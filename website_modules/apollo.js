const consoleUtil = require('../util_modules/util');

async function apolloFun(cTab, medicine) {
    try {
        await cTab.goto("https://www.apollopharmacy.in/");
        await cTab.click("input#search");
        await cTab.type("input#search", medicine, { delay: 200 });
        await cTab.keyboard.press("Enter");
        await cTab.waitForNavigation();
        let obj = await cTab.evaluate(consoleUtil.consoleFn,
            "div.header-results-and-footer div.tagalys-product-tiles div.tagalys-product-tile",
            "button.tocart",
            "a span.product-name",
            "a",
            "a span.product-sale-price");
        if (obj == 0) {
            medDetails = {
                website: "Apollo Pharmacy",
                name: "Medicine Not Available!!!",
                price: "Medicine Not Available!!!",
                link: "Medicine Not Available!!!"
            }
        } else {
            medDetails = {
                website: "Apollo Pharmacy",
                name: obj.name,
                price: obj.price,
                link: obj.link
            }
        }
        return medDetails;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    apolloFun
}