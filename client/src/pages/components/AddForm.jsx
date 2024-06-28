import { useState } from 'react';
import axios from 'axios';

const AddForm = (props) => {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [cover, setCover] = useState('default.png');
    const [category, setCategory] = useState(props.category);
    const [coverPreview, setCoverPreview] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('cover', cover);
        formData.append('category', 'Adventure');


        try {
            const response = await axios.post('http://localhost:8800/books/', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });

            console.log('Upload successful:', response.data);
            // Reset form fields after successful upload
            setTitle('');
            setDescription('');
            setPrice('');
            setCover(null);
        } catch (error) {
            console.error('Error uploading data:', error);
        };
    };

    return (
        <form className="book" onSubmit={handleSubmit}>
                <div className="imgContainer">
                    <img src={`images/default.png`} />
                    <div className="overlay formOverlayContainer">
                        <button className='overlay-button' id='randomizeBtn'>
                            <i class='fas fa-dice'></i>
                        </button>
                        <label className='uploadContainer' htmlFor='image'><i class="fa-solid fa-file-arrow-up uploadImg"></i></label>
                            <input className="none" type='file' id='image' accept='image/*' onChange={(e) => setCover(e.target.files[0])} />
                    </div>
                </div>
                <input 
                    type='text' 
                    className='title'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input 
                    type='text' 
                    className='priceInput' 
                    placeholder='Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <textarea 
                    className='descInput' 
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type='submit' className='formButton'>
                    Add Book
                </button>

        </form>
    );
}

export default AddForm;