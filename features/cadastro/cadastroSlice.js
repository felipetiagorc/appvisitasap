import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCadastroContent = createAsyncThunk(
  '/cadastro/content',
  async () => {
    const response = await axios.get('/api/users?page=2', {});
    return response.data;
  }
);

export const cadastroSlice = createSlice({
  name: 'cadastro',
  initialState: {
    isLoading: false,
    cadastro: []
  },
  reducers: {
    addNewCadastro: (state, action) => {
      let { newCadastroObj } = action.payload;
      state.cadastro = [...state.cadastro, newCadastroObj];
    },

    deleteCadastro: (state, action) => {
      let { index } = action.payload;
      state.cadastro.splice(index, 1);
    }
  },

  // https://redux-toolkit.js.org/api/createSlice
  // cada slice tem seu próprio estado, e vários slices reducers podem responder independetemente a mesma action type.
  // esses extra-reducers são extra-slices para responder a outros tipos de actions além dos exportados em 'slice.actions'.

  // ta dando erro pq tem uma notação nova.. usando 'builder'
  extraReducers: {
    [getCadastroContent.pending]: state => {
      state.isLoading = true;
    },
    [getCadastroContent.fulfilled]: (state, action) => {
      state.cadastro = action.payload.data;
      state.isLoading = false;
    },
    [getCadastroContent.rejected]: state => {
      state.isLoading = false;
    }
  }
});

export const { addNewCadastro, deleteCadastro } = cadastroSlice.actions;

export default cadastroSlice.reducer;
