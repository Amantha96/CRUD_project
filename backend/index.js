import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2254ranmini',
    database: 'books'
});

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.json("hello this is backend");
});

app.get('/books', (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/books', (req, res) => {
    const { BOOK_TITLE, BOOK_DESC, BOOK_COVER } = req.body;

    // Check if any of the required fields are missing in the request body
    if (!BOOK_TITLE || !BOOK_DESC || !BOOK_COVER) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const q = "INSERT INTO books (BOOK_TITLE, BOOK_DESC,price, BOOK_COVER) VALUES (?, ?, ?)";
    const values = [
        req.body.BOOK_TITLE, 
        req.body.BOOK_DESC, 
        req.body.price, 
        req.body.BOOK_COVER];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err); // Handle database error
        return res.status(201).json({ message: "Book added successfully" });
    });
});

app.delete("/books/:id",(req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id= ?"

    db.query(q,[bookId], (err, data) => {

        if (err) return res.status(500).json(err); // Handle database error
        return res.status(201).json({ message: "Book deleted successfully" });

    })
});

app.put("/books/:id",(req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title = ?,`desc`=?,`price`=?,`cover`=? WHERE id = ?";

    const values=[

        req.body.BOOK_TITLE, 
        req.body.BOOK_DESC, 
        req.body.price, 
        req.body.BOOK_COVER];



    db.query(q,[...values,bookId], (err, data) => {

        if (err) return res.json(err); // Handle database error
        return res.json({ message: "Book has been updated successfully" });

    })
})

app.listen(8800, () => {
    console.log("Server is listening on port 8800");
});

