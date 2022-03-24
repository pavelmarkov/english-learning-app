const puppeteer = require('puppeteer');
// const axios = require('axios')

let browser = {
  b: null,
  page: null,
  start: async function () {
    this.b = await puppeteer.launch();
    this.page = await this.b.newPage();
  },
  // translate: async function (word) {
  //   let path = 'https://dictionary.cambridge.org/dictionary/english-russian/'
  //   await this.page.goto(path+word, { waitUntil: 'domcontentloaded' });
  //   const translations = await this.page.$$eval('span.trans.dtrans.dtrans-se', ts =>
  //     ts.map(t => t.textContent.trim()).slice(0, 10)
  //   )
  //   return translations
  // }
  translate: async function (word) {
    let path = 'https://dictionary.cambridge.org/dictionary/english-russian/'
    await this.page.goto(path+word, { waitUntil: 'domcontentloaded' });
    let cambridge = {}
    try {
      cambridge = await this.page.evaluate(() => {
        let result = {}
        result['word'] = document.querySelector('.hw.dhw').innerText
        result['rus'] = document.querySelector('.trans.dtrans.dtrans-se').innerText
        return result
      })
    } catch (error) {
      console.log('cambridge dictionary error 1')
    }
    try {
      if (cambridge['word'].length > 0) {
        word = cambridge['word']
      }
    } catch (error) {
      console.log('cambridge dictionary error 2')
    }
    path = 'https://wooordhunt.ru/word/'
    await this.page.goto(path+word, { waitUntil: 'domcontentloaded' });
    try {
      await this.page.click('span#content_switcher_ru');
    } catch (error) {
      console.log('no content switcher')
    }
    let wooordhunt = {}
    try {
      wooordhunt = await this.page.evaluate(() => {
        let result = {};
        let content_in_russian = document.querySelector('div#content_in_russian');
        let rus = content_in_russian.querySelector('div.t_inline_en')
        let transcription = document.querySelector('div#uk_tr_sound > span.transcription')
        console.log(transcription.innerText)
        result['rus'] = rus.innerText
        result['transcription'] = transcription.innerText
        // items.forEach((item) => {
        //     results.push({
        //         // url:  item.getAttribute('href'),
        //         text: item.innerText
        //     });
        // });
        return result;
      })
    } catch (error) {
      console.log('woodhunt error')
    }
    path = 'https://www.google.com/search?q=' + word + '&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj-75rDlJLoAhWLHHcKHStFC6EQ_AUoAXoECA4QAw&biw=1867&bih=951'
    await this.page.goto(path);
    let imgSrc = await this.page.evaluate(() => {
      let imgs = [...document.getElementsByClassName('rg_i Q4LuWd')]
      let src = imgs.map((elem) => { return elem.src.length > 10 ? elem.src : false })
      return src;
    })
    let obj = {}
    if(cambridge.hasOwnProperty('rus')) {
      obj['rus'] = cambridge['rus']
    } else if (wooordhunt.hasOwnProperty('rus')) {
      obj['rus'] = wooordhunt['rus']
    } else {
      obj['rus'] = '?'
    }
    if(wooordhunt.hasOwnProperty('transcription')){
      obj['transcription'] = wooordhunt['transcription']
    } else {
      obj['transcription'] = '?'
    }
    obj['images'] = imgSrc.slice(0, 5)
    obj['imgIdx'] = 0
    obj['word'] = word
    return obj
  }
}

// (async () => {
//   await browser.start()
// })();

export {browser};