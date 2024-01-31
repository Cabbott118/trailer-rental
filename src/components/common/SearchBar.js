import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const response = await fetch(
          'https://us-central1-trailer-rental-eca77.cloudfunctions.net/api/trailers/get-all-trailers'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch trailers');
        }
        const data = await response.json();

        // Filter out duplicate entries based on the city property
        const uniqueOptions = Array.from(
          new Set(data.map((option) => option.location.city))
        ).map((city) => {
          return data.find((option) => option.location.city === city);
        });

        setOptions(uniqueOptions);
      } catch (error) {
        console.error('Error fetching trailers:', error);
      }
    };

    fetchTrailers();
  }, []);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.location.city}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField {...params} label='Search' variant='outlined' fullWidth />
      )}
    />
  );
};

export default SearchBar;
