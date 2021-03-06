CREATE TABLE if not exists books 
          (id integer primary key,
          title varchar(100),
          path varchar(100));
/*--separator--*/
CREATE TABLE if not exists words 
        (id integer primary key,
        word varchar(30),
        transcription varchar(30),
        rus varchar(50),
        img BLOB,
        book_id integer,
          FOREIGN KEY (book_id)
          REFERENCES books (id) );