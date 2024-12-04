import { useDispatch } from 'react-redux';

import type { AppDispatchType } from '../types/state';

export const useAppDispatch = () => useDispatch<AppDispatchType>();
