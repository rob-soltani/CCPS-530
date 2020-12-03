import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import rootReducer from "./reducers/rootReducer";

const persistConfig = {
  key: "j4Aj/Ez?+;fLHL@(Gi",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export var store = createStore(persistedReducer);
export var persistor = persistStore(store);
