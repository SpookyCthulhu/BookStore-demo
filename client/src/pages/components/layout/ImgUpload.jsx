// An image submission form varient, that uses a default image and displays the image with a overlay and buttons

const ImgUpload = (props) => {
    return (
        <div className="imgContainer">
            <img src={`images/default.png`} />
            <div className="overlay formOverlayContainer">
                <button className='overlay-button' id='randomizeBtn'>
                    <i class='fas fa-dice'></i>
                </button>
                <label className='uploadContainer' htmlFor='image'><i class="fa-solid fa-file-arrow-up uploadImg"></i></label>
                    <input className="none" type='file' id='image' accept='image/*' onChange={(e) => props.upload(e.target.files[0])} />
            </div>
        </div>
    );
}

export default ImgUpload;