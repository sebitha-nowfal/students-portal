import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch initial students from jsonplaceholder
export const fetchStudents = createAsyncThunk('students/fetch', async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users');
  // map to simpler student shape
  return res.data.map(u => ({
    id: String(u.id),
    name: u.name,
    email: u.email,
    phone: u.phone || '',
  }));
});

const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addStudent: (state, action) => {
      state.items.push(action.payload);
    },
    updateStudent: (state, action) => {
      const idx = state.items.findIndex(s => s.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    deleteStudent: (state, action) => {
      state.items = state.items.filter(s => s.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchStudents.pending, state => { state.status = 'loading'; })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addStudent, updateStudent, deleteStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
