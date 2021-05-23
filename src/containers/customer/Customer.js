import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import { Table, Thead, Tbody, Tr, Td, Button } from "@chakra-ui/react";
import axios from "../../config/axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

function Customer() {
  const history = useHistory();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await axios.get("/customer");
      setCustomers(res.data.customers);
    };
    fetchCustomers();
  }, []);

  const handleDropDown = (id) => {
    const newCustomers = customers.map((customer) =>
      customer.id === id ? { ...customer, dropDown: true } : { ...customer }
    );
    setCustomers(newCustomers);
  };
  const handleHideDropDown = (id) => {
    const newCustomers = customers.map((customer) =>
      customer.id === id ? { ...customer, dropDown: false } : { ...customer }
    );
    setCustomers(newCustomers);
  };
  return (
    <Box p={2} m={2}>
      <Flex direction="column">
        <Container maxW="container.xl">
          <Text as="h2" fontSize="2xl">
            ลูกค้า
          </Text>
          <Container maxW="container.md" m={3}>
            <Button size="sm" onClick={() => history.push("/customer/create")}>
              เพิ่มลูกค้า
            </Button>
          </Container>
          <Table size="sm">
            <Thead>
              <Tr>
                <Td>
                  <Text as="h3" fontWeight="semibold">
                    รหัส
                  </Text>
                </Td>
                <Td>
                  <Text as="h3" fontWeight="semibold">
                    ชื่อ
                  </Text>
                </Td>
                <Td></Td>
                <Td>
                  <Text as="h3" fontWeight="semibold">
                    เลขประจำตัวผู้เสียภาษี
                  </Text>
                </Td>
                <Td>
                  <Text as="h3" fontWeight="semibold">
                    ที่อยู่
                  </Text>
                </Td>
                <Td>
                  <Text as="h3" fontWeight="semibold">
                    เบอร์โทรศัพท์
                  </Text>
                </Td>
                <Td>
                  <Text as="h3" fontWeight="semibold">
                    อีเมล
                  </Text>
                </Td>
                <Td isNumeric>
                  <Text as="h3" fontWeight="semibold">
                    ยอดค้างชำระ
                  </Text>
                </Td>
                <Td>
                  <Text as="h3" fontWeight="semibold"></Text>
                </Td>
              </Tr>
            </Thead>
            <Tbody>
              {console.log(customers)}

              {customers.map((customer, index) => (
                <>
                  <Tr
                    key={index}
                    _hover={{ cursor: "pointer", bg: "muted.300" }}
                  >
                    <Td
                      onClick={() => history.push("/customer/" + customer.id)}
                    >
                      {customer.id}
                    </Td>
                    <Td
                      onClick={() => history.push("/customer/" + customer.id)}
                    >
                      {customer.fullName}
                    </Td>
                    <Td></Td>
                    <Td
                      onClick={() => history.push("/customer/" + customer.id)}
                    >
                      {customer.VatId}
                    </Td>
                    <Td
                      onClick={() => history.push("/customer/" + customer.id)}
                    >
                      {customer.CustomerAddresses[0].address}
                    </Td>
                    <Td
                      onClick={() => history.push("/customer/" + customer.id)}
                    >
                      {customer.CustomerAddresses[0].phone}
                    </Td>
                    <Td
                      onClick={() => history.push("/customer/" + customer.id)}
                    >
                      {customer.CustomerAddresses[0].email}
                    </Td>
                    <Td
                      isNumeric
                      onClick={() => history.push("/customer/" + customer.id)}
                    >
                      {customer.Orders.reduce(
                        (sumOrder, order) =>
                          order.status === "waiting for payment"
                            ? (sumOrder += order.OrderItems.reduce(
                                (sumItem, orderItem) =>
                                  (sumItem +=
                                    orderItem.price * orderItem.quantity),
                                0
                              ))
                            : sumOrder,
                        0
                      )}
                    </Td>
                    {!customer.dropDown && (
                      <Td onClick={() => handleDropDown(customer.id)}>
                        <ChevronDownIcon />
                      </Td>
                    )}
                    {customer.dropDown && (
                      <Td onClick={() => handleHideDropDown(customer.id)}>
                        <ChevronUpIcon />
                      </Td>
                    )}
                  </Tr>
                  {customer.dropDown && (
                    <>
                      <Tr fontWeight="semibold" my={3}>
                        <Td></Td>
                        <Td></Td>
                        <Td
                          borderTop="2px solid black"
                          borderLeft="2px solid black"
                        ></Td>
                        <Td borderTop="2px solid black">วันที่</Td>
                        <Td borderTop="2px solid black">InvNo.</Td>
                        <Td borderTop="2px solid black">รวม</Td>
                        <Td
                          borderTop="2px solid black"
                          borderRight="2px solid black"
                        >
                          สถานะ
                        </Td>
                      </Tr>
                      {customer.Orders.map((order, index) => (
                        <Tr
                          key={index}
                          _hover={{ cursor: "pointer", bg: "gray.200" }}
                          onClick={() => history.push("/order/" + order.id)}
                          color={
                            order.status === "cancelled"
                              ? "red"
                              : order.status === "completed"
                              ? "green"
                              : ""
                          }
                        >
                          <Td></Td>
                          <Td></Td>
                          <Td isNumeric borderLeft="2px solid black">
                            {customer.Orders.length - index}
                          </Td>
                          <Td>{order.date.slice(0, 10)}</Td>
                          <Td>{order.invNo}</Td>
                          <Td>
                            {order.OrderItems.reduce(
                              (acc, orderItem) =>
                                (acc += orderItem.quantity * orderItem.price),
                              0
                            )}
                          </Td>
                          <Td borderRight="2px solid black">{order.status}</Td>
                        </Tr>
                      ))}
                      <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td borderTop="2px solid black" m={1}></Td>
                        <Td borderTop="2px solid black"> </Td>
                        <Td borderTop="2px solid black"> </Td>
                        <Td borderTop="2px solid black"> </Td>
                        <Td borderTop="2px solid black"> </Td>
                      </Tr>
                    </>
                  )}
                </>
              ))}
            </Tbody>
          </Table>
        </Container>
      </Flex>
    </Box>
  );
}

export default Customer;
