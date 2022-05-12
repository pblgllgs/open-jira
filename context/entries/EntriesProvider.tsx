import { FC, ReactNode, useEffect, useReducer } from 'react';
import Swal from 'sweetalert2';
import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface Props {
  children: ReactNode;
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>('/entries', {
        description,
      });
      dispatch({ type: '[Entry] - Add-Entry', payload: data });
    } catch (error) {
      throw new Error('Error al agregar la entrada');
    }
  };
  const updateEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: '[Entry] - Updated-Entry', payload: data });
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        color: '#fff',
        background: '#1b1b1b',
      });
      Toast.fire({
        icon: 'success',
        title: `Estado cambiado correctamente a ${status}`,
      });
    } catch (error) {
      throw new Error('Error al actualizar la entrada');
    }
  };
  const refreshEntries = async () => {
    try {
      const { data } = await entriesApi.get<Entry[]>('/entries');
      dispatch({ type: '[Entry] - Refresh-Entries', payload: data });
    } catch (error) {
      throw new Error("Couldn't refresh entries");
    }
  };
  useEffect(() => {
    refreshEntries();
  }, []);
  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
