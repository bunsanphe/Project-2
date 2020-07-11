DROP DATABASE IF EXISTS playlist_db;
CREATE DATABASE playlist_db;
USE playlist_db;

CREATE TABLE playlist (
    id INT AUTO_INCREMENT NOT NULL,
    username_id VARCHAR(30) NOT NULL,
    playlist_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE user (
    id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE songs (
    song_api_id INT(11) NOT NULL,
    artist VARCHAR(100) NOT NULL,
    song_title VARCHAR(100),
    album VARCHAR(100),
    playlist_id VARCHAR (30),
    PRIMARY KEY (song_api_id)
);
