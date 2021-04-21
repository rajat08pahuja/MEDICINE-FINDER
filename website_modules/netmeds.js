const consoleUtil = require('../util_modules/util');

async function netmedsFun(cTab, medicine) {
    try {
        await cTab.goto("https://www.netmeds.com/");
        await cTab.type("input#search", medicine, { delay: 200 });
        await cTab.click("button.iconSearch");
        await cTab.waitForNavigation();

        let obj = await cTab.evaluate(consoleUtil.consoleFn,
            "ol.ais-InfiniteHits-list li",
            "div.cart_btn",
            "div.drug_c a div.info",
            "div.drug_c a",
            "div.drug_c div.pricebox span.final-price");

        if (obj == 0) {
            medDetails = {
                website: "NetMeds",
                name: "Medicine Not Available!!!",
                price: "Medicine Not Available!!!",
                link: "Medicine Not Available!!!"
            }
        } else {
            medDetails = {
                website: "NetMeds",
                name: obj.name,
                price: obj.price,
                link: "https://www.netmeds.com" + obj.link
            }
        }
        return medDetails;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    netmedsFun
}