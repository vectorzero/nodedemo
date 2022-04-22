const puppeteer = require("puppeteer-core");
const readlineSync = require("readline-sync");
const path = require("path");
const fs = require("fs");
const xlsx = require('node-xlsx');


(async () => {
    const now = Date.now()
    const work = xlsx.parse(__dirname + '/汇总.xlsx');
    const workdata = work[0].data;
    const head = workdata[0]
    const orders = []
    workdata.forEach((item, index) => {
        if (index > 0) {
            let obj = {}
            obj['ID'] = item[0]
            obj['销售所属'] = item[1]
            obj['月结卡号汇总'] = item[2]
            obj['运单号'] = item[3]
            obj['顾客编码'] = ''
            orders.push(obj)
        }
    })

    const browser = await puppeteer.launch({
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        headless: false,
        defaultViewport: {
            width: 0,
            height: 0,
        },
        // args: [
        //   '--allow-running-insecure-content',
        //   '--disable-web-security',
        //   '--auto-open-devtools-for-tabs'
        // ]
    });


    const page = await browser.newPage();
    await page.goto('http://omscsm.sf-express.com/');
    await page.waitForTimeout(5000);
    // console.log(orders)
    let dataArr = []
    let excelArr = []


    const selector1 = '#app > div > div.panel-center.el-col.el-col-24 > aside > ul > li.el-submenu > div'
    await page.waitForSelector(selector1)
    const tab = await page.$$(selector1)
    await [...tab][2].click();
    await page.waitForTimeout(2000);

    const selector2 = '#app > div > div.panel-center.el-col.el-col-24 > aside > ul > li.el-submenu.is-opened > ul > li'
    const subTab = await page.waitForSelector(selector2)
    await subTab.click()
    await page.waitForTimeout(2000);

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    asyncForEach(orders, async (item, i) => {
        const selector3 = '#pane-fullLifeCycleQuery > div > form > div > div > div > input'
        const input = await page.waitForSelector(selector3)
        await input.click({ clickCount: 3 })
        await input.type(item['运单号'])
        const selector4 = '#pane-fullLifeCycleQuery > div > form > button'
        const btn = await page.waitForSelector(selector4)
        await btn.click()

        await page.waitForTimeout(2000);
        const selector5 = '#pane-fullLifeCycleQuery > div > div:nth-child(7) > div.operate-waybill-detail > div:nth-child(3) > div:nth-child(1) > span.info-value-span.update-source'
        const text = await page.$(selector5)
        await page.waitForSelector(selector5)
        const clientCode = await page.evaluate((x) => {
            return document.querySelector(x).innerText
        }, selector5)
        console.log(`第${i+1}条`, clientCode)
        // orders[i]['顾客编码'] = clientCode
        // console.log(orders)
        orders.forEach((item) => {
            dataArr[i] = [item['ID'], item['销售所属'], item['月结卡号汇总'], item['运单号'], clientCode]
        })

        excelArr = [{
            //data里面是数据，一个数组一行
            //cloumn这一行是因为例子里需要一个头
            name: "sheet",
            data: [
                ['ID', '销售所属', '月结卡号汇总', '运单号', '顾客编码'],
                ...dataArr
            ]
        }]


        let buffer = xlsx.build(excelArr);

        fs.writeFile(`./一个文件${now}.xlsx`, buffer, function(err) {
            if (err)
                throw err;
            console.log('写入到文件结束.');
        });
    });
})();