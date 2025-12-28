import { Checkbox, FormControlLabel, FormGroup, Typography, Divider } from "@mui/material";
import { useContext, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SearchItemContext } from "./SearchResult";

export default function SearchFilterItem(props) {
  const searchFilter = props.searchFilter;
  const filterName = searchFilter.attributeName;
  const filterCount = searchFilter.attributeTotalCount;
  const filterValueMap = searchFilter.attributeValues;
  const { selectedFilterMap, setSelectedFilterMap } = useContext(SearchItemContext);

  const [checked, setChecked] = useState(false);

  const isChecked = (filterName, filterValue) => {
    let facetValues = selectedFilterMap.get(filterName);
    let isChecked = false;
    facetValues?.forEach(element => {
      if(element === filterValue){
        isChecked = true;
      }
    });
    return isChecked;
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    const filterName = event.target.parentElement.dataset.filtername;
    const filterValue = event.target.parentElement.dataset.filtervalue;
    setSelectedFilterMap(prev => {
      const map = new Map(prev);
      const prevValue = map.get(filterName)?.map(a => {if(a!==filterValue)return a;});
      if (event.target.checked) {
        const newValues = prevValue ? [...prevValue, filterValue] : [filterValue]; 
        map.set(filterName, newValues);
      } else {
        const newValues =  prevValue ? prevValue : [];
        map.delete(filterName, newValues);
      }
      return map;
    });
  };
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<KeyboardArrowDownIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography pl={2} sx={{ fontFamily: "Inter, -apple-system, Helvetica, Arial, sans-serif", fontWeight: 500, marginRight: 1 }} variant="body2">{filterName?.toUpperCase()}</Typography>
        <Typography>({filterCount})</Typography>
      </AccordionSummary>
      <Divider variant='inset' sx={{ backgroundColor: "#ffffffff" }} size={0.05} orientation="horizontal" flexItem />
      <AccordionDetails>
        <FormGroup>
          {Object.entries(filterValueMap).map(([key]) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                sx={{paddingLeft:4}}
                  data-filtername={filterName}
                  data-filtervalue={key}
                  checked={isChecked(filterName, key)}
                  onChange={handleChange}
                />
              }
              label={<Typography variant="subtitle2">{key}</Typography>}
            />
          ))}
        </FormGroup>
      </AccordionDetails>
      <Divider sx={{ backgroundColor: "#ffffffff" }} size={0.3} orientation="horizontal" flexItem />
    </Accordion>
  );
}