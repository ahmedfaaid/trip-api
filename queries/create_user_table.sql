CREATE TABLE user (
    id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    date_of_birth INTEGER NOT NULL,
    address_id INTEGER NOT NULL,
	profile_picture_id INTEGER NULL,
    occupation TEXT NOT NULL,
    gender TEXT NOT NULL,
    FOREIGN KEY (address_id) REFERENCES address(id)
	FOREIGN KEY (profile_picture_id) REFERENCES image(id)
);