

import {useEffect} from 'react';
import { useOutletContext } from 'react-router';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import MainCard from './MainCard';

function useInputRef() {
  return useOutletContext();
}

// ==============================|| TAB - PERSONAL ||============================== //

export default function QickForm({ noteData, setFormData }) {
  const inputRef = useInputRef();



  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      Advice: {
        Advice: "",
       
      },
    }));
  }, [setFormData]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      Advice: {
        ...prevData.Advice,
        [name]: value,
      },
    }));
  };

  return (
    // <MainCard content={false} sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
    <>
    
      
       
            <h4>Advice</h4>
            <TextField
              rows={1}
              fullWidth
              name="Advice"
              onChange={handleChange}
              id="personal-note"
              placeholder="Advice"
              inputRef={inputRef}
            />
        
      
    
  </>
  );
}
