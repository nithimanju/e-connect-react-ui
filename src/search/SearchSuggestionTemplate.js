import { useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router";
import apiCall from '../HTTPRequest';

const LOCAL_STORAGE_KEY = "recent-search-keys";
const SUGGESTION_STORAGE_KEY = "search-key-suggestions";

const getRecentSearchesFromStorage = () => {
  const storedSearches = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedSearches ? JSON.parse(storedSearches) : [];
};

const isCallRequired = (inputValue, totalSearchSuggestions) => {
  if (localStorage.getItem(`last-search-key-values-${inputValue}`)?.length > 9) {
    return JSON.parse(localStorage.getItem(`last-search-key-values-${inputValue}`)).slice(0, 10);
  }
  if (!totalSearchSuggestions || totalSearchSuggestions.length === 0) {
    return [];
  }
  return totalSearchSuggestions.filter(suggestion =>
    suggestion.itemTitle && suggestion.itemTitle.toLowerCase().startsWith(inputValue.toLowerCase())
  ).slice(0, 10);
};


function SearchSuggestionTemplate(props) {
  let navigate = useNavigate();
  let autoCompleteId = props.autocompleteId;
  const [recentSearches, setRecentSearches] = useState(getRecentSearchesFromStorage());
  const [searchSuggestions, setSearchSuggestions] = useState(recentSearches);
  const [totalSearchSuggestions, setTotalSearchSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fetchSuggestions = useCallback(async (queryString) => {
    if (queryString === '') {
      setSearchSuggestions(recentSearches);
      return;
    }
    const filteredSuggestions = isCallRequired(queryString, totalSearchSuggestions);
    if (filteredSuggestions.length > 9) {
      setSearchSuggestions(filteredSuggestions);
      return;
    }
    const dataToSend = {
      "queryString": queryString,
      "languageCode" : "en"
    };

    try {
      const response = await apiCall('search/api/item/v2/autocomplete-search', 'POST', dataToSend);
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      const data = JSON.parse(response);
      let searchResults = data.itemAutoCompleteResponses || [];
      setTotalSearchSuggestions(searchResults);
      localStorage.setItem(`last-search-key-values-${queryString}`, JSON.stringify(searchResults));
      setSearchSuggestions(searchResults.slice(0, 10) || []);
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
    }
  }, [totalSearchSuggestions]);

  const handleClickSearch = useCallback((event) => {
    let queryString = event?.currentTarget?.innerText === '' ? inputValue : event?.currentTarget?.innerText;
    if (event.type === 'click' && queryString !== '') {
      fetchSearchResults(queryString);
    }
  });

  const fetchSearchResults = useCallback((inputValue) => {
    const newSearch = searchSuggestions.filter(item => item.itemTitle == inputValue)[0] || {};
    const oldSearches = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))?.filter(item => item.itemTitle !== inputValue) || [];
    const updatedSearches = [newSearch, ...oldSearches];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);
    const encodedQuery = encodeURIComponent(inputValue.trim());
    navigate(`/search-results?query=${encodedQuery}`);
  })

  const handleInputChange = useCallback((event, newInputValue, reason) => {
    setInputValue(newInputValue);
    if (reason === 'input') {
      fetchSuggestions(newInputValue);
    }
  }, [fetchSuggestions]);

  const handleOptionClick = useCallback((event, value) => {
    if (value && event.keyCode === 13) {
      fetchSearchResults(value);
    }
  }, []);

  const optionsList = searchSuggestions?.map((option) => option.itemTitle).filter(Boolean) || [];
  return (
    <Box
      alignItems="center"
      sx={{
        boxShadow: "0 0 0 2.5px #77F7DB",
        backgroundColor: "white",
        borderRadius: 2,
        width: "100%"
      }}
    >
      <Autocomplete
        id={autoCompleteId}
        freeSolo
        options={optionsList}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleOptionClick}
        ListboxProps={{
          sx: {
            padding: "0 !important",
            margin: "0 !important",
            maxHeight: "100%"
          }
        }}
        sx={{
          "& .MuiAutocomplete-popper": {
            margin: 0
          },
          "& .MuiAutocomplete-listbox": {
            padding: "0 !important",
            margin: "0 !important"
          }
        }}
        renderOption={(props, option) => (
          <li {...props}
            onClickCapture={handleClickSearch}
            style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #f0f0f0" }}>
            <SearchIcon
              style={{
                fontSize: 20,
                marginRight: 8,
                color: "#77F7DB"
              }}
            />
            {option}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            sx={{
              "& .MuiAutocomplete-inputRoot": {
                paddingLeft: "10px !important",
                paddingRight: "0px !important"
              }
            }}
            {...params}
            variant="standard"
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    sx={{
                      backgroundColor: "#77F7DB",
                      borderRadius: 2,
                      width: "100%",
                      minWidth: "40px",
                      px: 0
                    }}
                    onClick={handleClickSearch}
                  >
                    <SearchIcon sx={{ fontSize: { xs: 24, sm: 28 }, color: "white" }} />
                  </Button>
                </InputAdornment>
              )
            }}
          />
        )}
      />
    </Box>
  );

}

export default SearchSuggestionTemplate;