import { combineReducers } from 'redux';
import { resultReducer } from './resultReducer';
import { timerReducer } from './timerReducer';

export const rootReducer = combineReducers({
  result: resultReducer,
  timer: timerReducer,
})

export type RootState = ReturnType<typeof rootReducer>