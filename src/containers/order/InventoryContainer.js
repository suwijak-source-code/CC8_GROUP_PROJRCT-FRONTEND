import { Container, Flex, Text } from "@chakra-ui/layout";
import React from "react";

function InventoryContainer() {
  return (
    <div>
      <Flex align="center" direction="column">
        <Container maxW="container.md">
          <Text as="h2" fontWeight="semibold" fontSize="2xl">
            ระบบจัดการสินค้าคงคลัง
          </Text>
        </Container>
        <Container
          maxW="container.md"
          minH="280"
          border="1px solid black"
          m={3}
          p={3}
        ></Container>
      </Flex>
    </div>
  );
}

export default InventoryContainer;
