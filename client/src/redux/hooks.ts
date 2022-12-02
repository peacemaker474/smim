import { TypedUseSelectorHook, useSelector, useDispatch, shallowEqual } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export function useAppSelectorTyped<T>(fn: (state: RootState) => T): T {
  return useSelector(fn, shallowEqual);
}
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
