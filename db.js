const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')
const db = new sqlite3.Database("./database/database.sqlite");

const creatDb_sql = fs.readFileSync("./sql/createDb.sql", 'utf-8')
let statements = creatDb_sql.split('/*--separator--*/')

for (let i = 0; i < statements.length; i++) {
  const statement = statements[i];
  console.log(statement)
  db.serialize(function () {
    db.run(statement)
  })
}

const database =  {
  getBooks(){
    return 0
  },
  insertBook (title, path) {
    let stmt = db.prepare(`INSERT INTO books (title, path) 
                            VALUES (?, ?)`);
    stmt.run([title, path]);
    stmt.finalize();
    db.each("SELECT rowid AS id, title FROM books", function(err, row) {
      console.log(row.id + ": " + row.title);
    });
  },
  insertWord (word) {
    let stmt = db.prepare(`INSERT INTO words (word, book_id)
                            VALUES (?, ?)`);
    stmt.run(word, 0);
    stmt.finalize();
    db.each("SELECT rowid AS id, word FROM words", function(err, row) {
      console.log(row.id + ": " + row.word);
    });
  }
}
// db.close();
export {database};

