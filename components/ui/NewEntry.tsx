import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useContext, useState } from 'react';
import { EntriesContext } from '../../context/entries';
import Swal from 'sweetalert2';

const INITIAL_FORM = '';

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => setIsAdding(true);

  const handleClean = () => {
    setIsAdding(false);
    setTouch(false);
    handleReset();
  };
  const [inputValue, setInputValue] = useState(INITIAL_FORM);

  const [touch, setTouch] = useState(false);

  const handleReset = () => {
    setInputValue(INITIAL_FORM);
    setTouch(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    if (inputValue.trim().length === 0) return;
    setIsAdding(false);
    setTouch(false);
    handleClean();
    addNewEntry(inputValue);
    Swal.fire(
      '¡Listo!',
      'Se ha agregado una nueva entrada',
      'success'
    );
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAdding ? (
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
            onBlur={() => setTouch(true)}
            error={touch && inputValue === ''}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={handleClean}>
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
          onClick={handleAdd}
        >
          New Entry
        </Button>
      )}
    </Box>
  );
};
