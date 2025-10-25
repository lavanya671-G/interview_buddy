import React, { useState } from 'react';

const AddUser = () => {
  const [user, setUser] = useState({ name: '', email: '', contact: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to add user
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
      <input type="text" name="contact" placeholder="Contact" onChange={handleInputChange} />
      <button type="submit">Add User</button>
    </form>
  );
};
