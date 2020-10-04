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
  ownerId INTEGER REFERENCES Person
(id)
);
CREATE TABLE Product (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand TEXT,
  model TEXT,
  price INTEGER,
  imageUrl TEXT
);
INSERT INTO Person
  (name, email)
VALUES
  ('thangden', 'thangden@gmail.com');
INSERT INTO Person
  (name, email)
VALUES
  ('Bo', 'bo@gmail.com');
INSERT INTO Person
  (name, email)
VALUES
  ('John Doe', 'johndoe@gmail.com');
INSERT INTO Vehicle
  (brand, model, ownerId)
VALUES
  ('Audi', 'R8', 1);
INSERT INTO Vehicle
  (brand, model, ownerId)
VALUES
  ('Hummer', 'H1', 1);
INSERT INTO Vehicle
  (brand, model, ownerId)
VALUES
  ('BMW', 'A8', 1);
INSERT INTO Vehicle
  (brand, model, ownerId)
VALUES
  ('Mercedes', 'AMG', 2);
INSERT INTO Product
  (brand, model, price, imageUrl)
VALUES
  (
    'Apple',
    'iPhone 8',
    400,
    '/products/noimage.jpg'
  );
INSERT INTO Product
  (brand, model, price, imageUrl)
VALUES
  (
    'Apple',
    'iPhone 8 Plus',
    699,
    '/products/noimage.jpg'
  );
INSERT INTO Product
  (brand, model, price, imageUrl)
VALUES
  (
    'Apple',
    'iPhone X',
    849,
    '/products/noimage.jpg'
  );
INSERT INTO Product
  (brand, model, price, imageUrl)
VALUES
  (
    'Apple',
    'iPhone XR',
    649,
    '/products/noimage.jpg'
  );
INSERT INTO Product
  (brand, model, price, imageUrl)
VALUES
  (
    'Apple',
    'iPhone XS',
    899,
    '/products/noimage.jpg'
  );
INSERT INTO Product
  (brand, model, price, imageUrl)
VALUES
  (
    'Apple',
    'iPhone XS Max',
    989,
    '/products/noimage.jpg'
  );
INSERT INTO Product
  (brand, model, price, imageUrl)
VALUES
  (
    'Apple',
    'iPhone 11',
    1099,
    '/products/noimage.jpg'
  );
INSERT INTO Product
  (brand, model, price, imageUrl)
VALUES
  (
    'Apple',
    'iPhone 11 Pro',
    1199,
    '/products/noimage.jpg'
  );
INSERT INTO Product
  (brand, model, price, imageUrl)
VALUES
  (
    'Google',
    'Pixel 4',
    599,
    '/products/noimage.jpg'
  );
INSERT INTO Product
  (brand, model, price, imageUrl)
VALUES
  (
    'Google',
    'Pixel 4a',
    499,
    '/products/noimage.jpg'
  );
INSERT INTO Product
  (brand, model, price, imageUrl)
VALUES
  (
    'Google',
    'Pixel 5',
    799,
    '/products/noimage.jpg'
  );
INSERT INTO Product
  (brand, model, price, imageUrl)
VALUES
  (
    'Google',
    'Pixel 5 XL',
    999,
    '/products/noimage.jpg'
  );
-- DOWN
DROP TABLE Person;
DROP TABLE Vehicle;
DROP TABLE Product;