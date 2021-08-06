/** Common config for bookstore. */


if (process.env.NODE_ENV === "test") {
  dbName = `books_test`;
} else {
  dbName = process.env.DATABASE_URL || `books`;
}


module.exports = { dbName };