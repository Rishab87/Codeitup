<<<<<<< HEAD
"use client";

import { Provider } from "react-redux";
import { store } from "./store";

export const Providers = ({ children }: { children: React.ReactNode })=>{

  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
=======
"use client";

import { Provider } from "react-redux";
import { store } from "./store";

export const Providers = ({ children }: { children: React.ReactNode })=>{
  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
}