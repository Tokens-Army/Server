CREATE TABLE roles (
  id SERIAL NOT NULL,
  role VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);


INSERT INTO roles (role) VALUES ('User') RETURNING *;
INSERT INTO roles (role) VALUES ('Admin') RETURNING *;


CREATE TABLE permissions (
  id SERIAL NOT NULL,
  permission VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);


INSERT INTO permissions (permission) VALUES ('ADD_ORDER') RETURNING *;
INSERT INTO permissions (permission) VALUES ('CREATE_SERVICE') RETURNING *;
INSERT INTO permissions (permission) VALUES ('CREATE_ACCESSORY') RETURNING *;


CREATE TABLE role_permission (
  id SERIAL NOT NULL,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id),
  PRIMARY KEY (id)
);


INSERT INTO role_permission (role_id, permission_id) VALUES (1,1) RETURNING *;
INSERT INTO role_permission (role_id, permission_id) VALUES (2,2) RETURNING *;
INSERT INTO role_permission (role_id, permission_id) VALUES (2,3) RETURNING *;


CREATE TABLE users(
  id SERIAL NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (id)
);


INSERT INTO users (firstName, lastName,  email, password, role_id) VALUES ('mohammad','alawneh','mohammad@gmail.com','12345678',2) RETURNING *;
INSERT INTO users (firstName, lastName,  email, password, role_id) VALUES ('ali','ikmail','ali@gmail.com','12345678',2) RETURNING *;
INSERT INTO users (firstName, lastName,  email, password, role_id) VALUES ('saad','habashneh','saad@gmail.com','12345678',2) RETURNING *;
INSERT INTO users (firstName, lastName,  email, password, role_id) VALUES ('ahmed','ahmed','ahmed@gmail.com','12345678',1) RETURNING *;
INSERT INTO users (firstName, lastName,  email, password, role_id) VALUES ('yousef','yousef','yousef@gmail.com','12345678',1) RETURNING *;


CREATE TABLE employees (
  id SERIAL NOT NULL,
  name VARCHAR(255),
  img TEXT,
  phoneNum VARCHAR(255),
  Availability varchar(255),
  PRIMARY KEY (id)
);


INSERT INTO employees (name, img,  phoneNum,Availability) VALUES ('YOUSEF AlShereif','https://randomuser.me/api/portraits/med/men/45.jpg','+96258828787','Available') RETURNING *;
INSERT INTO employees (name, img,  phoneNum,Availability) VALUES ('Aleksi Aleksi','https://randomuser.me/api/portraits/med/men/95.jpg','+96258828787','Available') RETURNING *;
INSERT INTO employees (name, img,  phoneNum,Availability) VALUES ('Jameel Yaser','https://randomuser.me/api/portraits/med/men/64.jpg','+96258828787','Available') RETURNING *;


-- Create a table called **services** in the database
CREATE TABLE services(
  id SERIAL NOT NULL,
  name VARCHAR(255),
  description text,
  img TEXT,
  price INT,
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (id)
);


INSERT INTO services (name, description, img, price) values ('Hand car wash', 'washing the car by hand, using a hose, a bucket, a sponge, and a soap solution. Hand car wash can help remove dirt, grime, bugs, and bird droppings from the car, as well as rinse off any residue or soap marks', 'https://www.1stclassmobiledetailing.com.au/wp-content/uploads/2019/03/hand-car-wash.jpg', 5) RETURNING *;
INSERT INTO services (name, description, img, price) values ('Car vacuuming', 'This service involves using a vacuum cleaner to remove dust, dirt, and debris from the interior of the car, including the seats, floor mats, carpets, and trunk. Car vacuuming can help improve the air quality and appearance of the car', 'https://thumbs.dreamstime.com/b/professional-car-vacuuming-vehicle-service-caucasian-worker-cleaning-cargo-area-inside-135721486.jpg', 3) RETURNING *;
INSERT INTO services (name, description, img, price) values ('Seat car cleaning', 'This service involves cleaning and sanitizing the seats of the car, using a steam cleaner, a shampooer, or a leather conditioner. Seat car cleaning can help remove stains, odors, bacteria, and allergens from the seats, as well as restore their color and texture', 'https://beautyntechs.com/wp-content/uploads/2021/08/Tips-for-your-car-seat-cleaning.jpg', 5) RETURNING *;
INSERT INTO services (name, description, img, price) values ('Car polishing', 'This service involves applying a protective layer of wax or polish to the exterior of the car, using a buffer or a cloth. Car polishing can help enhance the shine and gloss of the car, as well as protect it from scratches, oxidation, and UV damage', 'https://media.torque.com.sg/public/2019/08/car-polishing-machine-or-hand-better.jpg', 5) RETURNING *;


  CREATE TABLE accessories (
  id SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  img VARCHAR(255) NOT NULL UNIQUE,
  price INT,
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (id)
);


