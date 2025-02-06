import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface UserData {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

// Fallback to localStorage if server is not available
const saveToLocalStorage = (userData: UserData) => {
  try {
    const existingData = localStorage.getItem('users');
    const users = existingData ? JSON.parse(existingData) : [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    return userData;
  } catch (error) {
    throw new Error('Failed to save to localStorage');
  }
};

export const saveUser = createAsyncThunk(
  'user/saveUser',
  async (userData: UserData) => {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        // If server fails, fallback to localStorage
        return saveToLocalStorage(userData);
      }
      
      return response.json();
    } catch (error) {
      // If server is not available, fallback to localStorage
      return saveToLocalStorage(userData);
    }
  }
);

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) {
        // If server fails, get from localStorage
        const data = localStorage.getItem('users');
        return data ? JSON.parse(data) : [];
      }
      return response.json();
    } catch (error) {
      // If server is not available, get from localStorage
      const data = localStorage.getItem('users');
      return data ? JSON.parse(data) : [];
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [] as UserData[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(saveUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to save user data';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.error = null;
      });
  },
});

export default userSlice.reducer;
