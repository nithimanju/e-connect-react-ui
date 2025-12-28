import { CurrencyRupee } from "@mui/icons-material";
import { Grid, Stack, Typography } from "@mui/material";

export default function CartSummaryPriceComponent(props) {
  const title = props.title;
  const price = props.price;
  return (
    <>
      <Grid size={6}>
        <Typography sx={{
          fontSize: "clamp(0.5rem, 1.3vw, 1.0rem)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }} variant="subtitle1">{title}</Typography>
      </Grid>
      <Grid size={6}>
        <Stack direction="row" spacing={0.1} sx={{ textAlign: 'right', justifyContent: 'flex-end' }}>
          <CurrencyRupee sx={{ fontSize: "clamp(10px, 2vw, 15px)" }} />
          <Typography sx={{
            fontSize: "clamp(10px, 1.7vw, 25px)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }} variant="h5">{price}</Typography>
        </Stack>
      </Grid>
      </>
  );
}