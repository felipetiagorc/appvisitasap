import { combineReducers, configureStore } from '@reduxjs/toolkit';
import headerSlice from './slices/headerSlice';
import modalSlice from './slices/modalSlice';
import rightDrawerSlice from './slices/rightDrawerSlice';
import cadastroSlice from '../features/cadastro/cadastroSlice';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

// https://www.youtube.com/watch?v=bpbLq6NxIm8

//antes
// const combinedReducer = ({
//   header: headerSlice,
//   rightDrawer: rightDrawerSlice,
//   modal: modalSlice,
//   cadastro: cadastroSlice
// });

const combinedReducer = combineReducers({
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  cadastro: cadastroSlice,
  upload
});

//antes do next-wraper
// export default configureStore({
//   reducer: combinedReducer
// });

// estado de entrada para esse master redux terá todos os valores prévios...
// se a action for hydrate, ele carrega o estado no server 'nextState',
// senão, usa o combinedReducer.
const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      // aqui passa o que esta vindo no payload
      // para cada slice ...
      header: {
        pageTitle: action.payload.header.pageTitle,
        n
      },
      modal: {
        title: action.payload.modal.title,
        isOpen: action.payload.modal.isOpen
      }
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = () =>
  configureStore({
    reducer: masterReducer,
    devTools: true
  });

// export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<AppStore["getState"]>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   Action
// >;

export const wrapper = createWrapper(makeStore, { debug: true });
