import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface UserState {
  users: UserData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: 'idle',
  error: null
};

export const saveUser = createAsyncThunk(
  'user/saveUser',
  async (userData: UserData) => {
    console.log('Starting saveUser thunk with data:', userData);
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Failed to save user: ${response.status} ${response.statusText}`);
      }

      const savedUser = await response.json();
      console.log('Successfully saved user:', savedUser);
      return savedUser;
    } catch (error) {
      console.error('Error in saveUser thunk:', error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
      })
      .addCase(saveUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to save user';
      });
  },
});

export default userSlice.reducer;
