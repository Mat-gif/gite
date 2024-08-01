-- Création des tables
CREATE TABLE IF NOT EXISTS Room (
    id INT AUTO_INCREMENT PRIMARY KEY,
    childNumber INT NOT NULL,
    adultNumber INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS Reservation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roomId INT,
    email VARCHAR(255) NOT NULL,
    start DATETIME NOT NULL,
    end DATETIME NOT NULL,
    nightWeek INT NOT NULL,
    nightWeekend INT NOT NULL,
    extra BOOLEAN NOT NULL,
    FOREIGN KEY (roomId) REFERENCES Room(id) ON DELETE CASCADE
);

INSERT INTO Room (childNumber, adultNumber, name, description) VALUES
(1, 2, 'Chambre le Cerf', 'Vue sur plaine.'),
(1, 2, 'Chambre le Dawa', 'Vue sur mer.'),
(1, 2, 'Chambre le Notou', 'Vue sur forêt.');

INSERT INTO Reservation (roomId, email, start, end, nightWeek, nightWeekend, extra) VALUES
(1, 'test@example.com', '2024-08-01 15:00:00', '2024-08-05 11:00:00', 4, 2, TRUE),
(2, 'user@example.com', '2024-08-10 14:00:00', '2024-08-12 11:00:00', 2, 1, FALSE);
