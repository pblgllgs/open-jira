import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useContext, useState } from 'react';
import { EntriesContext } from '../../context/entries';
import Swal from 'sweetalert2';
import { UIContext } from '../../context/ui';

const INITIAL_FORM = '';

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState(INITIAL_FORM);

  const [touch, setTouched] = useState(false);

  const handleReset = () => {
    setInputValue(INITIAL_FORM);
    setTouched(false);
    setIsAddingEntry(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    if (inputValue.trim().length === 0) return;
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue(INITIAL_FORM);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={touch && inputValue === '' && 'Ingrese un valor'}
            value={inputValue}
            onChange={handleChange}
            onBlur={() => setTouched(true)}
            error={touch && inputValue === ''}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={handleReset}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          New Entry
        </Button>
      )}
    </Box>
  );
};
