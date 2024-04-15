CREATE TABLE image (
  	id INTEGER PRIMARY KEY,
  	filename TEXT NOT NULL,
  	mimetype TEXT NOT NULL,
  	path TEXT NOT NULL,
  	post_id INTEGER NULL,
  	FOREIGN KEY (post_id) REFERENCES post(id)
);