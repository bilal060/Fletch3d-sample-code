import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiSlice from "shared/apis/apiSlice/apiSlice";
import authSlice from "./slices/auth/authSlice";
import userSignInfo from "./slices/auth/userSignInfo";
import projectSlice from "./slices/projects/projectSlice";
import LibrarySlice from "./slices/Library/librarySlice";
import { logOut } from "shared/utils/auth";
import VideoSlice from "./slices/Video/VideoSlice";
import myScansSlice from "./slices/myScans/myScansSlice";

// const key = process.env.REACT_APP_REDUX_PERSIST_SECRET_KEY || "soar3dweb";

const persistConfig = {
  key: "soar3dweb",
  storage: AsyncStorage,
  transforms: [
    encryptTransform({
      secretKey: "soar3dweb",
      onError: function () {
        const { dispatch } = store;
        logOut(dispatch);
      },
    }),
  ],
  whitelist: ["auth", "userSignInfo", "library", "myScan"],
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
  userSignInfo: userSignInfo,
  projects: projectSlice,
  Library: LibrarySlice,
  Video: VideoSlice,
  myScan: myScansSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
