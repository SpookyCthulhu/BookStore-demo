import { useState } from 'react';

const DropDown = ({ children, title, classes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className='dropdownBtn' onClick={handleClick}>
        <h1>{title}</h1>
        <i className={`fas fa-solid fa-circle-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </div>
      <div className={`dropdown ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default DropDown;