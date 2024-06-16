<<<<<<< HEAD
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type {AppDispatch ,RootState } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

=======
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type {AppDispatch ,RootState } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
