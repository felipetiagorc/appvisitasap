import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUploadContent = createAsyncThunk(
  //nome da action:
  '/upload/content',
  //aqui no callback busca dados em api. Ex: arquivos já upados do user
  //ele sempre retorna uma promise, com 'lifecycle actions'
  // 'pending' 'fullfiled', 'rejected':  vamos usar nos extraReducers..
  // ele disse 'need to match to the 'T' ... generics?
  // pq sao providos pelo RTK, e por isso precisam estar
  // envolvidos com colchetes '[]'
  async () => {
    // dar get na api
    // const response = await axios.get('https://reqres.in/api/users?page=2', {});
  }
);

export const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    isLoading: false,
    upload: []
  },
  reducers: {
    addNewUpload: (state, action) => {
      let { newUploadObj } = action.payload;
      state.upload = [...state.upload, newUploadObj];
    },

    deleteUpload: (state, action) => {
      let { index } = action.payload;
      state.upload.splice(index, 1);
    }
  },

  // https://redux-toolkit.js.org/api/createSlice
  // cada slice tem seu próprio estado, e vários slices reducers podem responder independetemente a mesma action type.
  // esses extra-reducers são extra-slices para responder a outros tipos de actions além dos exportados em 'slice.actions'.

  // dando WARNING no console pq tem uma notação nova usando 'builder'
  extraReducers: {
    [getUploadContent.pending]: state => {
      state.isLoading = true;
    },
    [getUploadContent.fulfilled]: (state, action) => {
      state.upload = action.payload.data;
      state.isLoading = false;
    },
    [getUploadContent.rejected]: state => {
      state.isLoading = false;
    }
  }
});

export const { addNewUpload, deleteUpload } = uploadSlice.actions;

export default uploadSlice.reducer;