INSERT INTO accessories (name, description, img, price) values ('Phone holder', 'You should not handle your phone while driving specially while using location , try this product and make your drive more safer and easier', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1671221173-51LnGAR9h6L._SL500_.jpg?crop=1xw:1.00xh;center,top&resize=980:*', 8) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('Mirror screen protector', 'Protect your mirror from water and damage', 'https://m.media-amazon.com/images/I/61uT8J0LaKL.jpg', 6) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('Car air condition outlet decoration', 'Contains 10 pieces It is placed on the vents of the air conditioner, to give an aesthetic image, Fits all types of cars', 'https://doublem-jo.com/cdn/shop/products/5c0e27004bf12f4ac1027ba1-large_500x.jpg?v=1588722272', 3) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('Car front bumper lip body kit', 'Protect your car from damage , Easy to install, Long service life and durability ,Practical and beautiful', 'https://doublem-jo.com/cdn/shop/products/2_c9ad79d4-f587-4044-8982-45a097bd9886_500x.jpg?v=1603205692', 12) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('Rainproof blades', 'Rainproof blades help prevent rain from forming, providing you with a clearer rear view and a safer driving, On a sunny day the blades reduce dust attached to the rear view mirror', 'https://doublem-jo.com/cdn/shop/products/1582635180677_1576066125270_58d0a0d15dbcd6534d915269-0-large_400x.jpg?v=1588171709', 3) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('No. 1 Car Mat', 'Keeps the car clean from dirt, Protects the car floor from damage and damage, Make your car look more sparkling, Keep your vehicle clean for longer periods of time by using a variety , of heavy-duty floor mats for the front and rear seats of your vehicle', 'https://doublem-jo.com/cdn/shop/products/1582637612118_1575973260050_autokoberce-gumove-no.1-sada-2x-predni-2x-zadni-vy-0.jpg.big_400x.jpg?v=1588027865', 10) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('Scraper wipers for car windows', 'Practical and modern design ensures effective water removal from glass ,It lasts for a relatively long time,The water skimmed without making, any noise', 'https://doublem-jo.com/cdn/shop/products/0f6144337af26ca1ded4ae4716bc3955_700x.jpg?v=1604521950', 3) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('Car Bumper Protector', 'It protects against scratching and gives aesthetic appeal to the Timbun, It can be used on all types of cars ,High grade anti-scrape rubber, Is soft and strong, Decoration for your car, and make your car more unique', 'https://doublem-jo.com/cdn/shop/products/HTB1c8mZmOMnBKNjSZFoq6zOSFXad_500x.jpg?v=1620214323', 5) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('Car Storage Bag', 'Car luggage carrier, Small size, large capacity, Easy to install, just hang on the car air outlet, You can store pens, mobile phone, glasses, cigarettes, cards and other, things, keep your car clean', 'https://doublem-jo.com/cdn/shop/products/1582362768741_1574160459942_5dbbfc5c3e1f100f0085194b-0-large_400x.jpg?v=1587817315', 5) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('Car Rearview Auxiliary Blind Spot Mirror', '360 degree car blind spot mirror, Wide angle adjustable and swivel, Clarifies the vision for the driver and facilitates the process of, driving when backing and overtaking', 'https://doublem-jo.com/cdn/shop/products/5f083758fb7f653716e8c7eb-large_500x.jpg?v=1602497781', 7) RETURNING *;


CREATE TABLE orders(
  id SERIAL NOT NULL,
  user_id INT,
  service_id INT,
  created_at TIMESTAMP default now(),
  scheduled_time TIMESTAMP,
  order_status VARCHAR(255),
  employee_id INT,
  location text,
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (service_id) REFERENCES services(id),
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (id)
);
CREATE TABLE order_accessories (

  id SERIAL NOT NULL,
  order_id INT,
  accessories_id INT,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (accessories_id) REFERENCES accessories(id),
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (id)
);
