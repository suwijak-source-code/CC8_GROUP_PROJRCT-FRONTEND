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
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../features/Order/OrderListsSlice";

function EditOrderContainer() {
  const params = useParams();
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([]);
  const [invNo, setInvNo] = useState("");
  const [date, setDate] = useState("");
  const [isInvNoAlreadyUsed, setIsInvNoAlreadyUsed] = useState(false);
  const history = useHistory();
  const orders = useSelector((state) => state.orderLists.orders);
  const dispatch = useDispatch();
  const fetchOrder = async () => {
    try {
      const res = await axios.get("/order/" + params.id);
      console.log(res.data.order);
      setOrder(res.data.order);
      setInvNo(res.data.order.invNo);
      setDate(res.data.order.date.slice(0, 10));
      setCustomer(res.data.order.name);
      setAddress(res.data.order.address);
      setPhone(res.data.order.phone);
      const newItems = res.data.order.OrderItems.map((orderItem, index) => ({
        quantity: +orderItem.quantity,
        price: +orderItem.price,
        productId: orderItem.productId,
        productName: orderItem.Product.name,
      }));
      setItems(newItems);
    } catch (err) {
      console.dir(err);
    }
  };
  const fetchOrders = async () => {
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
    fetchOrders();
    fetchOrder();
  }, []);
  const handleInvNoChange = (e) => {
    for (let item of orders) {
      if (item.invNo === e.target.value && order.invNo !== e.target.value) {
        setInvNo(e.target.value);
        return setIsInvNoAlreadyUsed(true);
      }
      if (item.invNo !== e.target.value) {
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
      "\n ?????????????????????: " +
      customers[index].CustomerAddresses[0].email +
      "\n ???????????????????????????????????????????????????: " +
      customers[index].VatId;
    setAddress(newAddress);
    setCustomer(customers[index]);
    setPhone(customers[index].CustomerAddresses[0].phone);
  };
  const handleSelectProduct = (e) => {
    if (e.target.value === "") return;
    const isProductAlreadyInOrders = items.findIndex(
      (item) => item.productId === +e.target.value.split("/")[0]
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
  const handleDeleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.put("/order/" + params.id, {
        invNo,
        date,
        address,
        phone,
        customerId: customer.id,
        name: customer.fullName,
        editOrderItems: items.filter(
          (item) =>
            order.OrderItems.findIndex(
              (orderItem) => orderItem.productId === item.productId
            ) !== -1
        ),
        createOrderItems: items.filter(
          (item) =>
            order.OrderItems.findIndex(
              (orderItem) => orderItem.productId === item.productId
            ) === -1
        ),
        deleteOrderItems: order.OrderItems.filter(
          (orderItem) =>
            items.findIndex(
              (item) => item.productId === orderItem.productId
            ) === -1
        ),
      });
      history.push("/order/" + params.id);
    } catch (err) {
      console.dir(err);
    }
  };
  return (
    <Box>
      <Flex align="center" direction="column">
        <Container maxW="container.md">
          <Text as="h2" fontWeight="semibold">
            ??????????????????????????????????????????????????????
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
                  ??????????????????
                </Text>
                <Input
                  id="date"
                  type="date"
                  placeholder="??????????????????"
                  size="sm"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Box>
              <Box w="60%" p={2}>
                <Text as="label" for="inv-no" fontSize="sm">
                  ?????????????????????????????????????????????
                </Text>
                <Input
                  id="inv-no"
                  type="text"
                  size="sm"
                  placeholder="?????????????????????????????????????????????"
                  value={invNo}
                  //   onChange={(e) => setInvNo(e.target.value)}
                  onChange={handleInvNoChange}
                />
                {isInvNoAlreadyUsed && (
                  <Text fontSize="sm" color="red">
                    *??????????????????????????????????????????????????????
                  </Text>
                )}
              </Box>
            </Flex>

            <Flex mx={2} mb={1} pr="50%" align="baseline">
              <Text as="label" for="customer" fontSize="sm">
                ??????????????????
              </Text>
              <Select
                size="sm"
                mx={2}
                defaultValue="?????????????????????????????????"
                onChange={handleSelectCustomer}
                id="customer"
              >
                {customer === "" && <option value="">?????????????????????????????????</option>}
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
                  ?????????????????????
                </Text>
              </Box>
              <Textarea
                id="address"
                mx={2}
                size="sm"
                type="text"
                placeholder="????????????-?????????????????????"
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
                      <Th>?????????</Th>
                      <Th>??????????????????????????????</Th>
                      <Th isNumeric>???????????????</Th>
                      <Th isNumeric>????????????????????????????????????</Th>
                      <Th isNumeric>?????????</Th>
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
                        <Td>
                          <Text
                            color="red"
                            textDecor="underline"
                            _hover={{ cursor: "pointer", color: "darkred" }}
                            onClick={() => handleDeleteItem(index)}
                          >
                            ??????
                          </Text>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th></Th>
                      <Th></Th>
                      <Th></Th>
                      <Th isNumeric>??????????????????????????????</Th>
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
                    ?????????????????????????????????:{" "}
                  </Text>
                  <Select maxW="200" size="xs" onChange={handleSelectProduct}>
                    <option value="">?????????????????????????????????</option>
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
                    ??????????????????
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
            ???????????????????????????????????????????????????????????????????????????????????????
          </Button>
        </Container>
      </Flex>
    </Box>
  );
}

export default EditOrderContainer;
