import { Box, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import './PictureCard.css'

function PictureSlide() {
  const [data, setData] = useState([
    { id: 1, img: "img/farmland1.jpg" },
    { id: 2, img: "img/farmland2.jpg" },
    { id: 3, img: "img/farmland3.jpg" }
  ])
  const [slide, setSlide] = useState({
    id: 1, img: "img/farmland1.jpg"
  });
  const timeSlide = () => {
    if (slide.id === data.length) {
      const tmp = data.find((value) => value.id === 1);
      setSlide(tmp);
    } else {
      const tmp = data.find((value) => value.id === slide.id + 1);
      setSlide(tmp);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => timeSlide(), 5000);
    return () => {
      clearInterval(interval)
    }
  }, [slide])

  const handlePrevious = (e) => {
    e.preventDefault();
    if (slide.id !== 1) {
      const { id, img } = data.find((value) => value.id === (slide.id - 1));
      setSlide({ ...slide, id, img });
    } else {
      setSlide(slide);
    }
  }

  const handleNext = (e) => {
    e.preventDefault();
    if (slide.id < data.length) {
      const { id, img } = data.find((value) => value.id === (slide.id + 1));
      setSlide({ ...slide, id, img });
    } else {
      setSlide(slide);
    }
  }

  const handleChange = (e, item) => {
    e.preventDefault();
    const { id, img } = data.find((value) => value.id === item);
    setSlide({ ...slide, id, img });
  }

  return (
    <Box textAlign="center">
      <Box h="500px" w="100%" p="4">
        <Image boxShadow="0 0 20px rgba(0,0,0,0.4)" w="100%" borderRadius="10" src={slide.img} alt="picture" />
        <Box as="span" className='previous' onClick={handlePrevious}>&#10094;</Box>
        <Box as="span" className='next' onClick={handleNext}>&#10095;</Box>
      </Box>
      <Box className="box-dot">
        {data.map((value, index) => <Box as="span" key={index} className="dot" onClick={(e) => handleChange(e, value.id)}></Box>)}
      </Box>
    </Box>
  )
}

export default PictureSlide;
