import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Books = () => {

	const [books, setBooks] = useState([])
	
	useEffect(()=>{
		const fetchAllBooks = async ()=>{
			try{
				const res = await axios.get('http://localhost:8800/books')
				setBooks(res.data)
			}catch(err){
				console.log(err)
			}
		}
		fetchAllBooks()
	}, [])

	const handleDelete = async (id)=>{
		try{
			await axios.delete('http://localhost:8800/books/'+id)
			window.location.reload()
		} catch(err){
			console.log(err)
		}
	}
	return (
		<div>
			<h1>chiStudios Book Shop</h1>
			<div className='books'>
				{books.map((book) => (
					<div className='book' key={book.id}>
						{
						//enter your images in public/images for them to render!
						}
						{book.cover && <img src={`images/${book.cover}`} alt='x' />}
						<h2>{book.title}</h2>
						<p>{book.description}</p>
						<span>{book.price}</span>
						<button className='delete' onClick={()=>handleDelete(book.id)}>Delete</button>
						<button className='update'><Link to={`/update/${book.id}`}>update</Link></button>
					</div>
				))}
			</div>
			<button>
			<Link to="/add">Add new book</Link>
			</button>
		</div>
	);
};

export default Books
