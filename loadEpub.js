const EPub = require("epub2").EPub;
const fs = require('fs');
const { parse } = require('node-html-parser');

// Recursive function
function wrapWords(node, tokens){
	// 1: ELEMENT_NODE
	if(node.nodeType === 1) {
		let children = node.childNodes;
		for (let i = 0; i < children.length; i++) {
			wrapWords(children[i], tokens)
		}
	}
	// 3: TEXT_NODE
	else if(node.nodeType === 3){
		let splitted = node._rawText.split(/([^a-zA-Z])/g)
		for (let i = 0; i < splitted.length; i++) {
			const word = splitted[i];
			let isWord = /^[a-zA-Z]+$/.test(word) ? true : false;
			tokens.push({"token": word, "isWord": isWord})
		}
		tokens.push({"token": "<br><br>", "isWord": false})
	}
}

function processText(txt) {
	const root = parse(txt);
	let tokens = [];
	wrapWords(root, tokens);
	// console.log(tokens)
	return tokens;
}
async function processEpub(path="./books/pg67543.epub", callback) {
	let book = await EPub.createAsync(path);
	// console.log(book.flow)
	// console.log(book)
	let book_title = book.metadata.title;
	let name = book_title.replace(/[^a-zA-Z0-9., ]/g, '');
	let dir = './database/'+name+'/'
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir, { recursive: true });
	}
	let cover_id = book.metadata.cover
	// let cover_path = 'covers/cover.jpg'
	let result = {
		"book_title": book_title,
		// "cover_img": cover_path,
		"dir": dir,
		"toc": [], 
		"img": ''
	}
	book.getImage(cover_id, (error, img, mimeType) => {
		result.img = img.toString('base64')
		// console.log(mimeType)
		// fs.writeFile('./src/assets/'+cover_path, img, ()=>{})
		let type = ''
		// image/png, image/jpeg, image/gif, image/svg+xml
		switch (mimeType) {
			case 'image/jpeg':
				type = '.jpeg'
				break;
			case 'image/png':
				type = '.png'
				break;
			default:
				break;
		}
		fs.writeFile(dir+'cover'+type, img, ()=>{})
	});
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
			fs.writeFileSync(dir+file_name+'.json', JSON.stringify(text));
			if(i == book.toc.length-1){
				fs.writeFile(dir+'_MAIN_.json', JSON.stringify(result), ()=>{})
				callback(result);
			}
		})
	}
}

module.exports.processEpub = processEpub
// processEpub(path="./books/pg67543.epub", callback=(dt)=>{console.log(dt)});