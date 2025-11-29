-- Roles
INSERT INTO roles (id, name, created_at, updated_at) VALUES
(UUID(), 'user', NOW(), NOW()),
(UUID(), 'admin', NOW(), NOW());

-- Users
INSERT INTO users (id, first_name, last_name, email, password, role_id, created_at, updated_at) VALUES
(UUID(), 'Alice', 'Smith', 'alice@example.com', '12345', (SELECT id FROM roles WHERE name='user'), NOW(), NOW()),
(UUID(), 'Bob', 'Brown', 'bob@example.com', '12345', (SELECT id FROM roles WHERE name='user'), NOW(), NOW()),
(UUID(), 'Charlie', 'Davis', 'charlie@example.com', '12345', (SELECT id FROM roles WHERE name='user'), NOW(), NOW()),
(UUID(), 'Dana', 'Evans', 'dana@example.com', '12345', (SELECT id FROM roles WHERE name='user'), NOW(), NOW()),
(UUID(), 'Eve', 'Foster', 'eve@example.com', '12345', (SELECT id FROM roles WHERE name='user'), NOW(), NOW()),
(UUID(), 'Admin', 'User', 'admin@example.com', 'adminpass', (SELECT id FROM roles WHERE name='admin'), NOW(), NOW());

-- Vacations
INSERT INTO vacations (id, destination, description, start_date, end_date, price, file, created_at, updated_at) VALUES
(UUID(), 'Pyongyang, North Korea', 'Experience the secretive capital.', '2025-12-01', '2025-12-07', 3000, 'pyongyang.jpg', NOW(), NOW()),
(UUID(), 'Chernobyl, Ukraine', 'Tour the abandoned city.', '2025-11-05', '2025-11-10', 2000, 'chernobyl.jpg', NOW(), NOW()),
(UUID(), 'Western Sahara, Morocco', 'Bring sunscreen!', '2025-10-10', '2025-10-15', 2500, 'western_sahara.jpg', NOW(), NOW()),
(UUID(), 'Snake Island, Brazil', 'Home to deadly snakes.', '2025-09-01', '2025-09-07', 4000, 'snakeisland_brazil.jpg', NOW(), NOW()),
(UUID(), 'Death Valley, USA', 'Extreme desert temperatures.', '2025-07-01', '2025-07-05', 1500, 'deathvalley.jpg', NOW(), NOW()),
(UUID(), 'uMgungundlovu, South Africa', 'Yes, that place exists!', '2025-06-10', '2025-06-15', 2200, 'umgungundlovu.jpg', NOW(), NOW()),
(UUID(), 'Mount Nyiragongo, DR Congo', 'Active lava volcano.', '2025-05-15', '2025-05-20', 5000, 'nyiragongo.jpg', NOW(), NOW()),
(UUID(), 'Vostok Station, Antarctica', 'Extremely cold scientific base.', '2025-04-01', '2025-04-10', 6000, 'vostok.jpg', NOW(), NOW()),
(UUID(), 'Space, Space', 'Literally go to space. No refunds.', '2025-03-10', '2025-03-15', 2800, 'space.jpg', NOW(), NOW()),
(UUID(), 'Snake Island, Australia', 'Remote island with deadly snakes.', '2025-02-01', '2025-02-05', 3500, 'snakeisland_aus.jpg', NOW(), NOW()),
(UUID(), 'Kiryat Gat, Israel', 'The infamous city.', '2025-01-15', '2025-01-20', 2000, 'kiryatgat.jpg', NOW(), NOW()),
(UUID(), 'Aokigahara, Japan', 'The infamous forest.', '2025-01-01', '2025-01-05', 2000, 'aokigahara.jpg', NOW(), NOW());

-- Likes
INSERT INTO likes (user_id, vacation_id, created_at, updated_at) VALUES
((SELECT id FROM users WHERE email='alice@example.com'), (SELECT id FROM vacations WHERE destination='Pyongyang, North Korea'), NOW(), NOW()),
((SELECT id FROM users WHERE email='bob@example.com'), (SELECT id FROM vacations WHERE destination='Chernobyl, Ukraine'), NOW(), NOW()),
((SELECT id FROM users WHERE email='charlie@example.com'), (SELECT id FROM vacations WHERE destination='Snake Island, Brazil'), NOW(), NOW()),
((SELECT id FROM users WHERE email='dana@example.com'), (SELECT id FROM vacations WHERE destination='Death Valley, USA'), NOW(), NOW()),
((SELECT id FROM users WHERE email='eve@example.com'), (SELECT id FROM vacations WHERE destination='Western Sahara, Morocco'), NOW(), NOW());
