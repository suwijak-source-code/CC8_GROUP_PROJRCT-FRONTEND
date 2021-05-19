import { Container, Flex, Text } from "@chakra-ui/layout";
import axios from "../../config/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Table, Tbody, Td, Thead, Tr } from "@chakra-ui/table";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../features/Product/ProductsSlice";

function InventoryMovement() {
  const params = useParams();
  const [movement, setMovement] = useState([]);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const res = await axios.get("/product");
    dispatch(setProducts(res.data.products));
  };
  useEffect(() => {
    const fetchMovement = async () => {
      const res = await axios.get("/orderitem/?productId=" + (params.id || ""));
      setMovement(res.data.orderItems);
    };
    fetchMovement();
    fetchProducts();
  }, []);
  console.log(movement);
  return (
    <div>
      <Flex align="center" direction="column">
        <Container maxW="container.md">
          <Text as="h2" fontSize="2xl" fontWeight="semibold">
            รายการเคลื่อนไหวสินค้าคงเหลือ
          </Text>
        </Container>
        <Container maxW="container.md" border="1px solid black" m={2} p={2}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Td>วันที่</Td>
                <Td>สินค้า</Td>
                <Td>ลูกค้า</Td>
                <Td isNumeric>จำนวน</Td>
                <Td isNumeric>ราคาต่อหน่วย</Td>
                <Td isNumeric>รวม</Td>
              </Tr>
            </Thead>
            <Tbody>
              {movement.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.Order.date.slice(0, 10)}</Td>
                  <Td>
                    {products[item.productId] && products[item.productId].name}
                  </Td>
                  <Td>{item.Order.name}</Td>
                  <Td isNumeric>{+item.quantity}</Td>
                  <Td isNumeric>{+item.price}</Td>
                  <Td isNumeric>{+item.price * item.quantity}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Container>
      </Flex>
    </div>
  );
}

export default InventoryMovement;
