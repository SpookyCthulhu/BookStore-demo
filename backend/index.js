import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express()

const db = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'chiOS101418',
	database:'books'
});

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
	res.json('Hello, this is the backend!')
})

app.get('/books', (req, res)=>{
	const q = 'SELECT * FROM books';

	db.query(q, (err, data)=>{
		if(err) return res.json(err)
		return res.json(data)
	})
})

app.post('/books', (req, res)=>{
	const q = 'INSERT INTO books (`title`, `description`, `price`, `cover`, `category`) VALUES (?)';
	const values = [req.body.title, req.body.description, req.body.price, req.body.cover, req.body.category];
	
	db.query(q, [values], (err, data)=>{
		if(err) return res.json(err);
		return res.json('Book has been created successfully.');
	})
})

app.delete('/books/:id', (req, res)=>{
	const bookId = req.params.id;
	const q = 'DELETE FROM books WHERE id = ?';
	
		db.query(q, [bookId], (err, data)=>{
		if (err) return res.json(err);
		return res.json('Book has been deleted successfully.');
	})
})

app.put('/books/:id', (req, res) => {
	const bookId = req.params.id;
	const q = 'UPDATE books SET `title` = ?, `description` = ?, `price` = ?, `cover` = ?, `category` = ? WHERE id = ?';
	
	const values = [req.body.title, req.body.description, req.body.price, req.body.cover, req.body.category];
	
	db.query(q, [...values, bookId], (err, data) => {
		if (err) return res.json(err);
		return res.json('Book has been updated successfully.');
	});
});

app.get('/books/category', (req, res) => {
	const q = 'SELECT DISTINCT category FROM books';

	db.query(q, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.get('/books/category/:category', (req, res) => {
	const bookCategory = req.params.category;
	const q = 'SELECT * FROM books WHERE category = ?';

	db.query(q, [bookCategory], (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.listen(8800, ()=>{
	console.log('Connected to backend!');
})
