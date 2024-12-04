CREATE DATABASE challenge_system;
USE challenge_system;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    profile_image VARCHAR(255)
);
CREATE TABLE address (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    city VARCHAR(255),
    district VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE clubs (
    club_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    logo VARCHAR(255)
);
CREATE TABLE user_club (
    user_id INT,
    club_id INT,
    role ENUM('member', 'admin'),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, club_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (club_id) REFERENCES clubs(club_id)
);
ALTER TABLE user_club
ADD COLUMN joined Boolean default true;


SELECT CONSTRAINT_NAME, TABLE_NAME, COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_NAME = 'user_club';

	CREATE TABLE challenges (
		challenge_id INT AUTO_INCREMENT PRIMARY KEY,
		club_id INT,
		name VARCHAR(255) NOT NULL,
		description TEXT,
		category VARCHAR(255),
		start_date DATE,
		end_date DATE,
		challenge_type ENUM('individual', 'club') NOT NULL,
		rules JSON,
		goal_distance DECIMAL(10, 2),
		goal_time TIME,
		FOREIGN KEY (user_id) REFERENCES users(user_id),
		FOREIGN KEY (club_id) REFERENCES clubs(club_id)
	);
CREATE TABLE challenge_participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    challenge_id INT,
    join_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_distance DECIMAL(10, 2),
    total_time TIME,
    average_speed DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (challenge_id) REFERENCES challenges(challenge_id)
);

CREATE TABLE rankings (
    ranking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    challenge_id INT,
    club_id INT,
    ranks INT,
    score DECIMAL(10, 2),	
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (challenge_id) REFERENCES challenges(challenge_id),
    FOREIGN KEY (club_id) REFERENCES clubs(club_id)
);

CREATE TABLE posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    content TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE activities (
    activities_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    distance DECIMAL(10, 2),
    time_spent TIME,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO challenges 
(user_id, club_id, name, description, category, start_date, end_date, challenge_type, rules, goal_distance, goal_time, img)
VALUES 
(1, 1, 'Marathon Challenge', 'Run a full marathon distance', 'Running', '2024-11-01', '2024-12-01', 'individual', 
'{"rule1": "Complete within 30 days", "rule2": "Track using GPS"}', 42.20, '04:00:00', 'https://84race.com/public/media/thumb/2110_bu_banner-445x250.jpg'),

(2, 1, 'Club Cycling Challenge', 'Collectively cycle 500 km as a club', 'Cycling', '2024-10-01', '2024-11-01', 'club', 
'{"rule1": "Only outdoor cycling counts", "rule2": "Report daily"}', 500.00, NULL, 'https://84race.com/public/media/thumb/2110_bu_banner-445x250.jpg');

alter table rankings drop column level;

-- Bảng users
INSERT INTO users (username, password, role, email, full_name, profile_image) VALUES
('user1', 'password1', 'user', 'user1@example.com', 'User One', 'user1.png'),
('user2', 'password2', 'user', 'user2@example.com', 'User Two', 'user2.png'),
('admin', 'adminpass', 'admin', 'admin@example.com', 'Admin User', 'admin.png');

-- Bảng address
INSERT INTO address (user_id, city, district) VALUES
(1, 'Hanoi', 'Ba Dinh'),
(2, 'Ho Chi Minh City', 'District 1'),
(3, 'Da Nang', 'Hai Chau');

-- Bảng clubs
INSERT INTO clubs (name, description, logo) VALUES
('Runners Club', 'A club for running enthusiasts', 'runners_logo.png'),
('Cyclists Club', 'Cycling lovers club', 'cyclists_logo.png');

-- Bảng user_club
INSERT INTO user_club (user_id, club_id, role, joined_at) VALUES
(1, 1, 'admin', '2024-01-01 10:00:00'),
(2, 1, 'member', '2024-01-05 12:00:00'),
(2, 2, 'admin', '2024-02-01 09:00:00');

-- Bảng challenges
INSERT INTO challenges (user_id, club_id, name, description, category, start_date, end_date, challenge_type, rules, goal_distance, goal_time) VALUES
(1, NULL, '5K Solo Run', 'Complete a 5K run in one go', 'Running', '2024-10-01', '2024-11-01', 'individual', '{"rule1": "Complete within time limit"}', 5.00, '00:30:00'),
(2, 1, 'Group Marathon', '123123', 'Running', '2024-10-10', '2024-11-10', 'club', '{"rule1": "Track using app"}', 42.20, NULL),
(1, NULL, '5K Solo Run', '12313313131313', 'Running', '2024-10-01', '2024-11-01', 'individual', '{"rule1": "Complete within time limit"}', 5.00, '00:30:00'),
(2, 1, 'Group Marathon', 'Complete a marathon distance as a group', 'Running', '2024-10-10', '2024-11-10', 'club', '{"rule1": "Track using app"}', 42.20, NULL),
(1, NULL, '5K Solo Run', 'Complete a 5K run in one go', 'Running', '2024-10-01', '2024-11-01', 'individual', '{"rule1": "Complete within time limit"}', 5.00, '00:30:00'),
(2, 1, 'Group Marathon', 'Complete a marathon distance as a group', 'Running', '2024-10-10', '2024-11-10', 'club', '{"rule1": "Track using app"}', 42.20, NULL),
(1, NULL, '5K Solo Run', 'Complete a 5K run in one go', 'Running', '2024-10-01', '2024-11-01', 'individual', '{"rule1": "Complete within time limit"}', 5.00, '00:30:00'),
(2, 1, 'Group Marathon', 'Complete a marathon distance as a group', 'Running', '2024-10-10', '2024-11-10', 'club', '{"rule1": "Track using app"}', 42.20, NULL),
(1, NULL, '5K Solo Run', 'Complete a 5K run in one go', 'Running', '2024-10-01', '2024-11-01', 'individual', '{"rule1": "Complete within time limit"}', 5.00, '00:30:00'),
(2, 1, 'Group Marathon', 'Complete a marathon distance as a group', 'Running', '2024-10-10', '2024-11-10', 'club', '{"rule1": "Track using app"}', 42.20, NULL),
(1, NULL, '5K Solo Run', 'Complete a 5K run in one go', 'Running', '2024-10-01', '2024-11-01', 'individual', '{"rule1": "Complete within time limit"}', 5.00, '00:30:00'),
(2, 1, 'Group Marathon', 'Complete a marathon distance as a group', 'Running', '2024-10-10', '2024-11-10', 'club', '{"rule1": "Track using app"}', 42.20, NULL);






-- Bảng challenge_participants
INSERT INTO challenge_participants (user_id, challenge_id, join_at, total_distance, total_time, average_speed) VALUES
(1, 1, '2024-10-01 08:00:00', 5.00, '00:29:00', 10.34),
(2, 2, '2024-10-10 08:30:00', 10.00, '01:00:00', 10.00);

-- Bảng rankings
INSERT INTO rankings (user_id, challenge_id, club_id, level, score) VALUES
(1, 1, NULL, 'Beginner', 95.5),
(2, 2, 1, 'Intermediate', 88.3);

-- Bảng posts
INSERT INTO posts (user_id, title, content) VALUES
(1, 'New Challenge Available!', 'Join us in the 5K Solo Run Challenge.'),
(2, 'Cycling Tips', 'Some essential tips for a smooth cycling experience.');

-- Bảng activities
INSERT INTO activities (user_id, distance, time_spent) VALUES
(1, 5.00, '00:30:00'),
(2, 20.00, '01:10:00');




