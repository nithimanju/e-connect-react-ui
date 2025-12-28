import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CategoryCard(props) {
    const categoryId = props.categoryId;
    const categoryName = props.categoryName;
    const categoryMediaPath = props.mediaPath;

    return (
        <Paper sx={{ padding: "0px", borderRadius: "3px", borderStyle: "solid", borderWidth: "0.1px", borderColor: "black", minWidth: "0px", maxWidth: "100%", minHeight: "0px", maxHeight: "100%" }}>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/category-detail?categoryId=${categoryId}`}>
                <Box>
                    <img src={categoryMediaPath} style={{ objectFit: "contain", minHeight: "80px", height: "20vw", maxHeight: "270px", width: "clamp(20rem, 5.0vw, 45rem)", minWidth: "0px", maxWidth: "100%" }} />
                </Box>
                <Box mt={2} sx={{ textAlign: "center" }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                        }}
                    >
                        {categoryName}
                    </Typography>
                </Box>
            </Link>

        </Paper>
    );
}