-- UP
CREATE TABLE Person (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  password TEXT
);
CREATE TABLE Vehicle (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand TEXT,
  model TEXT,
  ownerId INTEGER REFERENCES Person(id)
);
-- INSERT INTO Person (name, email)
-- VALUES ('thangden', 'thangden@gmail.com');
-- INSERT INTO Person (name, email)
-- VALUES ('bo', 'bo@gmail.com');
-- INSERT INTO Vehicle (brand, model, ownerId)
-- VALUES ('Audi', 'R8', 1);
-- INSERT INTO Vehicle (brand, model, ownerId)
-- VALUES ('Hummer', 'H1', 1);
-- INSERT INTO Vehicle (brand, model, ownerId)
-- VALUES ('BMW', 'A8', 1);
-- INSERT INTO Vehicle (brand, model, ownerId)
-- VALUES ('Mercedes', 'AMG', 2);

-- DOWN
DROP TABLE Person;
DROP TABLE Vehicle;