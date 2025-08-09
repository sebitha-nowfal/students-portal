import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = useSelector(state => state.students.items.find(s => s.id === id));

  if (!student) return <div>Student not found.</div>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back to List</button>
      <h2>{student.name}</h2>
      <p><b>Email:</b> {student.email}</p>
      <p><b>Phone:</b> {student.phone}</p>
      <button onClick={() => navigate(`/student/${id}/edit`)}>Edit</button>
    </div>
  );
}
