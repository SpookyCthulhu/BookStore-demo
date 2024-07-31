import React, { useState, useEffect } from 'react';
import ImgUpload from './ImgUpload';


// Form needs a value for the necessary fields that need to be filled, the text
// for the submit button, and a function for returning the FormData.
const Form = ({ fields, submitButtonText, handleAPI }) => {

  const [formData, setFormData] = useState([]);
  const [backup, setBackup] = useState([]);

  useEffect(() => {
    console.log('vvvv')
		console.log(formData);
    console.log('^^^^')
    if (formData['cover']) {
      setBackup({backup: formData['cover']});
    };
    console.log('Backup:')
    console.log(backup['backup']);
	}, [formData]);

  // Handles live changes to data
  const handleChange = (name, value) => {
    console.log('handleChange name+value:');
    console.log(name);
    console.log(value);
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    console.log('handleChange:');
    console.log(formData['cover']);
  };

  // Formats data into a FormData object and then sends it to be handled by the handleAPI function.
  const handleSubmit = (e) => {

    console.log('handleSubmit cover:')
    console.log(formData['cover']);
    console.log(backup);
    e.preventDefault();
    const formDataToSend = new FormData();
    
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    console.log('formDataToSend:');
    console.log(formDataToSend);

    handleAPI(formDataToSend);
  };

  // Uses field data type to specify the html component and associated className using a switch case.
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
                upload={(file) => {
                                    console.log('Selected file:', file);
                                    handleChange(field.name, file);
                                  }}
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