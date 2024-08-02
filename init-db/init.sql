-- Table Room
CREATE TABLE IF NOT EXISTS Room (
    id INT AUTO_INCREMENT PRIMARY KEY,
    childNumber INT NOT NULL,
    adultNumber INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- Table Reservation
CREATE TABLE IF NOT EXISTS Reservation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    start DATETIME NOT NULL,
    end DATETIME NOT NULL,
    nightWeek INT,
    nightWeekend INT,
    totalPrice INT NOT NULL,
    extra BOOLEAN NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS reservation_rooms (
    reservation_id INT,
    room_id INT,
    PRIMARY KEY (reservation_id, room_id),
    FOREIGN KEY (reservation_id) REFERENCES Reservation(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES Room(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- Insertion dans Room
INSERT INTO Room (childNumber, adultNumber, name, description) VALUES
(1, 2, 'Chambre le Cerf', 'Vue sur plaine.'),
(1, 2, 'Chambre le Dawa', 'Vue sur mer.'),
(1, 2, 'Chambre le Notou', 'Vue sur forêt.');

-- Insertion dans Reservation
INSERT INTO Reservation (email, start, end, nightWeek, nightWeekend, totalPrice, extra) VALUES
('test@example.com', '2024-08-01 15:00:00', '2024-08-04 11:00:00', 2, 1, 17000, TRUE),
('user@example.com', '2024-08-10 14:00:00', '2024-08-12 11:00:00', 0, 2, 14000, FALSE);


INSERT INTO reservation_rooms (reservation_id, room_id) VALUES
(1, 1),
(1, 2);

INSERT INTO reservation_rooms (reservation_id, room_id) VALUES
(2, 3);