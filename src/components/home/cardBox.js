import { Box, Image } from "@chakra-ui/react";

function CardBox() {
  const imageBox = {
    imageUrl: "https://picsum.photos/400/400",
    imageAlt: "Rear view of modern home with pool",
  };
  return (
    <>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        m="15px"
      >
        <Image src={imageBox.imageUrl} alt={imageBox.imageAlt} />
      </Box>
    </>
  );
}

export default CardBox;
