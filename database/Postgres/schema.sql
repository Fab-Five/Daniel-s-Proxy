
CREATE DATABASE menus
USE menus
CREATE TABLE menu (
  _id int NOT NULL AUTO_INCREMENT,
  item_name text,
  item_description text,
  price int,
  popular Boolean,
  special_instruction Boolean,
  restaurant_id: int,
  photo_URL: text
)

--