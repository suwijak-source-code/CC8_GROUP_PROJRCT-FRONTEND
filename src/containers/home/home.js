import HomeComponent from "../../components/home/home";
import PictureCardComponent from "../../components/home/pictureCard/PictureCard";
import CardBox from "../../components/home/cardBox";
import { Box, Flex } from "@chakra-ui/layout";

const HomeContainer = () => {
  return (
    <Box>
      {/* <Box my="2">
        <HomeComponent />
      </Box> */}
      <Box mt="10" mb="10">
        <PictureCardComponent />
      </Box>
      {/* <Box d="flex" justifyContent="center">
        <CardBox />
        <CardBox />
        <CardBox />
      </Box> */}
      <Box my="10">
        <hr />
      </Box>
    </Box>
  );
};

export default HomeContainer;
