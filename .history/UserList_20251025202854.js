import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  margin-bottom: 20px;
`;

const UserItem = styled.div`
  margin: 5px 0;
  cursor: pointer;
`;

const UserList = ({ users, onSelect }) => {
  return (
    <ListContainer>
      <h2>Users</h2>
      {users.map(user => (
        <UserItem key={user.id} onClick={() => onSelect(user)}>
          {user.name} - {user.email}
        </UserItem>
      ))}
    </ListContainer>
  );
};

export default UserList;