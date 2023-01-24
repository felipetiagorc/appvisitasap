import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLeadsContent = createAsyncThunk('/leads/content', async () => {
  const response = await axios.get('/api/users?page=2', {});
  return response.data;
});

export const leadsSlice = createSlice({
  name: 'leads',
  initialState: {
    isLoading: false,
    leads: []
  },
  reducers: {
    addNewLead: (state, action) => {
      let { newLeadObj } = action.payload;
      state.leads = [...state.leads, newLeadObj];
    },

    deleteLead: (state, action) => {
      let { index } = action.payload;
      state.leads.splice(index, 1);
    }
  },

  // https://redux-toolkit.js.org/api/createSlice
  // cada slice tem seu próprio estado, e vários slices reducers podem responder independetemente a mesma action type.
  // esses extra-reducers são extra-slices para responder a outros tipos de actions além dos exportados em 'slice.actions'.

  // ta dando erro pq tem uma notação nova.. usando 'builder'
  extraReducers: {
    [getLeadsContent.pending]: state => {
      state.isLoading = true;
    },
    [getLeadsContent.fulfilled]: (state, action) => {
      state.leads = action.payload.data;
      state.isLoading = false;
    },
    [getLeadsContent.rejected]: state => {
      state.isLoading = false;
    }
  }
});

export const { addNewLead, deleteLead } = leadsSlice.actions;

export default leadsSlice.reducer;
