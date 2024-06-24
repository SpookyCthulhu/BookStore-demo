import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Category from './components/Category';
import Navbar from './components/Navbar';

const Books = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchAllCategories = async () => {
		  try {
			const res = await axios.get('http://localhost:8800/books/category/');
			setCategories(res.data);
		  } catch (err) {
			console.log(err);
		  }
		};
		fetchAllCategories();
	  }, []);

  return (
	<>
		<Navbar />
		{categories.map((category) => {
			return(
			<Category key={Math.random().toString(36).substr(2, 9)} name={category.category} />);
		}
	)};
	</>
  );
};

export default Books;