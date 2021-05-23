import { Container, Flex, Text } from "@chakra-ui/layout";
import axios from "../../config/axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Table, Tbody, Td, Tfoot, Thead, Tr } from "@chakra-ui/table";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../features/Product/ProductsSlice";

function InventoryMovement() {
  const params = useParams();
  const history = useHistory();
  const [movement, setMovement] = useState([]);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const res = await axios.get("/product?productId=" + params.id);
    setProducts(res.data.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);
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
                <Td>InvNo.</Td>
                <Td>สินค้า</Td>
                <Td>ลูกค้า/รายละเอียด</Td>
                <Td isNumeric>ราคาต่อหน่วย</Td>
                <Td isNumeric>จำนวน</Td>
                <Td isNumeric>รวม</Td>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product, index) =>
                product.ProductMovements.map((movement, index) =>
                  !movement.Planting &&
                  movement.OrderItem.Order.status === "cancelled" ? (
                    <Tr
                      _hover={{ cursor: "pointer", bg: "gray.200" }}
                      color="red"
                      onClick={() => {
                        history.push("/order/" + movement.OrderItem.Order.id);
                      }}
                    >
                      <Td>{movement.OrderItem.Order.date.slice(0, 10)}</Td>
                      <Td>{movement.OrderItem.Order.invNo}</Td>
                      <Td>{product.name}</Td>
                      <Td>{movement.OrderItem.Order.name}</Td>
                      <Td isNumeric></Td>
                      <Td isNumeric>ยกเลิก</Td>
                      <Td isNumeric></Td>
                    </Tr>
                  ) : !movement.Planting ? (
                    <Tr
                      _hover={{ cursor: "pointer", bg: "gray.200" }}
                      onClick={() => {
                        history.push("/order/" + movement.OrderItem.Order.id);
                      }}
                    >
                      <Td>{movement.OrderItem.Order.date.slice(0, 10)}</Td>
                      <Td>{movement.OrderItem.Order.invNo}</Td>
                      <Td>{product.name}</Td>
                      <Td>{movement.OrderItem.Order.name}</Td>
                      <Td isNumeric>{+movement.price}</Td>
                      <Td isNumeric>{+movement.quantity}</Td>
                      <Td isNumeric>
                        {movement.price * movement.quantity * -1}
                      </Td>
                    </Tr>
                  ) : (
                    <Tr
                      _hover={{ cursor: "pointer", bg: "gray.200" }}
                      onClick={() => {
                        history.push("/planting/" + movement.Planting.id);
                      }}
                    >
                      <Td>{movement.Planting.harvestDate.slice(0, 10)}</Td>
                      <Td>การปลูกที่ {movement.Planting.id}</Td>
                      <Td>{product.name}</Td>
                      <Td>รับมาจาก {movement.Planting.Farm.name}</Td>
                      <Td isNumeric>{+movement.price}</Td>
                      <Td isNumeric>{+movement.quantity}</Td>
                      <Td isNumeric>
                        {movement.price * movement.quantity * -1}
                      </Td>
                    </Tr>
                  )
                )
              )}
              {/* {movement.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.Order.date.slice(0, 10)}</Td>
                  <Td>{item.Order.invNo}</Td>
                  <Td>
                    {
                      products.find((product) => product.id === item.productId)
                        .name
                    }
                  </Td>
                  <Td>{item.Order.name}</Td>
                  <Td isNumeric>{+item.quantity}</Td>
                  <Td isNumeric>{+item.price}</Td>
                  <Td isNumeric>{+item.price * item.quantity}</Td>
                </Tr>
              ))} */}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td isNumeric fontWeight="semibold">
                  รวม
                </Td>
                <Td isNumeric fontWeight="semibold">
                  {products.reduce(
                    (total, { ProductMovements }) =>
                      (total += ProductMovements.reduce(
                        (acc, { quantity, OrderItem }) =>
                          OrderItem && OrderItem.Order.status === "cancelled"
                            ? acc
                            : (acc += +quantity),
                        0
                      )),
                    0
                  )}
                </Td>
                <Td isNumeric fontWeight="semibold">
                  {products.reduce(
                    (total, { ProductMovements }) =>
                      (total += ProductMovements.reduce(
                        (acc, { price, quantity, OrderItem }) =>
                          OrderItem && OrderItem.Order.status === "cancelled"
                            ? acc
                            : (acc += price * quantity * -1),
                        0
                      )),
                    0
                  )}
                </Td>
              </Tr>
            </Tfoot>
          </Table>
        </Container>
      </Flex>
    </div>
  );
}

export default InventoryMovement;
