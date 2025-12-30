import InfiniteScroll from "react-infinite-scroll-component";
import SearchedItem from "./SearchedItem";
import { Divider, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import apiCall from "../HTTPRequest";

export default function ScrollableSearchItem(props) {

    const { searchQuery, searchList, setSearchList, searchCount, setSearchCount, queryCategoryId, brandIds, selectedFilterMap, setSearchFilters, setLoading } = props;
    const [hasMoreItems, setHasMoreItems] = useState(false);
    const [itemFrom, setItemFrom] = useState(0);
    const fetchItemList = async () => {
        let url = "search/api/item/v1/list";

        const dataToSend = {
            queryString: searchQuery ? searchQuery : "",
            languageCode: "en",
            from: itemFrom,
            size: 20,
            categoryIds: queryCategoryId ? [queryCategoryId] : [],
            brandIds: brandIds && brandIds !== 'null' ? [brandIds] : [],
            filterValues: Object.fromEntries(selectedFilterMap)
        };

        const data = await apiCall(url, 'POST', JSON.stringify(dataToSend));
        if (data) {
            const dataResponse = JSON.parse(data);
            if (dataResponse.itemSearchResponses.length > 0) {
                setSearchList(prev => [...prev, ...dataResponse.itemSearchResponses]);
                setSearchCount(prev => prev + dataResponse.count);
                setItemFrom(prev => prev + 20);
                setHasMoreItems(true);
                setSearchFilters(dataResponse.itemSearchFilterResponses);
            } else {
                setHasMoreItems(false);
            }
        } else {
            setHasMoreItems(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        setSearchList([]);
        setItemFrom(0);
        setSearchFilters([]);
        setHasMoreItems(true);
        fetchItemList();
    }, [searchQuery, selectedFilterMap, queryCategoryId, brandIds]);
    return (
        <InfiniteScroll
            style={{maxWidth:"100%", overflowX:'hidden'}}
            dataLength={searchList.length}
            next={fetchItemList}
            hasMore={hasMoreItems}
            loader={(
                <Grid size={{ xs: 12, sm: 12, md: 9.5 }} container spacing={2}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <>
                            <Skeleton key={i} style={{ marginBottom: "4px" }} variant="rectangular" height={50} />
                            <Divider />
                        </>
                    ))}
                </Grid>)}
        ><Grid size={12} container spacing={1}>
                {searchList.map((item, index) => (
                    <Grid key={index} size={{ xs: 4, sm: 3, md: 3 }} sx={{ minWidth: 0 }}>
                        <SearchedItem borderRadius={2} itemDetail={item} />
                    </Grid>
                ))}</Grid>
        </InfiniteScroll>);
}