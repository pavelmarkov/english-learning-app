const EPub = require("epub2").EPub;
const fs = require('fs');
const { parse } = require('node-html-parser');

// Recursive function
function wrapWords(node){
    // 3: TEXT_NODE
    if(node.nodeType === 3){
        let splitted = node._rawText.split(/([^a-zA-Z])/g)
        splitted = splitted.map(word => {
            return /^[a-zA-Z]+$/.test(word) ?
                `<span>${word}</span>` :
                word;
        });
        node._rawText = splitted.join('');
    }
    // 1: ELEMENT_NODE
    else if(node.nodeType === 1) {
       let children = node.childNodes;
       for(let i = children.length; i--; ) {
          wrapWords(children[i]);
       }
    } 
}

function processText(txt) {
    const root = parse(txt);
    wrapWords(root);
    return root.toString();
}
async function processEpub(path="./books/pg67543.epub", callback) {
    let book = await EPub.createAsync(path);
    // console.log(book.flow)
    let book_title = book.metadata.title;
    let name = book_title.replace(/[^a-zA-Z0-9., ]/g, '');
    let dir = './database/'+name+'/'
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    let result = {
        "book_title": book_title,
        "cover_img": "",
        "dir": dir,
        "toc": []
    }
    for (let i = 0; i < book.toc.length; i++) {
        const toc_item = book.toc[i];
        let title = toc_item.title;
        let link = toc_item.href.split("#")[0];
        let chapter = book.flow.find(obj => {
            return obj.href === link
        })
        // console.log(title, link, chapter.id)
        result.toc.push({
            "title": title, 
            "link": link, 
            "chapter_id": chapter.id
        })
        book.getChapter(chapter.id, (error, text) => {
            text = processText(text);
            let file_name = title.replace(/[^a-zA-Z0-9., ]/g, '');
            fs.writeFileSync(dir+file_name+'.html', text);
            if(i == book.toc.length-1){
                callback(result);
            }
        })
    }
}
processEpub(path="./books/pg67543.epub", callback=(dt)=>{console.log(dt)});