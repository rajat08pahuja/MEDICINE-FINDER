#!/usr/bin/env node
const puppeteer = require('puppeteer');
const mgModule = require('./website_modules/1mg');
const apolloModue = require('./website_modules/apollo');
const netmedsModule = require('./website_modules/netmeds');
const pharmeasyModule = require('./website_modules/pharmeasy');
const practoModule = require('./website_modules/practo');

let medicine = "" + process.argv.slice(2)[0]; 
let cTab;

let list = [];
(async function () {
    try {
        console.log(`
                    PLEASE WAIT YOUR RESULT WILL BE DISPLAYED SOON.
                    ***********************************************`);
        
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized']
        });

        let allTabs = await browser.pages();
        cTab = allTabs[0];

        let medObj = await practoModule.practoFun(cTab, medicine);
        list.push(medObj);
        medObj = await apolloModue.apolloFun(cTab, medicine);
        list.push(medObj);
        medObj = await netmedsModule.netmedsFun(cTab, medicine);
        list.push(medObj);
        medObj = await mgModule.mgFun(cTab, medicine);
        list.push(medObj);
        medObj = await pharmeasyModule.pharmeasyFun(cTab, medicine);
        list.push(medObj);

        console.table(list);
        console.log(`
                    *************************************************************`)
        console.log(`
                                        DISCLAIMER 
                                       ************ 
                    THESE ARE THE RESULTS AFTER SCRAPING WEBSITES. THE ACTUAL 
                    RESULTS MAY VARY DEPENDING ON YOUR LOCATION AND BOOKING TIME. 
                    *************************************************************
        `)

        await browser.close();
    } catch (err) {
        console.log(`
                    ***************************************************************************
                    WE ARE FACING DIFFICULTIES TO EXTRACT DATA RIGHT NOW PLEASE TRY AGAIN LATER  
                    ***************************************************************************
        `)
    }
})();