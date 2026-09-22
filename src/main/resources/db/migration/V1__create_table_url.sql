    CREATE TABLE url(
        id SERIAL PRIMARY KEY,
        original_Link VARCHAR(1000) NOT NULL,
        short_Link VARCHAR(1000),
        num_Click INTEGER NOT NULL DEFAULT 0,
        expiration DATE,
        password VARCHAR(256)

    );