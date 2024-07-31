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

	const handleCategoryCreation = async (formDataToSend) => {
		if (formDataToSend.has('category')) {
			let category = formDataToSend.get('category');
			formDataToSend.delete('category');
			try {
				// The id number of the category is returned to response and then appended to formDataToSend.
				const response = await axios.post('http://localhost:8800/category/', {category: category});
				formDataToSend.append('category', response.data);
				console.log("Successfully added category:", response.data);
			} catch (error) {
				console.log("Error uploading category:", error);
			}
			try {
				const response = await axios.post('http://localhost:8800/books/', formDataToSend, {
					headers: {
			  		'Content-Type': 'multipart/form-data'
					}
				});
				console.log('Successfully added book:', response.data);
			} catch (error) {
				console.log("Error uploading book:", error)
			}
		}
	}

  return (
	<>
		<Navbar />
		{categories.map((category) => {
			console.log("category creation:");
			console.log(category.id);
			console.log(category.name);
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
					submitButtonText="Add Category"
					handleAPI={handleCategoryCreation}>
				</Form>
			</Card>
		</Dropdown>
	</>
  );
};

export default Books;