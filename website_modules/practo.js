const consoleUtil = require('../util_modules/util');

async function practoFun(cTab, medicine) {
    try {
        await cTab.goto("https://www.practo.com/");
        await cTab.click("div.navbar.desktop.en div.wrapper.branding div.nav-mid a[title='medicines']");
        await cTab.waitForSelector("button.button.button__primary.button--default.button__active.button__normal.button__undefined.cart-disabled.button-hover", { visible: true });
        await cTab.type("input[placeholder='Search for medicines, health products and more']", medicine, { delay: 200 });
        await cTab.click("input[placeholder='Search for medicines, health products and more']");

        try {
            await cTab.waitForSelector("div.search-bar__results a", { visible: true });
        } catch (err) {
            medDetails = {
                website: "Practo",
                name: "Medicine Not Available!!!",
                price: "Medicine Not Available!!!",
                link: "Medicine Not Available!!!"
            }

            return medDetails;
        }
        let obj = await cTab.evaluate(consoleUtil.consoleFn,
            "div.search-bar__results a",
            ".u-columns.u-three.text-right",
            "div.text-charcoal-grey-two.heading-delta.text-epsilon",
            undefined,
            "div.u-m-t--5 span.u-text--bold");
        if (obj == 0) {
            medDetails = {
                website: "Practo",
                name: "Medicine Not Available!!!",
                price: "Medicine Not Available!!!",
                link: "Medicine Not Available!!!"
            }
        } else {
            medDetails = {
                website: "Practo",
                name: obj.name,
                price: obj.price,
                link: obj.link
            };
        }
        return medDetails;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    practoFun
}