import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/userSlice';
import { RootState, AppDispatch } from '../store';

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Type the dispatch function
  const users = useSelector((state: RootState) => state.users.users);
  const status = useSelector((state: RootState) => state.users.status);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < 10) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSort = (key: 'name' | 'login') => {
    const sortedUsers = [...users].sort((a, b) => {
      const aKey = key === 'name' ? a.name.first : a.login.username;
      const bKey = key === 'name' ? b.name.first : b.login.username;
      return aKey < bKey ? -1 : aKey > bKey ? 1 : 0;
    });
    dispatch({ type: 'users/fetchUsers/fulfilled', payload: sortedUsers });
  };

  return (
    <div className="container mx-auto p-4">
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th
                  className="w-1/3 px-4 py-2 cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Full Name
                </th>
                <th
                  className="w-1/3 px-4 py-2 cursor-pointer"
                  onClick={() => handleSort('login')}
                >
                  Username
                </th>
                <th className="w-1/3 px-4 py-2">Thumbnail</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    {user.name.title} {user.name.first} {user.name.last}
                  </td>
                  <td className="border px-4 py-2">{user.login.username}</td>
                  <td className="border px-4 py-2">
                    <img src={user.picture.thumbnail} alt="thumbnail" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={currentPage === 10}
            >
              Next
            </button>
          </div>
        </>
      )}
      {status === 'failed' && <p>Failed to load users</p>}
    </div>
  );
};

export default UserTable;
