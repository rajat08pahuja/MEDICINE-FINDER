const consoleUtil = require('../util_modules/util');

async function pharmeasyFun(cTab, medicine) {
    try {
        await cTab.goto("https://www.pharmeasy.in/");
        await cTab.type("input[placeholder='Search for Medicines / Healthcare Products']", medicine, { delay: 200 });
        await cTab.keyboard.press("Enter");
        await cTab.waitForSelector("div._1P-fB._3Wk-n", { visible: true });
        let obj = await cTab.evaluate(consoleUtil.consoleFn,
            "div.GvJNB div._1jald",
            "button._2FE4Z._2Jc-Z._1JBjj",
            "div._2UHKQ",
            "a",
            "div._1_yM9");
        if (obj == 0) {
            medDetails = {
                website: "PharmEasy",
                name: "Medicine Not Available!!!",
                price: "Medicine Not Available!!!",
                link: "Medicine Not Available!!!"
            }
        } else {
            medDetails = {
                website: "PharmEasy",
                name: obj.name,
                price: obj.price,
                link: "https://www.pharmeasy.com" + obj.link,
            }
        }
        return medDetails;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    pharmeasyFun
}