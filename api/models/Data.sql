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
  donor_name VARCHAR(100) NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  campaign_id INT REFERENCES campaigns(id),
  status VARCHAR(20) DEFAULT 'pending', -- pending / approved / delivered
  created_at TIMESTAMP DEFAULT NOW()
);
