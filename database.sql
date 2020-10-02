/* connect to postgresql:

sudo service postgresql start

sudo -u postgres psql
 */
 
CREATE DATABASE pernRecord;

CREATE TABLE record(
    record_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);