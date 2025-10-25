import React from 'react';

const UserList = () => {
  // Assume users is a prop received or fetched data
  return (
    <table>
      <thead>
        <tr>
          <th>Sr. No</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button onClick={() => viewUser(user.id)}>View</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
