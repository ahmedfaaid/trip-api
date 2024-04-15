CREATE TABLE post (
  	id INTEGER PRIMARY KEY,
  	title TEXT NOT NULL,
  	region TEXT NOT NULL,
  	country TEXT NOT NULL,
  	city TEXT NOT NULL,
  	details TEXT NOT NULL,
  	posted_by_id INTEGER NOT NULL,
  	length_of_stay TEXT NOT NULL,
  	date_travelled INTEGER NOT NULL,
  	size_of_group INTEGER NOT NULL,
  	total_budget TEXT NOT NULL,
  	FOREIGN KEY (posted_by_id) REFERENCES user(id)
);