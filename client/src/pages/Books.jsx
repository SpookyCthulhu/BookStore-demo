import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Category from './components/Category';
import Navbar from './components/Navbar';
import Dropdown from './components/layout/Dropdown.jsx';
import Card from './components/layout/Card';
import Form from './components/layout/Form';

const Books = () => {
	const [categories, setCategories] = useState([]);

	// fetches categories from backend {consisting of a name and id}
	useEffect(() => {
		const fetchAllCategories = async () => {
		  try {
			const res = await axios.get('http://localhost:8800/category/');
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
			<Category key={category.id} id={category.id} name={category.name} />);
		})};
		<Dropdown title="Add Category" classes="dropdown">
			<Card>
				<Form 
			        fields = {[
						{ name: 'cover', type: 'image'},
						{ name: 'category', type: 'text', className: 'title', placeholder: 'category'},
						{ name: 'title', type: 'text', className: 'title', placeholder: 'Title' },
						{ name: 'price', type: 'text', className: 'priceInput', placeholder: 'Price' },
						{ name: 'description', type: 'textarea', className: 'descInput', placeholder: 'Description' },
					]}
					submitButtonText="Add Book"
					apiEndpoint={`http://localhost:8800/category/`}
				/>
			</Card>
		</Dropdown>
	</>
  );
};

export default Books;