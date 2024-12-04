import { TypedUseSelectorHook, useSelector } from 'react-redux';

import type { StateType } from '../types/state';

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;
