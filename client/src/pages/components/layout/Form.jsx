import React, { useState } from 'react';
import axios from 'axios';
import ImgUpload from './ImgUpload';


// Form needs a value for the necessary fields that need to be filled, the text
// for the submit button, and a relevant apiEndpoint to post to.
// category is an addition necessary piece of data in this case which comes from
// the parent, and is placed in the useState by default.

const Form = ({ fields, submitButtonText, apiEndpoint, category }) => {
  console.log(category);
  const [formData, setFormData] = useState({category: category});

  const handleChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post(apiEndpoint, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload successful:', response.data);
      setFormData({}); // Reset form after successful submission
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  // Uses field data to define some 
  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => {
        switch(field.type) {
          case 'text':
          case 'number':
            return (
              <input
                key={field.name}
                type={field.type}
                className={field.className}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            );
          case 'textarea':
            return (
              <textarea
                key={field.name}
                className={field.className}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            );
          case 'image':
            return (
              <ImgUpload
                key={field.name}
                upload={(file) => handleChange(field.name, file)}
              />
            );
          default:
            return null;
        }
      })}
      <button type='submit' className='formButton'>
        {submitButtonText}
      </button>
    </form>
  );
};

export default Form;