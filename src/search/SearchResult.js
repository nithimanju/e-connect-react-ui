import { useSearchParams } from 'react-router-dom';
import { createContext, useEffect, useState } from "react";
import apiCall from '../HTTPRequest';
import SearchedItem from './SearchedItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SearchFilterItem from './SearchFilterItem';
import { Card, Divider, Skeleton, Stack, Typography } from '@mui/material';

const SearchItemContext = createContext();
function SearchResult() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const [searchCount, setSearchCount] = useState(0);
  const [searchList, setSearchList] = useState([]);
  const [searchFilters, setSearchFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedFilterMap, setSelectedFilterMap] = useState(new Map());

  useEffect(() => {
    async function fetchData() {
      let url = "search/api/item/v1/list";

      const dataToSend = {
        queryString: searchQuery,
        languageCode: "en",
        from: 0,
        size: 20,
        filterValues: Object.fromEntries(selectedFilterMap)
      };

      try {
        const data = await apiCall(url, 'POST',JSON.stringify(dataToSend));
        const dataResponse = JSON.parse(data);
        setSearchCount(dataResponse.count);
        setSearchList(dataResponse.itemSearchResponses);
        setLoading(false);
        setSearchFilters(dataResponse.itemSearchFilterResponses);
      } catch (err) {
        console.error("Error:", err);
      }
    }

    fetchData();
  }, [searchQuery, selectedFilterMap]);

  return (
    <SearchItemContext.Provider value={{ selectedFilterMap, setSelectedFilterMap }}>
      <Card direction="row" spacing={2} divider={<Divider sx={{ backgroundColor: "white" }} size={5} orientation="vertical" flexItem />} sx={{ overflow: "hidden", justifyContent: "flex-start", alignItems: "center", backgroundColor: "#f2f7f8ff" }}>
        {!loading ?
          (<Typography sx={{
            display: "inline", marginLeft: 2, fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }} >Fetched <strong>{searchCount}</strong> Results for your Search
            <Typography variant='subtitle1' ml={1} sx={{
              color: "#0CC99F", display: "inline", fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}><strong>"{searchQuery}"</strong>
            </Typography>
          </Typography>) :
          (<div></div>)}
      </Card>
      <Box mt={1} m={1} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} >
          {loading ? (
            <Grid size={{ xs: 0, sm: 0, md: 3 }}>
              <Skeleton variant="rectangular" height={400} />
            </Grid>
          ) : (
            <Grid size={{ xs: 0, sm: 0, md: 2.5 }} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
              <Card>
                <Typography sx={{ fontFamily: "Inter,-apple-system,Helvetica,Arial,sans-serif" }} variant='h6' ml={2} mt={2} mb={2}>
                  Filters
                </Typography>
                <Divider sx={{ backgroundColor: "#f7f7f7ff" }} size={0.5} orientation="horizontal" flexItem />
                {searchFilters && searchFilters.length > 0 ? (
                  searchFilters.map((item, index) => (
                    <Stack borderRadius={2}>
                      <SearchFilterItem key={index} searchFilter={item} />
                    </Stack>
                  ))
                ) : (
                  <div>No Filters found</div>
                )}
              </Card>
            </Grid>
          )
          }
          <Grid size={{ xs: 12, sm: 12, md: 9.5 }} container spacing={2}>
            {loading ?
              Array.from({ length: 8 }).map((_, i) => (
                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={i}>
                  <Skeleton variant="rectangular" height={400} />
                </Grid>
              ))
              :
              (searchList && searchList.length > 0 ? (
                searchList.map((item, index) => (
                  <Grid key={index} size={{ xs: 4, sm: 2, md: 2 }} sx={{ minWidth: 0 }}>
                    <SearchedItem borderRadius={2} itemDetail={item} />
                  </Grid>
                ))
              ) : (
                <div>No items found</div>
              ))}
          </Grid>
        </Grid>
      </Box>
    </SearchItemContext.Provider>
  );
}

export default SearchResult;
export { SearchItemContext };