const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')
const db_folder = './database'
if (!fs.existsSync(db_folder)){
  fs.mkdirSync(db_folder);
}
const db = new sqlite3.Database("./database/database.sqlite");

const creatDb_sql = fs.readFileSync("./sql/createDb.sql", 'utf-8')
let statements = creatDb_sql.split('/*--separator--*/')

for (let i = 0; i < statements.length; i++) {
  const statement = statements[i];
  // console.log(statement)
  db.serialize(function () {
    db.run(statement)
  })
}

const database =  {
  getBooks(callback){
    db.each("SELECT rowid AS id, title, path FROM books", function(err, row) {
      console.log(row.id + ": " + row.title);
      let dt = {
        "id": row.id,
        "book_title": row.title,
        "path": row.path,
        "img": 'img'
      }
      callback(dt)
    });
  },
  getWords(callback){
    db.each("SELECT rowid AS id, word, transcription, rus, img FROM words", function(err, row) {
      console.log(row.id + ": " + row.word);
      callback(row)
    });
  },
  insertBook (data) {
    // console.log(data)
    let { book_title, dir } = data
    let stmt = db.prepare(`INSERT INTO books (title, path) 
                            VALUES (?, ?)`);
    stmt.run([book_title, dir]);
    stmt.finalize();
    db.each("SELECT rowid AS id, title FROM books", function(err, row) {
      console.log(row.id + ": " + row.title);
    });
  },
  insertWord (word) {
    let stmt = db.prepare(`DELETE FROM words
    WHERE word = ?;`);
    stmt.run(word.word);
    stmt.finalize();

    stmt = db.prepare(`INSERT INTO words 
    (word, transcription, rus, img, book_id)
                            VALUES (?, ?, ?, ?, ?)`);
    stmt.run(word.word, word.transcription, 
      word.rus, word.img, 0);
    stmt.finalize();
    // db.each("SELECT rowid AS id, word FROM words", function(err, row) {
    //   console.log(row.id + ": " + row.word);
    // });
  },
  deleteWord (word) {
    let stmt = db.prepare(`DELETE FROM words
    WHERE word = ?;`);
    stmt.run(word);
    stmt.finalize();
  }
}
// db.close();
export {database};

