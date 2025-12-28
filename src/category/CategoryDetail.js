import { AppBar, Box, Divider, Grid, Paper, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import apiCall from "../HTTPRequest";
import { useSearchParams } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import SearchedItem from "../search/SearchedItem";
import InfiniteScroll from "react-infinite-scroll-component";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-panel-category-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>{children}</Box>
      )}
    </div>
  );
}

function DisplayTabs(props) {
  const { categoryDescValue, categoryListValue, categoryItemValue, setCategoryDescValue, setCategoryListValue, setCategoryItemValue, categoryList, categoryDetail, searchList, value, handleChange } = props;
  useEffect(() => {
    var itemlistValue = 0;
    var categoryListValue = 0;
    if (categoryList && categoryList.length > 0) {
      categoryListValue += 1;
      itemlistValue += 1;
    }
    if (searchList && searchList.length > 0) {
      itemlistValue += 1;
    }
    setCategoryListValue(categoryListValue);
    setCategoryItemValue(itemlistValue);
  }, [categoryList, categoryDetail, searchList])
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="secondary"
      textColor="secondary"
      variant="fullWidth"
      aria-label="full width tabs example"
    >
      {categoryDetail && <Tab label="Detail" id={categoryDescValue} />}
      {categoryList && categoryList.length > 0 && <Tab label="Sub-Categories" id={categoryListValue} />}
      {searchList && searchList.length > 0 && <Tab label="Items" id={categoryItemValue} />}
    </Tabs>
  );
}

export default function CategoryDetail(props) {
  const [searchParams] = useSearchParams();
  const queryCategoryId = searchParams.get('categoryId');
  const brandIds = searchParams.get('brandIds');
  const [categoryDetail, setCategoryDetail] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryDetailLoading, setCategoryDetailLoading] = useState(true);
  const [categoryListLoading, setCategoryListLoading] = useState(true);
  const [searchList, setSearchList] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [searchFilters, setSearchFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [categoryDescValue, setCategoryDescValue] = useState(0);
  const [categoryListValue, setCategoryListValue] = useState(0);
  const [categoryItemValue, setCategoryItemValue] = useState(0);
  const [hasMoreCategories, setHasMoreCategories] = useState(false);
  const [categoryFrom, setCategoryFrom] = useState(0);

  const fetchChildCategoryList = async () => {
    let data = await apiCall(`part-service/child-hierarchy/parent-id?categoryId=${queryCategoryId}&from=${categoryFrom}&size=8`);
    if (data) {
      if (data.length > 0) {
        setCategoryList(prev => [...prev, ...JSON.parse(data)]);
        setCategoryFrom(prev => prev + 1);
        setHasMoreCategories(true);
      } else {
        setHasMoreCategories(false);
      }
    } else {
      setHasMoreCategories(false);
    }
    setCategoryListLoading(false);
  };

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

    async function fetchData() {
      let url = "search/api/item/v1/list";

      const dataToSend = {
        languageCode: "en",
        from: 0,
        size: 20,
        categoryIds: queryCategoryId ? [queryCategoryId] : [],
        brandIds: brandIds ? [brandIds] : []
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
    if (queryCategoryId && queryCategoryId !== 0) {
      fetchCategoryDetail();
    }
    setCategoryFrom(0);
    setCategoryList([]);
    fetchChildCategoryList();
    fetchData();
  }, [queryCategoryId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <AppBar position="static" sx={{ backgroundColor: 'inherit' }}>
          <DisplayTabs categoryDescValue={categoryDescValue} categoryListValue={categoryListValue} categoryItemValue={categoryItemValue} setCategoryDescValue={setCategoryDescValue} setCategoryListValue={setCategoryListValue} setCategoryItemValue={setCategoryItemValue} categoryList={categoryList} categoryDetail={categoryDetail} searchList={searchList} value={value} handleChange={handleChange} />
        </AppBar>
        {!categoryListLoading && categoryList && categoryList.length > 0 &&
          <TabPanel value={value} index={categoryListValue}>
            <InfiniteScroll
              dataLength={categoryList.length}
              next={fetchChildCategoryList}
              hasMore={hasMoreCategories}
              loader={(Array.from({ length: 8 }).map((_, i) => (
                <>
                  <Skeleton key={i} style={{ marginBottom: "4px" }} variant="rectangular" height={50} />
                  <Divider />
                </>
              )))}
            >
              <Grid my={3} px={1} container >
                {categoryList?.map((category, index) => {
                  return (
                    <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }} p={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <CategoryCard name={category.categoryNames["en"]} mediaPath={category.categoryMedias[0].mediaPath} to={`/category-detail?categoryId=${category.categoryId}&brandIds=${brandIds}`} />
                    </Grid>
                  )
                })
                }
              </Grid>
            </InfiniteScroll>
          </TabPanel>
        }
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

        {categoryDetail &&
          <TabPanel value={value} index={categoryDescValue}>
            {categoryDetail.categoryDescriptions?.['en']?.map((element, index) => {
              return (
                <Box
                  key={index}
                  dangerouslySetInnerHTML={{ __html: element }}
                />
              );
            })}
          </TabPanel>}
      </Paper >
    </Box>
  );
}