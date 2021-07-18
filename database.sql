CREATE TABLE teachers (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(70) NOT NULL UNIQUE
);

CREATE TABLE lessons(
   id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   name VARCHAR(100) NOT NULL UNIQUE,
   teacher_id INT NOT NULL,
   FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);


CREATE TABLE sheets(
   id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   local_number CHAR(10) NOT NULL,
   description TEXT NOT NULL,
   lesson_id INT NOT NULL,
   teacher_id INT NOT NULL,
   FOREIGN KEY (lesson_id) REFERENCES lessons(id),
   FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);