-- Always run this before starting the server !!!

-- This script currently doesn't populate the DB with example reports

-- Clear the DB
DO $$
DECLARE
    tbl_name TEXT;
BEGIN
    FOR tbl_name IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
    LOOP
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(tbl_name) || ' CASCADE;';
    END LOOP;
END $$;

-- Setup basic testing enviroment
INSERT INTO users
VALUES
    (1, Null, FALSE, '$2a$10$gNdxUnlrKhfACaqFSY/i1e6co0BJpJxIjg/JILvoLXtV5ui81mnna', 'test'),
    (2, Null, TRUE, '$2a$10$gNdxUnlrKhfACaqFSY/i1e6co0BJpJxIjg/JILvoLXtV5ui81mnna', 'test_moderator'),
	(3, Null, FALSE, '$2a$10$/64MLFvtQn4N.bJCqDsLwubj8zJ.Rkm9.yL.5YyxW9r148HYZfar6', 'test_english_user');

INSERT INTO countries
VALUES
	(1, 'Hrvatska'),
	(2, 'United Kingdom');

INSERT INTO towns
VALUES
	(1, 1, Null, Null, 'Grad Zagreb'),
	(2, 2, Null, Null, 'London');

INSERT INTO local_users
VALUES
	-- test and test_moderator locals in Zagreb
	(1, 1),
	(2, 1),
	-- test_english_user local in London
	(3, 2);

INSERT INTO stories
VALUES
	-- two stories in Zagreb added by test
	(1, 'Lorem ipsum dolor sit amet', 'Lorem Ipsum', 1, CURRENT_TIMESTAMP, 1),
	(2, 'The area of any circle is equal to a right-angled triangle in which...', 'Archimedes, Measurement of a Circle', 1, CURRENT_TIMESTAMP, 1),
	-- one story in London added by test_english_user
	(3, 'Two households, both alike in dignity...', 'Romeo and Juliet', 2, CURRENT_TIMESTAMP, 3);

INSERT INTO coordinates
VALUES
	-- the two stories in Zagreb are at the Cathedral and at FER
	(45.81466552408981, 15.979814251930389, 1, 1),
	(45.800873703358214, 15.971270141762062, 2, 1),
	-- the London story is at the Palace of Westminster
	(51.49961962920246, -0.12475555798061981, 3, 2);

INSERT INTO tags
VALUES
	(1, 'Sports'),
	(2, 'Weather'),
	(3, 'Science');

INSERT INTO is_tagged
VALUES
	-- Lorem Ipsum story in Zagreb: Sports
	(1, 1),
	-- Archimedes story in Zagreb: Sports, Science
	(2, 1),
	(2, 3);

INSERT INTO has_seen
VALUES
	-- test liked the Lorem Ipsum story in Zagreb
	(1, 1, TRUE);