const puppeteer = require("puppeteer-core");
const readlineSync = require("readline-sync");
const path = require("path");
const fs = require("fs");

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
  const str = `ua_id=WDEF2oAr0opu2GGTAAAAAG5Qu0NciyDZ1sd7IHuJdTQ=; pgv_pvi=1210320896; mm_lang=zh_CN; pgv_pvid=6635248432; tvfe_boss_uuid=8aee77a6e93a6cd3; wxuin=88132556664093; RK=rWIE9ZHDUz; ptcz=da101c8e7905cc1627e6a31712c61ded5c67dc5f9f220fd23c6031a8a6d42946; o_cookie=1991617760; pac_uid=1_1991617760; iip=0; ts_uid=158476295; rewardsn=; wxtokenkey=777; wwapp.vid=; wwapp.cst=; wwapp.deviceid=; uuid=41253fae6db5a6ae674eb30baf341669; rand_info=CAESIKF8AzP489TF+zgPR9ymApqnBl3MzlR/QPpBylH/AeON; slave_bizuin=3802581853; data_bizuin=3802581853; bizuin=3802581853; data_ticket=VWNmihJ4kNSAjBoZWhw2PDSsxbTlTjP0BWhi/sBU5fT0+HFdaQoD0PQ3Q0mqNV6R; slave_sid=ZXVnR0N2WXR4SnhWUUxoMGdGdng4OE9ZZjdUM3JhVDlyRXFqTlBTV1pBTWxwaWxlcHgxalFfNkswV2R2U3ljbzI0SzdjUF92dzlkU0d2TTM1Y1pPSko3ZGxLb0J2TGR2VU5xaE9UcEx3UU9aYWhkUkJOb0JIenRZOEtlR2taZmVKcDU0dHhZR2FLcThNdm5E; slave_user=gh_0f23008369a8; xid=69ee0c7dbdad95a85e138c5e09663bb4; sig=h01c843ba192b4dd3c862e7f7a1d77ba45d999916b059ec8bd229da16b62049ec4273d300986f5f985d`;
  const cookie = [];
  str.split(";").map((value, index) => {
    const key = value.split("=");
    const item = {};
    item["domain"] = ".qq.com";
    item["name"] = key[0].replace(" ", "");
    item["value"] = key[1].replace(" ", "");
    item["path"] = "/";
    cookie.push(item);
  });

  const page = await browser.newPage();
  // await page.goto('https://mp.weixin.qq.com/cgi-bin/loginpage');
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4181.9 Safari/537.36"
  );
  cookie.map(async (value) => {
    await page.setCookie(value);
  });
  await page.goto("https://mp.weixin.qq.com/wxamp/index/index?lang=zh_CN&token=1097632589");
  // 版本管理
  const selector1 = "#menuBar > dl:nth-child(2) > dd:nth-child(2) > a";
  const btn1 = await page.waitForSelector(selector1);
  await btn1.click();
  // // .code_version_logs
  // const list = await page.$$(".code_version_logs")
  // [...list].forEach(item => {
  //   console.log(item)
  // })
  // await [...list][2].click();
  // .js_show_exp_version
  // await page.waitForTimeout(1000);
  // // .weui-desktop-form__check-label
  // // .weui-desktop-btn weui-desktop-btn_primary
  // await page.waitForTimeout(1000);
  // // .weui-desktop-btn_primary
  // await page.waitForTimeout(1000);
  // type .weui-desktop-form__textarea
  // .btn_primary
})();
