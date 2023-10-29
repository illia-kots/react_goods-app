import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUsersFromServer } from '../api/users';
import { User } from '../types/User';

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
};

export const loadUsers = createAsyncThunk('users/fetch', () => (
  getUsersFromServer()
));

const userSlice = createSlice({
  name: 'userLogIn',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => ({
      ...state,
      user: action.payload,
    }),
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
