import { AppBar, Divider, Stack } from "@mui/material";
import CategoryHeaderItem from "./CategoryHeaderItem";
import { useEffect, useState } from "react";
import apiCall from "../HTTPRequest";

export default function CategoryHeader() {
  const[categoryList, setCategoryList] = useState({});
  const[loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchRootCategories() {
      let data = await apiCall("part-service/child-hierarchy/parent-id?categoryId=0&from=0&size=10");
      if(data) {
        setCategoryList(JSON.parse(data));
        setLoading(false);
      }
    }
    fetchRootCategories();
  }, []);
  return (
    <AppBar position="static" sx={{
      backgroundColor: "#5b5e5eff",
      flexGrow: 1
    }}>
      <Stack direction="row" spacing={2} divider={<Divider sx={{ backgroundColor: "white" }} size={5} orientation="vertical" flexItem />} sx={{ minWidth: 0, width: "100%", justifyContent: "flex-start", alignItems: "center", backgroundColor: "inherit", display: "flex", flexWrap: "no-wrap", marginLeft: 1, paddingTop: 0.4, paddingBottom: 0.3 }}>
        {!loading && categoryList && categoryList.length > 0 ? (
          categoryList.map((category, index) => (
            <CategoryHeaderItem key={index} categoryId={category.categoryId} categoryName={category.categoryNames["en"]} />
          ))
        ) : (
          <div>No items found</div>
        )}
      </Stack>
    </AppBar>
  );
}