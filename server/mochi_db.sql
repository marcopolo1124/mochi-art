CREATE TABLE users.admin (
    username VARCHAR(100) PRIMARY KEY,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE commissions.commissions (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    commission_detail VARCHAR(10000),
    date_of_purchase TIMESTAMP NOT NULL,
    commission_status VARCHAR(20) NOT NULL
);

CREATE TABLE commissions.commission_images (
    commission_id INTEGER NOT NULL,
    file_name VARCHAR(36) NOT NULL,
    CONSTRAINT commission_fk
        FOREIGN KEY (commission_id) REFERENCES commissions.commissions(id)
);

CREATE TABLE site.state (
    lock char(1) DEFAULT 'X',
    commission_open boolean,
    constraint pk_site_state PRIMARY KEY (lock),
    constraint check_state_lock CHECK (lock='X')
)

CREATE TABLE site.gallery_images (
    file_name VARCHAR(36) PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    image_description VARCHAR(10000),
    date_posted TIMESTAMP
);
