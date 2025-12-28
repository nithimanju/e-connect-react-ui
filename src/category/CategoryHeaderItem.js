import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router";

export default function CategoryHeaderItem(props) {
  const [categoryname, setCategoryName] = useState(props.categoryName);
  const [categoryId, setCategoryId] = useState(props.categoryId);

  return (
    <Paper sx={{ backgroundColor: "inherit", minWidth: 0 }}>
      <Link to={`/category-detail?categoryId=${categoryId}`} style={{ backgroundColor: "inherit", border: "0", minWidth: 0, padding: 0 }}>
        <Typography sx={{
          color: "white",
          minWidth: 0,
          fontSize: "clamp(0.5rem, 1.2vw, 0.8rem)",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          wordBreak: "break-word"
        }}>{props.categoryName}</Typography>
      </Link>
    </Paper>
  );
}