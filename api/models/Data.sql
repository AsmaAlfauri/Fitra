CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL, -- admin / operations / viewer
  status BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE campaigns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'draft', -- draft / active / closed
  created_by INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  campaign_id INTEGER REFERENCES campaigns(id),
  amount NUMERIC(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending / approved / delivered
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (name, email, password, role, status, created_at) VALUES
('Admin User', 'admin@example.com', '12345', 'admin', TRUE, '2025-01-01 10:00:00'),
('Operations User', 'operations@example.com', '12345', 'operations', TRUE, '2025-01-05 12:00:00'),
('Viewer User', 'viewer1@example.com', '12345', 'viewer', TRUE, '2025-01-10 15:30:00'),
('Sara Ahmad', 'sara@example.com', '12345', 'viewer', TRUE, '2025-01-15 09:20:00'),
('Omar Khaled', 'omar@example.com', '12345', 'viewer', TRUE, '2025-01-20 11:45:00');


INSERT INTO campaigns (title, description, start_date, end_date, status, created_by, created_at) VALUES
('Food Parcels – Ramadan', 'Distribute food parcels to families in need.', '2025-02-01', '2025-02-28', 'active', 6, '2025-01-25 08:00:00'),
('Orphan Sponsorship', 'Support orphans with monthly sponsorship.', '2025-02-05', '2025-05-05', 'active', 6, '2025-01-28 09:00:00'),
('Zakat Al-Fitr', 'Collect Zakat al-Fitr donations.', '2025-01-20', '2025-02-10', 'closed', 7, '2025-01-15 14:00:00'),
('Iftar Meals', 'Provide Iftar meals to communities.', '2025-02-10', '2025-02-28', 'draft', 7, '2025-02-01 10:00:00');




INSERT INTO donations (user_id, campaign_id, amount, status, created_at) VALUES
(2, 1, 250.00, 'approved', '2025-02-15 10:00:00'),
(4, 1, 500.00, 'approved', '2025-02-16 12:30:00'),
(5, 2, 1000.00, 'pending', '2025-02-17 14:15:00'),
(4, 2, 750.00, 'approved', '2025-02-18 09:45:00'),
(5, 3, 1200.00, 'approved', '2025-01-25 11:20:00'),
(6, 1, 300.00, 'delivered', '2025-02-18 16:00:00'),
(7, 4, 400.00, 'approved', '2025-02-12 13:00:00');





INSERT INTO donations (user_id, campaign_id, amount, status, created_at) VALUES
(7, 1, 250.00, 'approved', '2025-01-10 09:15:00'),
(4, 1, 500.00, 'approved', '2025-01-11 11:20:00'),
(5, 2, 1000.00, 'pending', '2025-01-12 14:30:00'),
(4, 2, 750.00, 'approved', '2025-01-13 10:45:00'),
(5, 3, 1200.00, 'approved', '2025-01-14 12:00:00'),
(6, 1, 300.00, 'delivered', '2025-01-15 13:20:00'),
(7, 4, 400.00, 'approved', '2025-01-16 15:10:00'),
(4, 1, 150.00, 'pending', '2025-01-17 09:50:00'),
(5, 2, 600.00, 'approved', '2025-01-18 11:25:00'),
(6, 3, 900.00, 'approved', '2025-01-19 14:40:00'),
(7, 1, 200.00, 'approved', '2025-01-20 10:05:00'),
(4, 4, 350.00, 'pending', '2025-01-21 12:30:00'),
(5, 2, 450.00, 'approved', '2025-01-22 15:15:00'),
(6, 1, 700.00, 'delivered', '2025-01-23 09:45:00'),
(7, 3, 800.00, 'approved', '2025-01-24 11:10:00'),
(4, 2, 250.00, 'approved', '2025-01-25 13:35:00'),
(5, 1, 500.00, 'pending', '2025-01-26 15:50:00'),
(6, 4, 650.00, 'approved', '2025-01-27 10:20:00'),
(7, 2, 550.00, 'approved', '2025-01-28 12:40:00'),
(4, 3, 400.00, 'delivered', '2025-01-29 14:55:00'),
(5, 1, 300.00, 'approved', '2025-01-30 09:15:00'),
(6, 2, 200.00, 'approved', '2025-01-31 11:30:00'),
(7, 1, 750.00, 'pending', '2025-02-01 13:45:00'),
(4, 2, 850.00, 'approved', '2025-02-02 10:05:00'),
(5, 3, 400.00, 'approved', '2025-02-03 12:25:00'),
(6, 1, 600.00, 'delivered', '2025-02-04 14:50:00'),
(7, 4, 500.00, 'approved', '2025-02-05 09:10:00'),
(4, 3, 300.00, 'pending', '2025-02-06 11:35:00'),
(5, 2, 450.00, 'approved', '2025-02-07 13:55:00'),
(6, 1, 700.00, 'approved', '2025-02-08 15:20:00'),
(7, 2, 900.00, 'delivered', '2025-02-09 10:40:00'),
(4, 1, 650.00, 'approved', '2025-02-10 12:50:00'),
(5, 4, 400.00, 'approved', '2025-02-11 14:30:00'),
(6, 2, 550.00, 'pending', '2025-02-12 09:15:00'),
(7, 3, 500.00, 'approved', '2025-02-13 11:40:00'),
(4, 1, 300.00, 'delivered', '2025-02-14 13:55:00'),
(5, 2, 750.00, 'approved', '2025-02-15 10:25:00'),
(6, 3, 850.00, 'approved', '2025-02-16 12:45:00'),
(7, 1, 400.00, 'pending', '2025-02-17 14:50:00'),
(4, 2, 500.00, 'approved', '2025-02-18 09:30:00'),
(5, 3, 600.00, 'delivered', '2025-02-19 11:55:00'),
(6, 4, 450.00, 'approved', '2025-02-20 13:20:00'),
(7, 1, 700.00, 'approved', '2025-02-21 15:10:00'),
(4, 2, 300.00, 'pending', '2025-02-22 10:00:00'),
(5, 3, 500.00, 'approved', '2025-02-23 12:35:00'),
(6, 1, 650.00, 'approved', '2025-02-24 14:50:00'),
(7, 4, 400.00, 'delivered', '2025-02-25 09:15:00'),
(4, 3, 550.00, 'approved', '2025-02-26 11:40:00'),
(5, 2, 700.00, 'approved', '2025-02-27 13:55:00'),
(7, 1, 300.00, 'pending', '2025-02-28 10:20:00');
