-- Apply manually to the existing portfolio D1 database before enabling services.
CREATE TABLE IF NOT EXISTS universe_country_checkins (
 country TEXT PRIMARY KEY CHECK(length(country)=2),
 visits INTEGER NOT NULL DEFAULT 0 CHECK(visits>=0)
);
CREATE TABLE IF NOT EXISTS universe_ai_quota (
 day TEXT PRIMARY KEY,
 used INTEGER NOT NULL DEFAULT 0 CHECK(used>=0)
);
