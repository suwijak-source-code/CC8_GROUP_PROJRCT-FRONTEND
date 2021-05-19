import { Button } from "@chakra-ui/button";
import { Input, InputLeftElement } from "@chakra-ui/input";
import { InputGroup } from "@chakra-ui/input";
import { Container } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { PhoneIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../features/Order/OrderListsSlice";

function CreateOrderContainer() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([]);
  const [invNo, setInvNo] = useState("");
  const [date, setDate] = useState(
    new Date(Date.parse(new Date()) + 25200000).toISOString().slice(0, 10)
  );
  const [isInvNoAlreadyUsed, setIsInvNoAlreadyUsed] = useState(false);
  const history = useHistory();
  const orders = useSelector((state) => state.orderLists.orders);
  const dispatch = useDispatch();
  const fetchOrder = async () => {
    const res = await axios.get("/order");
    dispatch(setOrders(res.data.orders));
  };
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/product");
      setProducts(res.data.products);
    } catch (err) {
      console.dir(err);
    }
  };
  const fetchCustomers = async () => {
    try {
      const res = await axios.get("/customer");
      setCustomers(res.data.customers);
      console.log(res.data.customers);
    } catch (err) {
      console.dir(err);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCustomers();
    fetchOrder();
  }, []);
  const handleInvNoChange = (e) => {
    for (let order of orders) {
      if (order.invNo === e.target.value) {
        setInvNo(e.target.value);
        return setIsInvNoAlreadyUsed(true);
      }
      if (order.invNo !== e.target.value) {
        setIsInvNoAlreadyUsed(false);
        setInvNo(e.target.value);
      }
    }
    setInvNo(e.target.value);
  };
  const handleSelectCustomer = (e) => {
    if (e.target.value === "") return;
    const index = customers.findIndex(
      (customer, index) => (customer.id = e.target.value)
    );
    console.log(index);
    console.log(customers[index]);
    const newAddress =
      customers[index].fullName +
      "\n" +
      customers[index].CustomerAddresses[0].address +
      "\n อีเมลล์: " +
      customers[index].CustomerAddresses[0].email +
      "\n เลขที่ผู้เสียภาษี: " +
      customers[index].VatId;
    setAddress(newAddress);
    setCustomer(customers[index]);
    setPhone(customers[index].CustomerAddresses[0].phone);
  };
  const handleSelectProduct = (e) => {
    if (e.target.value === "") return;
    const isProductAlreadyInOrders = items.findIndex(
      (item) => item.productId === e.target.value.split("/")[0]
    );
    if (isProductAlreadyInOrders !== -1) return;
    const newItems = [...items];
    console.log(e.target.value);
    newItems.push({
      id: items.length + 1,
      productId: e.target.value.split("/")[0],
      productName: e.target.value.split("/")[1],
      price: +e.target.value.split("/")[2],
      quantity: 1,
    });
    setItems(newItems);
  };
  const handleQuantityChange = (index, e) => {
    const newItems = [...items];
    newItems[index].quantity = e.target.value;
    setItems(newItems);
    console.log(newItems[index]);
  };
  const handlePriceChange = (index, e) => {
    const newItems = [...items];
    newItems[index].price = e.target.value;
    setItems(newItems);
    console.log(newItems[index]);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/order", {
        invNo,
        date,
        address,
        phone,
        customerId: customer.id,
        name: customer.fullName,
        orderItems: items,
      });
      history.push("/order/" + res.data.order.id);
    } catch (err) {
      console.dir(err);
    }
  };
  return (
    <Box>
      <Flex align="center" direction="column">
        <Container maxW="container.md">
          <Text as="h2" fontWeight="semibold">
            สร้างรายการขายใหม่
          </Text>
        </Container>
        <Container
          maxW="container.md"
          minH="500"
          border="1px solid black"
          m={3}
          p={3}
        >
          <form onSubmit={handleSubmit}>
            <Flex>
              <Box w="40%" p={2}>
                <Text as="label" for="date" fontSize="sm">
                  วันที่
                </Text>
                <Input
                  id="date"
                  type="date"
                  placeholder="วันที่"
                  size="sm"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Box>
              <Box w="60%" p={2}>
                <Text as="label" for="inv-no" fontSize="sm">
                  เลขที่รายการขาย
                </Text>
                <Input
                  id="inv-no"
                  type="text"
                  size="sm"
                  placeholder="เลขที่รายการขาย"
                  value={invNo}
                  //   onChange={(e) => setInvNo(e.target.value)}
                  onChange={handleInvNoChange}
                />
                {isInvNoAlreadyUsed && (
                  <Text fontSize="sm" color="red">
                    *เลขที่รายการขายซ้ำ
                  </Text>
                )}
              </Box>
            </Flex>

            <Flex mx={2} mb={1} pr="50%" align="baseline">
              <Text as="label" for="customer" fontSize="sm">
                ลูกค้า
              </Text>
              <Select
                size="sm"
                mx={2}
                defaultValue="เลือกลูกค้า"
                onChange={handleSelectCustomer}
                id="customer"
              >
                {customer === "" && <option value="">เลือกลูกค้า</option>}
                {customers.map((customer, index) => (
                  <option key={index} value={customer.id}>
                    {customer.fullName}
                  </option>
                ))}
              </Select>
            </Flex>
            <Flex mx={2} mb={1} pr="20%" align="baseline">
              <Box w="9">
                <Text as="label" for="address" fontSize="sm">
                  ที่อยู่
                </Text>
              </Box>
              <Textarea
                id="address"
                mx={2}
                size="sm"
                type="text"
                placeholder="ชื่อ-ที่อยู่"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Flex>
            <InputGroup mx={2} size="sm" pr="27%" mb={1}>
              <InputLeftElement
                pointerEvents="none"
                children={<PhoneIcon color="gray.300" />}
              />
              <Input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputGroup>
            <Flex>
              <Container
                maxW="container.md"
                h="300"
                m={1}
                p={1}
                border="1px solid black"
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
                    {items.map((item, index) => (
                      <Tr key={index + 1}>
                        <Td>{index + 1}</Td>
                        <Td>{item.productName}</Td>
                        <Td isNumeric>
                          <Input
                            type="number"
                            size="xs"
                            w="9"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, e)}
                          />
                        </Td>
                        <Td isNumeric>
                          <Input
                            type="number"
                            size="xs"
                            minW="9"
                            maxW="50"
                            value={item.price}
                            onChange={(e) => handlePriceChange(index, e)}
                          />
                        </Td>
                        <Td isNumeric>{item.quantity * item.price}</Td>
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
                        {items.length !== 0
                          ? items.reduce(
                              (acc, item) =>
                                (acc += item.quantity * item.price),
                              0
                            )
                          : 0}
                      </Th>
                    </Tr>
                  </Tfoot>
                </Table>
                <Flex align="flex-end" m={1}>
                  <Text fontSize="sm" mr={1}>
                    เพิ่มรายการ:{" "}
                  </Text>
                  <Select maxW="200" size="xs" onChange={handleSelectProduct}>
                    <option value="">เพิ่มรายการ</option>
                    {products.map((product, index) => (
                      <option
                        key={index}
                        value={`${product.id}/${product.name}/${product.price}`}
                      >
                        {product.name}
                      </option>
                    ))}
                  </Select>
                </Flex>
                <Flex justify="center" m={1}>
                  <Button type="submit" size="xs" mx={2}>
                    ยืนยัน
                  </Button>
                </Flex>
              </Container>
            </Flex>
          </form>
        </Container>
        <Container maxW="container.md">
          <Button
            size="xs"
            variant="outline"
            // bg="blue.300"
            // _hover={{ bgColor: "blue.400" }}
            onClick={() => history.push("/order")}
          >
            กลับไปหน้ารวมรายการขายทั้งหมด
          </Button>
        </Container>
      </Flex>
    </Box>
  );
}

export default CreateOrderContainer;
