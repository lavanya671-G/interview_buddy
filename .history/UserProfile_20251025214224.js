import React from 'react';
import { useParams, Route } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams(); // Get user ID from URL
  // Fetch user data based on ID...

  return (
    <div>
      <div>
        <h2>{user.name}</h2>
        <div>
          <button onClick={() => navigateTo('basic')}>Basic Info</button>
          <button onClick={() => navigateTo('education')}>Education & Skills</button>
          <button onClick={() => navigateTo('experience')}>Experience</button>
        </div>
      </div>

      <Route path={`/users/${id}/basic`} component={BasicDetails} />
      <Route path={`/users/${id}/education`} component={EducationSkills} />
      <Route path={`/users/${id}/experience`} component={Experience} />
    </div>
  );
};