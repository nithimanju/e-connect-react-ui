import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiCall from "../HTTPRequest";
import { AppBar, Box, Divider, Paper, Tabs, Tab, Typography, Grid, Skeleton } from "@mui/material";
import CategoryCard from "../category/CategoryCard";
import InfiniteScroll from "react-infinite-scroll-component";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
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
    const { brandDescValue, brandCategoryValue, brandListValue, setBrandDescValue, setBrandCategoryValue, setBrandListValue, brandList, brandDetail, brandCategories, value, handleChange } = props;
    useEffect(() => {
        var listValue = 0;
        var categoryValue = 0;
        if (brandDetail) {
            categoryValue += 1;
            listValue += 1;
        }
        if (brandCategories) {
            listValue += 1;
        }
        setBrandCategoryValue(categoryValue);
        setBrandListValue(listValue);
    }, [brandList, brandDetail, brandCategories])
    return (
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            aria-label="full width tabs example"
        >
            {brandDetail && <Tab label="Detail" id={brandDescValue} />}
            {brandCategories && brandCategories.length > 0 && <Tab label="Categories" id={brandCategoryValue} />}
            {brandList && brandList.length > 0 && <Tab label="Sub-Brands" id={brandListValue} />}
        </Tabs>
    );
}

export default function BrandDetailPage() {
    const [searchParams] = useSearchParams();
    const [brandList, setBrandList] = useState([]);
    const [brandDetail, setBrandDetail] = useState(null);
    const [brandDetailLoading, setBrandDetailLoading] = useState(true);
    const [brandCategories, setBrandCategories] = useState(null);
    const [brandListLoading, setBrandListLoading] = useState(true);
    const queryBrandId = searchParams.get('brandId') ? searchParams.get('brandId') : 0;
    const [brandFrom, setBrandFrom] = useState(0);
    const [totalMaxPages, setTotalMaxPages] = useState(0);
    const [value, setValue] = useState(0);
    const [brandDescValue, setBrandDescValue] = useState(0);
    const [brandCategoryValue, setBrandCategoryValue] = useState(0);
    const [brandListValue, setBrandListValue] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchBrandList = async () => {
        let data = await apiCall(`/part-service/sub-brands/parent-id?brandId=${queryBrandId}&from=${brandFrom}&size=8`);
        if (data) {
            if (data.length > 0) {
                setBrandList(prev => [...prev, ...JSON.parse(data)]);
                setBrandFrom(prev => prev + 1);
                setHasMore(true);
            } else {
                setHasMore(false);
            }
        } else {
            setHasMore(false);
        }
        setBrandListLoading(false);
    };

    useEffect(() => {
        async function fetchBrandDetail() {
            let data = await apiCall(`/part-service/brand-detail/${queryBrandId}`);
            if (data) {
                let detail = JSON.parse(data);
                setBrandDetail(detail);
                if (detail.categories) {
                    setBrandCategories(detail.categories);
                }
            } else {
                setBrandDetail(null);
                setBrandCategories(null);
            }
            setBrandDetailLoading(false);
        };
        setBrandFrom(0);
        setBrandList([]);
        fetchBrandList();
        if (queryBrandId && queryBrandId !== 0) {
            fetchBrandDetail();
        } else {
            setBrandDetail(null);
            setBrandCategories(null);
        }
    }, [queryBrandId]);

    return (
        <>
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
                    }}><strong>{!brandDetailLoading && brandDetail ? brandDetail.brandTitles["en"] : 'Brands'}</strong></Typography>
                    <Divider />
                    <AppBar position="static" sx={{ backgroundColor: 'inherit' }}>
                        <DisplayTabs brandDescValue={brandDescValue} brandCategoryValue={brandCategoryValue} brandListValue={brandListValue} setBrandDescValue={setBrandDescValue} setBrandCategoryValue={setBrandCategoryValue} setBrandListValue={setBrandListValue} brandList={brandList} brandDetail={brandDetail} brandCategories={brandCategories} value={value} handleChange={handleChange} />
                    </AppBar>
                    {brandDetail &&
                        <TabPanel value={value} index={brandDescValue}>
                            {brandDetail.brandDescriptions?.['en']?.map((element, index) => {
                                return (
                                    <Box
                                        key={index}
                                        dangerouslySetInnerHTML={{ __html: element }}
                                    />
                                );
                            })}
                        </TabPanel>}
                    {brandCategories &&
                        <TabPanel value={value} index={brandCategoryValue}>
                            <Grid my={3} px={1} container >
                                {brandCategories?.map((category, index) => {
                                    return (
                                        <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }} p={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <CategoryCard name={category.categoryNames["en"]} mediaPath={category.categoryMedias[0].mediaPath} to={`/category-detail?categoryId=${category.categoryId}&brandIds=${queryBrandId}`} />
                                        </Grid>
                                    )
                                })
                                }
                            </Grid>
                        </TabPanel>
                    }
                    {!brandListLoading && brandList && brandList.length > 0 &&
                        <TabPanel value={value} index={brandListValue}>
                            <InfiniteScroll
                                dataLength={brandList.length}
                                next={fetchBrandList}
                                hasMore={hasMore}
                                loader={(Array.from({ length: 8 }).map((_, i) => (
                                    <>
                                        <Skeleton style={{ marginBottom: "4px" }} variant="rectangular" height={50} />
                                        <Divider />
                                    </>
                                )))}
                            ><Grid my={3} px={1} container >
                                    {brandList.map((brand, index) =>
                                        <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }} p={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <CategoryCard name={brand.brandTitles["en"]} mediaPath={brand.medias[0]?.mediaPath} to={`/brand-details?brandId=${brand.brandId}`} />
                                        </Grid>
                                    )}</Grid>
                            </InfiniteScroll>

                        </TabPanel>
                    }
                </Paper>
            </Box>
        </>
    );
}