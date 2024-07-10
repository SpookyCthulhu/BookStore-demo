import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()


// Consider a pool for final build, modify POST to use the pool as well.
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'chiOS101418',
	database: 'books'
});

app.use(express.json())
app.use(cors())

app.use('/images', express.static(path.join(__dirname, 'images')));

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'images/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
	res.json('Hello, this is the backend!')
})

app.get('/books', (req, res) => {
	const q = 'SELECT * FROM books';

	db.query(q, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.get('/books/images/:id', (req, res) => {
	const bookId = req.params.id;
	const q = 'SELECT cover FROM books WHERE id = ?';
	
	db.query(q, [bookId], (err, data) => {
	  if (err) {
		return res.status(500).json({ error: 'Database error' });
	  }
	  if (data.length === 0) {
		return res.status(404).json({ error: 'Book not found' });
	  }
	  
	  const imageName = data[0].cover;
	  if (!imageName) {
		return res.status(404).json({ error: 'Image not found' });
	  }
  
	  const imagePath = path.join(__dirname, 'images', imageName);
	  res.sendFile(imagePath, (err) => {
		if (err) {
		  console.error('Error sending file:', err);
		  res.status(err.status).end();
		}
	  });
	});
  });

app.post('/books', upload.single('cover'), async (req, res) => {
	const q = 'INSERT INTO books (`title`, `description`, `price`, `cover`, `category`) VALUES (?)';
	const imageName = req.file ? req.file.filename : null;
	const values = [req.body.title, req.body.description, req.body.price, imageName, req.body.category];

	db.query(q, [values], (err, data) => {
		if (err) return res.json(err);
		return res.json('Book has been created successfully.');
	})
})

app.delete('/books/:id', (req, res) => {
	const bookId = req.params.id;
	const q = 'DELETE FROM books WHERE id = ?';

	db.query(q, [bookId], (err, data) => {
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

app.get('/category', (req, res) => {
	const q = 'SELECT * FROM category';

	db.query(q, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.get('/category/:category', (req, res) => {
	const bookCategory = req.params.category;
	const q = 'SELECT * FROM books WHERE categoryid = ?';

	db.query(q, [bookCategory], (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

// Uses await promise to allow two requests in one HTTP request.
app.post('/category', upload.single('cover'), async (req, res) => {
	const category = req.body.category;
	const q1 = 'INSERT INTO category (`name`) VALUES (?)';
	const q2 = 'INSERT INTO books (`title`, `description`, `price`, `cover`, `categoryid`) VALUES (?)';
	const imageName = req.file ? req.file.filename : null;

	try {
		// Create a promise for the first query
		const categoryResult = await new Promise((resolve, reject) => {
		  db.query(q1, [category], (err, data) => {
			if (err) reject(err);
			else resolve(data);
		  });
		});

		// Get the ID of the newly inserted category
        const newCategoryId = categoryResult.insertId;
		// add the ID to values
		const values = [req.body.title, req.body.description, req.body.price, imageName, newCategoryId];
	
		// Create a promise for the second query
		const bookResult = await new Promise((resolve, reject) => {
		  db.query(q2, [values], (err, data) => {
			if (err) reject(err);
			else resolve(data);
		  });
		});
	
		res.json('Category and book have been created successfully.');
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
	
app.listen(8800, () => {
	console.log('Connected to backend!');
})
