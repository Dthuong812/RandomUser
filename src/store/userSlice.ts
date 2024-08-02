import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho người dùng
interface User {
  login: { uuid: string; username: string };
  name: { title: string; first: string; last: string };
  picture: { thumbnail: string };
}

// Định nghĩa kiểu dữ liệu cho trạng thái người dùng
interface UserState {
  users: User[];
  page: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// Định nghĩa action creator để fetch users từ API
export const fetchUsers = createAsyncThunk<User[], number>(
  'users/fetchUsers',
  async (page: number) => {
    const response = await axios.get(
      `https://randomuser.me/api/?page=${page}&results=10`
    );
    return response.data.results;
  }
);

// Tạo slice cho người dùng
const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    page: 1,
    status: 'idle',
  } as UserState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// Xuất các action và reducer từ slice
export const { setPage } = userSlice.actions;
export default userSlice.reducer;
