import React from 'react';
import { useQuery } from '@tanstack/react-query';



function tasksTable() {
  const { data, error, isLoading } = useQuery(['users'], fetchUsers);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}