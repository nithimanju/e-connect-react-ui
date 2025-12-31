import { useRef, useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import apiCall from "./HTTPRequest";
import { useNavigate } from "react-router-dom";

export default function BannerCarousel() {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [promotions, setPromotions] = useState([]);
  const navigate = useNavigate();
  const nextSlide = () => {
    const newIndex = (index + 1) % promotions?.length;
    setIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (index - 1 + promotions?.length) % promotions?.length;
    setIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollToIndex = (i) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.offsetWidth * i,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    async function fetchPromotions() {
      const promotionType = 'home';
      const data = await apiCall(`part-service/promotion/get?promotionType=${promotionType}&languageId=1`);
      if (data) {
        const responses = JSON.parse(data);
        if (responses && responses.length > 0) {
          setPromotions(responses);
        }
      }
    };
    setPromotions([]);
    fetchPromotions();
  }, []);

  return (
    <>
      <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>

        <Box
          ref={containerRef}
          sx={{
            display: "flex",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          {promotions.map((promotion, idx) => (
              <Box
		key={idx}
                component="img"
		onClick={() => navigate(promotion.promotionPath)}
                src={promotion.mediaPath}
                alt={promotion.promotionName}
                sx={{
                  width: "100%",
                  height: { xs: 200, md: 250, lg: 300 },
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
          ))}
        </Box>

        <IconButton
          onClick={prevSlide}
          sx={{
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.4)",
            color: "#fff",
            "&:hover": { background: "rgba(0,0,0,0.6)" },
          }}
        >
          <ArrowBackIos />
        </IconButton>

        <IconButton
          onClick={nextSlide}
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.4)",
            color: "#fff",
            "&:hover": { background: "rgba(0,0,0,0.6)" },
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </>
  );
}
