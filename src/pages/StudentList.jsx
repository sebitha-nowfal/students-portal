import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents, deleteStudent } from '../features/students/studentsSlice';
import { useNavigate } from 'react-router-dom';

export default function StudentList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector(state => state.students);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchStudents());
  }, [status, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Students</h1>
      <button onClick={() => navigate('/student/new')}>Add Student</button>
      <ul>
        {items.map(s => (
          <li key={s.id}>
            <strong>{s.name}</strong> — {s.email}
            <button onClick={() => navigate(`/student/${s.id}`)}>View</button>
            <button onClick={() => navigate(`/student/${s.id}/edit`)}>Edit</button>
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
