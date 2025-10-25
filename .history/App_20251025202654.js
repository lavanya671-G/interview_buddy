import React, { useState } from 'react';
import styled from 'styled-components';
import UserProfile from './UserProfile';
import UserList from './UserList';
import UserForm from './UserForm';

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const editUser = (user) => {
    const updatedUsers = users.map(u => (u.id === user.id ? user : u));
    setUsers(updatedUsers);
    setSelectedUser(null);
  };

  return (
    <Container>
      <h1>User Profile Management</h1>
      <UserForm onSubmit={selectedUser ? editUser : addUser} user={selectedUser} />
      <UserList users={users} onSelect={setSelectedUser} />
      {selectedUser && <UserProfile user={selectedUser} />}
    </Container>
  );
}

export default App;