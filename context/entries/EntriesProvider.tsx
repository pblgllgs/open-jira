import { FC, ReactNode, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        'Pending: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum mollitia quae consectetur, rem eaque accusantium beatae tempora architecto delectus, nostrum pariatur tempore dolorum eos temporibus saepe eveniet dolor. Non, perferendis.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        'In-Progress: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum mollitia quae consectetur, rem eaque accusantium beatae tempora architecto delectus, nostrum pariatur tempore dolorum eos temporibus saepe eveniet dolor. Non, perferendis.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description:
        'Finished: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum mollitia quae consectetur, rem eaque accusantium beatae tempora architecto delectus, nostrum pariatur tempore dolorum eos temporibus saepe eveniet dolor. Non, perferendis.',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
};

interface Props {
  children: ReactNode;
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description: description,
      status: 'pending',
      createdAt: Date.now(),
    };
    dispatch({ type: '[Entry] - Add-Entry', payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: '[Entry] - Updated-Entry', payload: entry });
  };

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
