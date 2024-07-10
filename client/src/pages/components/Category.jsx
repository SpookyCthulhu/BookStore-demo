import { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './Book';
import Card from './layout/Card';
import Form from './layout/Form';
import Carousel from './layout/Carousel';

const Category = (props) => {
    const [books, setBooks] = useState([]);

    // There's probably some problems with this, please test.
    useEffect(() => {
      const fetchAllBooks = async () => {
        try {
          const res = await axios.get('http://localhost:8800/category/'+props.id);
          setBooks(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchAllBooks();
    }, []);
  
    const handleDelete = async (id) => {
      try {
        await axios.delete('http://localhost:8800/books/' + id);
        // REMOVE THIS before merging with main
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };

    return(
      <Carousel name={props.name}>
        {
          // Changed books to 'carousel content'
        }
          <div className="carouselContent">
              {books.map((book) => (
                <Book title={book.title} description={book.description} price={book.price} cover={book.cover} id={book.id} key={book.id} handleDelete={handleDelete}/>
              ))}
              <Card>
                {
                // Form is an extensible way to create new forms by creating 'fields' which request certain data from the user.
                // If supplied an apiEndpoint, will automatically post to given address with all the field names as values.
                }
                <Form
                  fields = {[
                            { name: 'cover', type: 'image'},
                            { name: 'title', type: 'text', className: 'title', placeholder: 'Title' },
                            { name: 'price', type: 'text', className: 'priceInput', placeholder: 'Price' },
                            { name: 'description', type: 'textarea', className: 'descInput', placeholder: 'Description' },
                          ]}
                  submitButtonText="Add Book"
                  apiEndpoint={`http://localhost:8800/books/`}
                  category={props.id}>
                </Form>
              </Card>
          </div>
      </Carousel>
    );
};

export default Category;