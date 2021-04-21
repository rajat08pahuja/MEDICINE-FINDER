function consoleFn(allResSel, availSel, nameSel, linkSel, priceSel) {
    let allResults = document.querySelectorAll(allResSel);
    if (allResults == null || allResults.length == 0) {
        return 0;
    } else {
        for (let i = 0; i < allResults.length; i++) {
            let availCheck = allResults[i].querySelector(availSel);
            if (availCheck != null && availCheck.length != 0) {
                let name = allResults[i].querySelector(nameSel).innerText.trim();
                let price;
                try{
                    price = allResults[i].querySelector(priceSel).innerText.split("₹")[1].trim();
                } catch(err){
                    // sometimes a medicine is available but the price is not available(or updated as they say)
                    // so it may lead to error from the above statement which is handled here
                    price = "Price Not Available";
                }
                let link;
                if (linkSel == undefined) {
                    link = allResults[i].getAttribute("href");
                } else{
                    link = allResults[i].querySelector(linkSel).getAttribute("href");
                }
                let medDetails = {
                    name, price, link
                }
                return medDetails;
            }
        }
        return 0;
    }
}

module.exports = {
    consoleFn
}