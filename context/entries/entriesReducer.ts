import { Entry } from '../../interfaces';
import { EntriesState } from './EntriesProvider';

type EntriesActionType =
  | { type: '[Entry] - Add-Entry', payload: Entry }
  | { type: '[Entry] - Updated-Entry', payload: Entry }
  | { type: '[Entry] - Refresh-Entries', payload: Entry[] }
  | { type: '[Entry] - Delete-Entry', payload: Entry }

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {
    case '[Entry] - Add-Entry':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      };
    case '[Entry] - Updated-Entry':
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry._id === action.payload._id) {
            return action.payload;
          }
          return entry;
        })
      }
    case '[Entry] - Refresh-Entries':
      return {
        ...state,
        entries: [...action.payload]
      }
    case '[Entry] - Delete-Entry':
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id !== action.payload._id)
      }
    default:
      return state;
  }
}