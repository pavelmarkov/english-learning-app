const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./database/database.sqlite");
db.serialize(function() {
  db.run(`CREATE TABLE if not exists books 
          (id integer primary key,
          title varchar(100),
          path varchar(100));
        `);
  db.run(`CREATE TABLE if not exists words 
        (id integer primary key,
        word varchar(30),
        book_id integer,
          FOREIGN KEY (book_id)
          REFERENCES books (id) );
      `);
});

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

