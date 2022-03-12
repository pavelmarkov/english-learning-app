const puppeteer = require('puppeteer');

let browser = {
  b: null,
  page: null,
  start: async function () {
    this.b = await puppeteer.launch();
    this.page = await this.b.newPage();
  },
  translate: async function (word) {
    let path = 'https://dictionary.cambridge.org/dictionary/english-russian/'
    await this.page.goto(path+word, { waitUntil: 'domcontentloaded' });
    const translations = await this.page.$$eval('span.trans.dtrans.dtrans-se', ts =>
      ts.map(t => t.textContent.trim()).slice(0, 10)
    )
    return translations
  }
}

// (async () => {
//   await browser.start()
// })();

export {browser};