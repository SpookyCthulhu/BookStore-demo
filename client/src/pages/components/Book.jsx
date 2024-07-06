import Card from './layout/Card';

const Book = (props) => {
    return (
        <Card key={props.id}>
            <div className="imgContainer">
                {props.cover ? <img src={`http://localhost:8800/books/images/${props.id}`} alt={props.title}/> : <img src={'images/default.png'} />}
                <div className="overlay">
                    <button className="overlay-button" onClick={() => props.handleDelete(props.id)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                    <button className="overlay-button">
                        <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button className="overlay-button">
                        <i className="fas fa-file-arrow-down"></i>
                    </button>
                </div>
            </div>
            <h2 className='title'>{props.title}</h2>
            <p className='description'>{props.description}</p>
            <button className="add-to-cart">
                <i className="fas fa-shopping-cart"></i> Add to cart - ${props.price}
            </button>
        </Card>
    );
}

export default Book;