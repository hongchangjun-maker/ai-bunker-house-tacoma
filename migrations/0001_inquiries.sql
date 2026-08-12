CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  preferred_date TEXT,
  inquiry_type TEXT NOT NULL,
  message TEXT NOT NULL,
  consented_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed', 'deleted')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_email_created ON inquiries(email, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status, created_at DESC);
