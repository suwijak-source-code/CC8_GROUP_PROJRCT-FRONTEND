import { Container, Flex, Text } from "@chakra-ui/layout";
import axios from "../../config/axios";
import React, { useEffect, useState } from "react";
import { Button, Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../features/Product/ProductsSlice";

function InventoryContainer() {
  const history = useHistory();
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/product/");
      dispatch(setProducts(res.data.products));
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Flex align="center" direction="column">
        <Container maxW="container.md">
          <Text as="h2" fontWeight="semibold" fontSize="2xl">
            ระบบจัดการสินค้าคงคลัง
          </Text>
          <Text as="h3" fontSize="lg">
            รายการสินค้า
          </Text>
        </Container>
        <Container
          maxW="container.md"
          minH="280"
          border="1px solid black"
          m={1}
          p={1}
        >
          <Container maxW="container.md" p={2}>
            <Button
              size="xs"
              mb={2}
              onClick={() => history.push("/product/create")}
            >
              + เพิ่มสินค้า
            </Button>
          </Container>
          <Flex align="center" direction="column">
            <Container p={2} maxW="container.md">
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Td>รหัส</Td>
                    <Td>ชื่อ</Td>
                    <Td isNumeric>ราคา</Td>
                    <Td isNumeric>จำนวนคงเหลือ</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((item, index) => (
                    <Tr
                      key={index}
                      _hover={{ cursor: "pointer", bg: "muted.300" }}
                    >
                      <Td>{item.id}</Td>
                      <Td>{item.name}</Td>
                      <Td isNumeric>{item.price}</Td>
                      <Td isNumeric>xxx</Td>
                      <Td m="1" p="1">
                        <Text
                          onClick={() =>
                            history.push("/product/edit/" + item.id)
                          }
                        >
                          แก้ไข
                        </Text>
                      </Td>
                      <Td m="1" p="1">
                        <Text
                          onClick={() => history.push("/movement/" + item.id)}
                        >
                          ประวัติ
                        </Text>
                        {/* <ChevronDownIcon /> */}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Container>
          </Flex>
        </Container>
      </Flex>
    </div>
  );
}

export default InventoryContainer;
