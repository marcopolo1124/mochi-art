CREATE TABLE users.admin (
    username VARCHAR(100) PRIMARY KEY,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE commissions.commissions (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    commission_detail VARCHAR(10000),
    date_of_purchase TIMESTAMP NOT NULL,
    commission_status VARCHAR(20) NOT NULL,
    CONSTRAINT status_chk CHECK (commission_status = 'pending' OR commission_status = 'accepted' OR commission_status = 'rejected' OR commission_status = 'completed')
);

CREATE TABLE commissions.commission_images (
    commission_id VARCHAR(36) NOT NULL,
    file_name VARCHAR(36) NOT NULL PRIMARY KEY,
    CONSTRAINT commission_fk
        FOREIGN KEY (commission_id) REFERENCES commissions.commissions(id)
);

CREATE TABLE site.state (
    lock char(1) DEFAULT 'X',
    commission_open boolean,
    art_trade_open boolean,
    constraint pk_site_state PRIMARY KEY (lock),
    constraint check_state_lock CHECK (lock='X')
)

CREATE TABLE site.gallery_images (
    file_name VARCHAR(36) PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    image_description VARCHAR(10000),
    date_posted TIMESTAMP
);
