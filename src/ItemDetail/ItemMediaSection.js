import { Box, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";

export default function ItemMediaSection(props) {
  const mediaPaths = props.mediaPaths;
  const [highLightMedia, setHighLightMedia] = useState({});
  console.log("Came to Item Media");
  useEffect(() => {
    if(mediaPaths) {
      setHighLightMedia(mediaPaths[0].mediaPath);
    }
  });
  return (<>
  {mediaPaths? (
    <Grid container spacing={2}>

      <Grid size={{ xs: 2, md: 3 }}>
        <Stack spacing={1}>
          {mediaPaths.map((img, index) => (
            <img key={index} src={img?.mediaPath} style={{ objectFit: "contain", maxHeight: "100%", minHeight: "0px", minWidth: "0px", maxWidth: "100%", borderRadius: 8 }} />
          ))}
        </Stack>
      </Grid>

      <Grid size={{ xs: 10, md: 9 }}>
        <Box sx={{ textAlign: "center" }}>
          <img
            src={highLightMedia}
            style={{
              height: "auto",
              maxHeight: "450px",
              objectFit: "contain",
              minWidth: "0px",
              maxWidth: "100%"
            }}
          />
        </Box>
      </Grid>

    </Grid>
  ) : (<></>)}
  </>);
}