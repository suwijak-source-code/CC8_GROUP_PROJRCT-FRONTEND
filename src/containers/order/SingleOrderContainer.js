import { Box, Container, Flex, Spacer, Text } from "@chakra-ui/layout";
import axios from "../../config/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Table,
  Tbody,
  Tfoot,
  Th,
  Tr,
  Thead,
  Button,
  Input,
} from "@chakra-ui/react";

function SingleOrderContainer() {
  const params = useParams();
  const [order, setOrder] = useState({ OrderItems: [] });
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get("/order/" + params.id);
        setOrder(res.data.order);
        setEmail(res.data.order.Customer.CustomerAddresses[0].email);
      } catch (err) {
        console.dir(err);
      }
    };
    fetchOrder();
  }, []);

  const handleCancelButton = async () => {
    try {
      console.log(order);
      const res = await axios.put("/order/" + params.id, {
        ...order,
        status: "cancelled",
      });
      setOrder({
        ...order,
        status: "cancelled",
      });
    } catch (err) {
      console.dir(err);
    }
  };
  const handleReactivateButton = async () => {
    try {
      console.log(order);
      const res = await axios.put("/order/" + params.id, {
        ...order,
        status: "waiting for payment",
      });
      setOrder({
        ...order,
        status: "waiting for payment",
      });
    } catch (err) {
      console.dir(err);
    }
  };
  return (
    <div>
      <Flex justify="center">
        <Container
          maxW="container.md"
          minH="500"
          border="1px solid black"
          m={3}
          p={3}
        >
          <Flex>
            {order.address && (
              <Flex direction="column" fontSize="sm" w="55%">
                <Text fontWeight="semibold">{order.name}</Text>
                <Text>{order.address.split("\n")[0]}</Text>
                <Text>{order.address.split("\n")[1]}</Text>
                <Text>{order.address.split("\n")[2]}</Text>
                <Text>{order.address.split("\n")[3]}</Text>
                <Text>โทร: {order.phone}</Text>
              </Flex>
            )}
            <Spacer />
            <Flex direction="column" fontSize="sm" w="45%">
              <Text>ใบกำกับภาษี</Text>
              <Text>เลขที่: {order.invNo}</Text>
              <Text>วันที่: {order.date && order.date.slice(0, 10)}</Text>
            </Flex>
          </Flex>
          <Flex justify="center">
            <Container
              maxW="container.md"
              minH="250"
              border="1px solid black"
              m={1}
              p={1}
            >
              <Table size="sm" variant="simple">
                <Thead>
                  <Tr>
                    <Th>ที่</Th>
                    <Th>ชื่อสินค้า</Th>
                    <Th isNumeric>จำนวน</Th>
                    <Th isNumeric>ราคาต่อหน่วย</Th>
                    <Th isNumeric>รวม</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {order.OrderItems.map((orderItem, index) => (
                    <Tr key={index}>
                      <Th>{index + 1}</Th>
                      <Th>{orderItem.Product.name}</Th>
                      <Th isNumeric>{+orderItem.quantity}</Th>
                      <Th isNumeric>{+orderItem.price}</Th>
                      <Th isNumeric>{orderItem.quantity * orderItem.price}</Th>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                    <Th isNumeric>รวมทั้งหมด</Th>
                    <Th isNumeric>
                      {order.OrderItems.reduce(
                        (acc, orderItem) =>
                          (acc += orderItem.price * orderItem.quantity),
                        0
                      )}
                    </Th>
                  </Tr>
                </Tfoot>
              </Table>
              {order.status === "cancelled" && (
                <Text
                  as="h2"
                  color="red"
                  fontSize="4xl"
                  fontWeight="bold"
                  textAlign="center"
                >
                  ยกเลิก
                </Text>
              )}
            </Container>
          </Flex>
          <Flex justify="center" align="baseline">
            <Text as="label" for="email" m={1}>
              Email:
            </Text>
            <Input
              size="sm"
              w="50%"
              id="email"
              m={1}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </Flex>
          <Flex justify="center">
            {order.status !== "cancelled" && (
              <Button m={1}>ส่งใบกำกับภาษี</Button>
            )}
            {order.status !== "cancelled" && (
              <Button m={1} variant="outline" onClick={handleCancelButton}>
                ยกเลิกรายการ
              </Button>
            )}
            {order.status === "cancelled" && (
              <Button m={1} onClick={handleReactivateButton}>
                ทำรายการอีกครั้ง
              </Button>
            )}
          </Flex>
        </Container>
      </Flex>
    </div>
  );
}

export default SingleOrderContainer;
