import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Category = (props) => {
    const [books, setBooks] = useState([]);

    // There's probably some problems with this, please test.
    useEffect(() => {
      const fetchAllBooks = async () => {
        try {
          const res = await axios.get('http://localhost:8800/books/category/'+props.name);
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
        <div className="category">
          <div className='titleBar'>
            <h1>{props.name}</h1>
            <div className='chevronContainer'>
              <button className='chevron'><i class="fa-solid fa-circle-chevron-left"></i></button>
              <button className='chevron'><i class="fa-solid fa-circle-chevron-right"></i></button>
            </div>
          </div>
          <div className="books">
              {books.map((book) => (
              <div className="book" key={book.id}>
                  <div className="imgContainer">
                  {book.cover && <img src={`images/${book.cover}`} alt="x" />}
                  <div className="overlay">
                      <button className="overlay-button" onClick={() => handleDelete(book.id)}>
                      <i className="fas fa-trash-alt"></i>
                      </button>
                      <Link to={`/update/${book.id}`} className="overlay-button">
                      <i className="fas fa-pencil-alt"></i>
                      </Link>
                  </div>
                  </div>
                  <h2 className='title'>{book.title}</h2>
                  <p className='description'>{book.description}</p>
                  <button className="add-to-cart">
                  <i className="fas fa-shopping-cart"></i> Add to cart - ${book.price}
                  </button>
              </div>
              ))}
              <button className="addBtn">
              <Link className="link white" to="/add">
                  Add New Book +
              </Link>
              </button>
          </div>
        </div>
    );
};

export default Category;