const puppeteer = require("puppeteer-core");
const readlineSync = require("readline-sync");
const path = require("path");
const fs = require("fs");
let dirs = [];
const pathName = "D:/user/Downloads/重学前端合集";
fs.readdir(pathName, function (err, files) {
  for (let i = 0; i < files.length; i++) {
    dirs.push(files[i]);
  }
});

(async () => {
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

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  asyncForEach(dirs, async (item, i) => {
    await page.goto(`file://${pathName}/${item}`);
    await autoScroll(page);
    await page.screenshot({
      path: `${item}.png`,
      fullPage: true,
    });
  });

  function autoScroll(page) {
    return page.evaluate(() => {
      return new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }
  // const page = await browser.newPage();
  // await page.goto("https://www.maidoudou.top/#/");
  // const str = `#app > div > div.pc-content-area > div.pc-area-main > div > div.pc-topic-header > div:nth-child(3)`;
  // await page.waitForSelector(str);
  // const tabItem = await page.$(str);
  // await tabItem.click();

  // await page.goto("https://kjsfsithw-ms.sf-express.com/starter/sf/xiaowei/sz/web/login");
  // await page.waitForTimeout(1000)
  // await page.type("#txtUserName", "gaoqj");
  // await page.type("#txtPassword", "GZxw@202009", {
  //   delay: 100
  // })
  // await page.click("#secret");
  // const captcha = readlineSync.question('captcha is:');
  // // const password = readlineSync.question('password is:',{hideEchoBack: true});
  // await page.type("#txtCaptcha", captcha);
  // await page.click("#submitLogin");
})();
