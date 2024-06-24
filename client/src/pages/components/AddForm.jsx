const AddForm = () => {
    return (
        <form className="book">
                <div className="imgContainer">
                    <img src={`images/default.png`} />
                    <div className="overlay formOverlayContainer">
                        <button className='overlay-button' id='randomizeBtn'>
                            <i class='fas fa-dice'></i>
                        </button>
                        <button className="uploadContainer">
                            <i class="fa-solid fa-file-arrow-up uploadImg"></i>
                        </button>
                    </div>
                </div>
                <input type='text' className='title' placeholder='Title'></input>
                <textarea className='descInput' placeholder='Description'></textarea>
                <button  className='formButton'>
                    Add Book
                </button>

        </form>
    );
}

export default AddForm;