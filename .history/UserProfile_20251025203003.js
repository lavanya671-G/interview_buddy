import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
`;

const UserProfile = ({ user }) => {
  return (
    <ProfileContainer>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </ProfileContainer>
  );
};

export default UserProfile;