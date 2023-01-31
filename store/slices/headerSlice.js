import { createSlice } from '@reduxjs/toolkit';
//https://blog.logrocket.com/use-redux-next-js/
import { HYDRATE } from 'next-redux-wrapper';

export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    pageTitle: 'Home', // current page title state management
    noOfNotifications: 15, // no of unread notifications
    newNotificationMessage: '', // message of notification to be shown
    newNotificationStatus: 1 // to check the notification type -  success/ error/ info
  },
  reducers: {
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload.title;
    },

    removeNotificationMessage: (state, action) => {
      state.newNotificationMessage = '';
    },

    showNotification: (state, action) => {
      console.log(action);
      state.newNotificationMessage = action.payload.message;
      state.newNotificationStatus = action.payload.status;
    }
  }
  // acho q ta duplicado esse hydrate.. tem no store ja
  // mas no video q to vendo ele usa esse hydrate no arquivo 'store' dele, q é o slice meu..
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.pageTitle
  //     };
  //   }
  // }
});
// actions creators - gerados para cada funcao reducer
export const { setPageTitle, removeNotificationMessage, showNotification } =
  headerSlice.actions;

export default headerSlice.reducer;
