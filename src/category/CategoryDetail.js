import { Box, Container, Divider, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import apiCall from "../HTTPRequest";
import { useSearchParams } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import SearchedItem from "../search/SearchedItem";

export default function CategoryDetail(props) {
  const [searchParams] = useSearchParams();
  const queryCategoryId = searchParams.get('categoryId');
  const [categoryDetail, setCategoryDetail] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const [categoryDetailLoading, setCategoryDetailLoading] = useState(true);
  const [categoryListLoading, setCategoryListLoading] = useState(true);
  const [searchList, setSearchList] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [searchFilters, setSearchFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchCategoryDetail() {
      let data = await apiCall(`part-service/category-detail/${queryCategoryId}`);
      if (data) {
        setCategoryDetail(JSON.parse(data));
        setCategoryDetailLoading(false);
      } else {
        setCategoryDetail({});
        setCategoryDetailLoading(false);
      }
    };
    async function fetchChildCategoryList() {
      let data = await apiCall(`part-service/child-hierarchy/parent-id?categoryId=${queryCategoryId}&from=0&size=10`);
      if (data) {
        setCategoryList(JSON.parse(data));
        setCategoryListLoading(false);
      } else {
        setCategoryList([]);
        setCategoryListLoading(false);
      }
    };
    async function fetchData() {
      let url = "search/api/item/v1/list";

      const dataToSend = {
        languageCode: "en",
        from: 0,
        size: 20,
        categoryIds: queryCategoryId ? [queryCategoryId] : []
      };

      try {
        const data = await apiCall(url, 'POST', JSON.stringify(dataToSend));
        if (data) {
          const dataResponse = JSON.parse(data);
          setSearchCount(dataResponse.count);
          setSearchList(dataResponse.itemSearchResponses);
          setLoading(false);
          setSearchFilters(dataResponse.itemSearchFilterResponses);
        } else {
          setSearchCount(0);
          setSearchList([]);
          setLoading(false);
          setSearchFilters([]);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
    fetchCategoryDetail();
    fetchChildCategoryList();
    fetchData();
  }, [queryCategoryId]);

  return (
    <Box display="flex" mx={{ xs: 1, sm: 6, md: 10 }} sx={{ justifyContent: "center" }}>
      <Paper sx={{ boxShadow: "0px 2px 2px -1px rgba(167, 250, 232, 1),0px 1px 2px 1px rgba(167, 250, 232, 1),1px 1px 3px 0px rgba(167, 250, 232, 0.5)", borderRadius: "5px !important", margin: "10px", width: "clamp(30px, 90vw, 1200px)" }}>
        <Typography sx={{
          fontSize: "clamp(0.7rem, 1.5vw, 1.9rem)",
          flexWrap: "wrap",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          textOverflow: "ellipsis",
          fontFamily: "Amazon Ember, Arial, sans-serif",
          padding: 2
        }}><strong>{!categoryDetailLoading && categoryDetail?.categoryNames["en"]}</strong></Typography>
        <Divider />
        <Grid my={3} px={1} container >
          {!categoryListLoading && categoryList && categoryList?.map((category, index) => {
            return (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CategoryCard key={index} categoryId={category.categoryId} categoryName={category.categoryNames["en"]} mediaPath={category.categoryMedias[0].mediaPath} />
              </Grid>
            )
          })
          }
        </Grid>
        {loading ?
          (Array.from({ length: 8 }).map((_, i) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={i}>
              <Skeleton variant="rectangular" height={400} />
            </Grid>
          )))
          :
          (
              searchList.length > 0 &&
                (
                  <Box px={1}>
                    <Divider />
                    <Typography sx={{
                      fontSize: "clamp(0.7rem, 1.5vw, 1.9rem)",
                      flexWrap: "wrap",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      textOverflow: "ellipsis",
                      fontFamily: "Amazon Ember, Arial, sans-serif",
                      padding: 2
                    }}><strong>Items</strong></Typography>
                    <Grid size={{ xs: 12, sm: 12, md: 9.5 }} container spacing={1}>

                      {searchList.map((item, index) => (
                        <Grid key={index} size={{ xs: 4, sm: 2, md: 2 }} sx={{ minWidth: 0 }}>
                          <SearchedItem borderRadius={2} itemDetail={item} />
                        </Grid>
                      ))}

                    </Grid>
                  </Box>
                )
          )
        }
        <Divider />
        <Typography sx={{
          fontSize: "clamp(0.7rem, 1.5vw, 1.9rem)",
          flexWrap: "wrap",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          textOverflow: "ellipsis",
          fontFamily: "Amazon Ember, Arial, sans-serif",
          padding: 2
        }}><strong>Category Description</strong></Typography>
        <Divider />
        <Box my={3} px={2}>
          {!categoryDetailLoading && categoryDetail?.categoryDescriptions['en'].map((element, index) => {
            return (
              <Box
                key={index}
                dangerouslySetInnerHTML={{ __html: element }}
              />
            );
          })}
        </Box>
      </Paper >
    </Box>
  );
}