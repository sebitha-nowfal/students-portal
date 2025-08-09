import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/Store';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import StudentList from './pages/StudentList';
import StudentDetail from './pages/StudentDetail';
import StudentForm from './pages/StudentForm';

const router = createBrowserRouter([
  { path: '/', element: <StudentList /> },
  { path: '/student/new', element: <StudentForm /> },
  { path: '/student/:id', element: <StudentDetail /> },
  { path: '/student/:id/edit', element: <StudentForm /> },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
