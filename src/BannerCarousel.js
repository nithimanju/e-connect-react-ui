import React, { useRef, useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const images = [
  "https://c8.alamy.com/comp/HJDWB6/famous-indian-city-road-landmark-chowringhee-dharamtala-crossing-kolkata-HJDWB6.jpg",  // slide 1
  "https://media.istockphoto.com/id/1382384282/photo/bangalore-or-bengaluru.jpg?s=612x612&w=0&k=20&c=6pxwL3JxNV2B_NZSLMZLhrSLqAbyCPlGuSZYKImpjKQ=",  // slide 2
  "https://www.shutterstock.com/image-photo/view-mumbai-showing-bandra-worli-260nw-1493970836.jpg",  // slide 3
];

export default function BannerCarousel() {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = (index + 1) % images.length;
    setIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (index - 1 + images.length) % images.length;
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
          {images.map((src, idx) => (
            <Box
              key={idx}
              component="img"
              src={src}
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
