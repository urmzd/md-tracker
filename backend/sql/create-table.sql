use neurotrackerdb;

CREATE TABLE IF NOT EXISTS users (
  phone_number VARCHAR(50) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255);
  PRIMARY KEY (phone_number)
);
