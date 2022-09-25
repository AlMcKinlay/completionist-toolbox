import React from "react";
import { Provider } from "react-redux";

import createStore from "./src/createStore";

export const wrapRootElement = ({ element }) => {
  const { store, persistor } = createStore();

  return <Provider store={store}>{element}</Provider>;
};
