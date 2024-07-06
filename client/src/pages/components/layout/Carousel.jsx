
const Carousel = (props) => {
    
    return (
        <div className="carousel">
          <div className='titleBar'>
            <h1>{props.name}</h1>
            <div className='chevronContainer'>
              <button className='chevron'><i className="fa-solid fa-circle-chevron-left"></i></button>
              <button className='chevron'><i className="fa-solid fa-circle-chevron-right"></i></button>
            </div>
          </div>
          {props.children}
        </div>
    );
};

export default Carousel;