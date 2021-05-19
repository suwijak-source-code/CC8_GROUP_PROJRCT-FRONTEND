import HomeComponent from "../../components/home/home";
import PictureCardComponent from "../../components/home/pictureCard";
import CardBox from "../../components/home/cardBox";
import { Box, Flex } from "@chakra-ui/layout";

const HomeContainer = () => {
  return (
    <Box>
      <HomeComponent />
      <PictureCardComponent />
      <Box d="flex" justifyContent="center">
        <CardBox />
        <CardBox />
        <CardBox />
      </Box>
    </Box>
  );
};

export default HomeContainer;
