import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  width: calc(100% - 20px);
`;

const UserForm = ({ onSubmit, user }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: user ? user.id : Date.now(), name, email });
    setName('');
    setEmail('');
  };

  return (
    <FormContainer>
      <h2>{user ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <button type="submit">{user ? "Update" : "Add"}</button>
      </form>
    </FormContainer>
  );
};

export default UserForm;