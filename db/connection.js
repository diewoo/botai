'use strict'
const mysql=require('mysql');
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "mysql.us.cloudlogin.co",
    port: "3306",
    user: "pachuco65_web",
    password: "password",
    database: "pachuco65_web",
    multipleStatements: true
});

function getConnection(cb) {
    pool.getConnection(function (err, connection) {
        if (err) {
            return cb(err);
        }
        cb(null, connection);
    });
};

function commit(connection, callback) {
    connection.commit(function (err) {
        if (err) {
            return connection.rollback(function () {
                connection.release();
                callback(err);
            });
        } else {
            connection.release();
            callback(null);
        }
    });
}

function rollback(connection) {
    connection.rollback(function () {
        connection.release();
    });
}

module.exports = {
    getConnection,
    rollback,
    commit
};