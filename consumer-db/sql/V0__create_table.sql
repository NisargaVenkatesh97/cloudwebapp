SET search_path TO app;

CREATE TABLE httpchecks(
  id VARCHAR(255) PRIMARY KEY,
  http_check_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  uri VARCHAR(255) NOT NULL,
  response_status_code INT NOT NULL,
  check_created DATE,
  check_updated DATE
);
