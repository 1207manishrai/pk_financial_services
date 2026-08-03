const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://www.amfiindia.com/aboutamfi?tab=members", { waitUntil: "networkidle2" });
  const logos = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("img")).map(img => img.src).filter(src => src.includes("http"));
  });
  console.log(JSON.stringify(logos));
  await browser.close();
})();
