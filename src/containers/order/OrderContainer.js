import { Box, Container, Flex, Grid, Text } from "@chakra-ui/layout";
import axios from "../../config/axios";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router";
import { setOrders } from "../../features/Order/OrderListsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Tfoot, Th, Tr, Thead, Button } from "@chakra-ui/react";

function OrderContainer() {
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPages] = useState([1]);
  const history = useHistory();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderLists.orders);
  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axios.get("/order");
      dispatch(setOrders(res.data.orders));
      const newPages = [];
      for (let i = 1; i <= Math.floor(res.data.orders.length / 10) + 1; i++) {
        newPages.push(i);
      }
      setTotalPages(newPages);
    };
    fetchOrder();
  }, []);
  const handleDropDown = (id) => {
    const newOrders = orders.map((order) =>
      order.id === id ? { ...order, dropDown: true } : { ...order }
    );
    dispatch(setOrders(newOrders));
  };
  const handleHideDropDown = (id) => {
    const newOrders = orders.map((order) =>
      order.id === id ? { ...order, dropDown: false } : { ...order }
    );
    dispatch(setOrders(newOrders));
  };
  return (
    <Box mt="3">
      <Flex align="center" direction="column">
        <Container maxW="container.md">
          <Flex>
            <Button
              size="xs"
              mx={2}
              onClick={() => {
                history.push("/order/create");
              }}
            >
              + รายการขาย
            </Button>
          </Flex>
        </Container>
        <Container
          maxW="container.md"
          minH="280"
          border="1px solid black"
          m={3}
          p={3}
        >
          <Grid
            templateColumns="repeat(5, 1fr)"
            gap={2}
            borderBottom="1px solid black"
            mb={2}
            mr={4}
          >
            <Text fontSize="sm">Inv.no.</Text>
            <Text fontSize="sm">วันที่</Text>
            <Text fontSize="sm">ชื่อ</Text>
            <Text fontSize="sm">รวม</Text>
            <Text fontSize="sm">สถานะ</Text>
          </Grid>
          {orders
            .slice((pageNo - 1) * 10, (pageNo - 1) * 10 + 10)
            .map((item, index) =>
              !item.dropDown ? (
                <Flex
                  w="full"
                  key={index}
                  _hover={{ bg: "gray.200", cursor: "pointer" }}
                >
                  <Grid
                    templateColumns="repeat(5, 1fr)"
                    gap={2}
                    key={index}
                    // align="center"
                    justify="center"
                    flex="1"
                    onClick={() => history.push("/order/" + item.id)}
                  >
                    <Text mr={3} fontSize="sm">
                      {item.invNo}
                    </Text>
                    <Text mr={3} fontSize="sm">
                      {item.date.slice(0, 10)}
                    </Text>
                    <Text mr={3} fontSize="sm">
                      {item.name}
                    </Text>
                    <Text mr={3} fontSize="sm">
                      {item.OrderItems.reduce(
                        (acc, orderItem) =>
                          (acc += orderItem.price * orderItem.quantity),
                        0
                      )}
                    </Text>
                    <Text mr={3} fontSize="sm">
                      {item.status === "waiting for payment"
                        ? "รอการจ่ายเงิน"
                        : ""}
                      {item.status === "completed" ? "ได้รับเงินแล้ว" : ""}
                      {item.status === "cancelled" ? "ยกเลิก" : ""}
                      {item.status === "emailed" ? "แจ้งทางอีเมลแล้ว" : ""}
                    </Text>
                  </Grid>
                  <ChevronDownIcon onClick={() => handleDropDown(item.id)} />
                </Flex>
              ) : (
                <Flex direction="column">
                  <Flex
                    w="full"
                    key={index}
                    _hover={{ bg: "gray.200", cursor: "pointer" }}
                  >
                    <Grid
                      templateColumns="repeat(5, 1fr)"
                      gap={2}
                      key={index}
                      // align="center"
                      justify="center"
                      flex="1"
                      onClick={() => history.push("/order/" + item.id)}
                    >
                      <Text mr={3} fontSize="sm">
                        {item.invNo}
                      </Text>
                      <Text mr={3} fontSize="sm">
                        {item.date.slice(0, 10)}
                      </Text>
                      <Text mr={3} fontSize="sm">
                        {item.name}
                      </Text>
                      <Text mr={3} fontSize="sm">
                        {item.OrderItems.reduce(
                          (acc, orderItem) =>
                            (acc += orderItem.price * orderItem.quantity),
                          0
                        )}
                      </Text>
                      <Text mr={3} fontSize="sm">
                        {item.status === "waiting for payment"
                          ? "รอการจ่ายเงิน"
                          : ""}
                        {item.status === "completed" ? "ได้รับเงินแล้ว" : ""}
                        {item.status === "cancelled" ? "ยกเลิก" : ""}
                        {item.status === "emailed" ? "แจ้งทางอีเมลแล้ว" : ""}
                      </Text>
                    </Grid>
                    <ChevronUpIcon
                      onClick={() => handleHideDropDown(item.id)}
                    />
                  </Flex>
                  <Flex justify="center">
                    <Container
                      maxW="container.md"
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
                          {item.OrderItems.map((orderItem, index) => (
                            <Tr key={index}>
                              <Th>{index + 1}</Th>
                              <Th>{orderItem.Product.name}</Th>
                              <Th isNumeric>{+orderItem.quantity}</Th>
                              <Th isNumeric>{+orderItem.price}</Th>
                              <Th isNumeric>
                                {orderItem.quantity * orderItem.price}
                              </Th>
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
                              {item.OrderItems.reduce(
                                (acc, orderItem) =>
                                  (acc += orderItem.price * orderItem.quantity),
                                0
                              )}
                            </Th>
                          </Tr>
                        </Tfoot>
                      </Table>
                    </Container>
                  </Flex>
                </Flex>
              )
            )}
        </Container>
        <Flex justify="center">
          {totalPage.map((page, index) =>
            pageNo === page ? (
              <Button size="xs" mx={1}>
                {page}
              </Button>
            ) : (
              <Button
                size="xs"
                mx={1}
                variant="outline"
                onClick={() => setPageNo(page)}
              >
                {page}
              </Button>
            )
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default OrderContainer;
