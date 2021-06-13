import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
} from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Input,
  Select,
} from "@chakra-ui/react";
import axios from "../../config/axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";

function SinglePlantingPage() {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [planting, setPlanting] = useState({
    Farm: {},
    Customer: {},
    Seed: {},
  });
  const [date, setDate] = useState("");
  const [type, setType] = useState("cost");
  const [description, setDescription] = useState("");
  const [vendorCustomerName, setVendorCustomerName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("ชิ้น");
  const [amount, setAmount] = useState(0);
  const [remark, setRemark] = useState("");
  const [productId, setProductId] = useState("");
  const [modalSelector, setModalSelector] = useState("");

  const fetchPlanting = async () => {
    try {
      const res = await axios.get("/plantings/" + params.id);
      setPlanting(res.data.planting);
    } catch (err) {
      console.dir(err);
    }
  };
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/product/");
      setProducts(res.data.products);
    } catch (err) {
      console.dir(err);
    }
  };
  useEffect(() => {
    fetchPlanting();
    fetchProducts();
  }, []);
  const handleAddTransaction = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/plantings/" + params.id, {
        date,
        type,
        description,
        vendorCustomerName,
        quantity,
        unit,
        amount,
        remark,
      });
      fetchPlanting();
    } catch (err) {
      console.dir(err);
    }
  };
  const handleHarvest = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/plantings/harvest/" + params.id, {
        date,
        description,
        vendorCustomerName,
        quantity,
        unit,
        amount,
        remark,
        productId,
        farmId: planting.Farm.id,
      });
      history.push("/farm");
    } catch (err) {
      console.dir(err);
    }
  };
  return (
    <Box p={2} m={2}>
      <Flex direction="column">
        <Container maxW="container.lg">
          <Text as="h2" fontSize="2xl" fontWeight="semibold">
            หน้ารายละเอียดการปลูก
          </Text>
          <Container maxW="container.md" p={5}>
            <Flex>
              <Box py="3" fontSize="lg">
                <Flex>
                  <Text fontWeight="semibold" minW="24">
                    รหัสแปลง:
                  </Text>
                  <Text>{planting.Farm.id}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="semibold" minW="24">
                    ชื่อแปลง:
                  </Text>
                  <Text>{planting.Farm.name}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="semibold" minW="24">
                    วันที่เริ่ม:
                  </Text>
                  <Text>{planting.startDate}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="semibold" minW="24">
                    จองโดย:
                  </Text>
                  <Text>{planting.Customer && planting.Customer.fullName}</Text>
                </Flex>
              </Box>
              <Spacer />
              <Box py="3" fontSize="lg">
                <Flex>
                  <Text fontWeight="semibold" minW="48">
                    รหัสการปลูก:
                  </Text>
                  <Text>{planting.id}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="semibold" minW="48">
                    พืชที่ปลูก:
                  </Text>
                  <Text>{planting.Seed.name}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="semibold" minW="48">
                    วันที่คาดว่าจะเก็บเกี่ยว:
                  </Text>
                  <Text>{planting.harvestDate}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="semibold" minW="48">
                    สถานะ:
                  </Text>
                  <Text>{planting.status}</Text>
                </Flex>
              </Box>
            </Flex>
            <Flex>
              <Text fontSize="lg" fontWeight="semibold" minW="24">
                หมายเหตุ:
              </Text>
              <Text fontSize="lg">{planting.remark}</Text>
            </Flex>
          </Container>
          <Button
            size="sm"
            onClick={() => {
              setModalSelector("addTransaction");
              onOpen();
            }}
            mr={2}
          >
            เพิ่มค่าใช้จ่าย/รายได้
          </Button>
          <Button size="sm" mr={2}>
            มอบหมายงาน
          </Button>
          <Button
            size="sm"
            mr={2}
            onClick={() => {
              setModalSelector("harvest");
              onOpen();
            }}
          >
            เก็บเกี่ยว
          </Button>
          <Flex justify="center">
            <Grid templateColumns="repeat(7, 1fr)" gap={4} m={2} p={2}>
              <GridItem colSpan={1}>
                <Text fontWeight="semibold">วันที่</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text fontWeight="semibold">รายการ</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text fontWeight="semibold">ผู้ซื้อ/ขาย</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text fontWeight="semibold" textAlign="right">
                  จำนวน
                </Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text fontWeight="semibold" textAlign="right">
                  หน่วย
                </Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text fontWeight="semibold" textAlign="right">
                  ราคาต่อหน่วย
                </Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text fontWeight="semibold" textAlign="right">
                  ราคารวม
                </Text>
              </GridItem>
              {planting.PlantingTransactions &&
                planting.PlantingTransactions.map((transaction, index) => (
                  <>
                    <GridItem colSpan={1} key={transaction.id}>
                      <Text>{transaction.date.slice(0, 10)}</Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text>{transaction.description}</Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text>{transaction.vendorCustomerName}</Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text textAlign="right">{+transaction.quantity}</Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text textAlign="right">{transaction.unit}</Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text textAlign="right">{+transaction.amount}</Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text textAlign="right">
                        {transaction.quantity * transaction.amount}
                      </Text>
                    </GridItem>
                  </>
                ))}
              <GridItem colSpan={6}>
                <Text fontWeight="semibold" textAlign="right">
                  รวม
                </Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text fontWeight="semibold" textAlign="right">
                  {planting.PlantingTransactions &&
                    planting.PlantingTransactions.reduce(
                      (acc, { quantity, amount }) => (acc += quantity * amount),
                      0
                    )}
                </Text>
              </GridItem>
            </Grid>
          </Flex>
        </Container>
      </Flex>
      {modalSelector === "addTransaction" && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>เริ่มปลูก</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleAddTransaction}>
              <ModalBody>
                <Flex align="baseline" mb={1}>
                  <Text as="label" for="date" w="50%" textAlign="right" mr={2}>
                    วันที่:
                  </Text>
                  <Input
                    type="date"
                    size="sm"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Flex>
                <Flex align="baseline" mb={1}>
                  <Text as="label" for="type" w="50%" textAlign="right" mr={2}>
                    ประเภท:
                  </Text>
                  <Select
                    size="sm"
                    id="type"
                    defaultValue="cost"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="cost">cost</option>
                    <option value="income">income</option>
                  </Select>
                </Flex>
                <Flex align="baseline" mb={1}>
                  <Text
                    as="label"
                    for="description"
                    w="50%"
                    textAlign="right"
                    mr={2}
                  >
                    รายละเอียด:
                  </Text>
                  <Input
                    size="sm"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Flex>
                <Flex align="baseline" mb={1}>
                  <Text
                    as="label"
                    for="vendor-customer-name"
                    w="50%"
                    textAlign="right"
                    mr={2}
                  >
                    ชื่อผู้ขาย/ซื้อ:
                  </Text>
                  <Input
                    size="sm"
                    id="vendor-customer-name"
                    value={vendorCustomerName}
                    onChange={(e) => setVendorCustomerName(e.target.value)}
                  />
                </Flex>
                <Flex align="baseline" mb={1}>
                  <Text
                    as="label"
                    for="quantity"
                    w="50%"
                    textAlign="right"
                    mr={2}
                  >
                    จำนวน:
                  </Text>
                  <Input
                    size="sm"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Flex>
                <Flex align="baseline" mb={1}>
                  <Text as="label" for="unit" w="50%" textAlign="right" mr={2}>
                    หน่วย(อัน, ชิ้น):
                  </Text>
                  <Input
                    size="sm"
                    id="unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  />
                </Flex>
                <Flex align="baseline" mb={1}>
                  <Text
                    as="label"
                    for="amount"
                    w="50%"
                    textAlign="right"
                    mr={2}
                  >
                    ราคาต่อหน่วย:
                  </Text>
                  <Input
                    size="sm"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Flex>
                <Flex align="baseline" mb={1}>
                  <Text
                    as="label"
                    for="remark"
                    w="50%"
                    textAlign="right"
                    mr={2}
                  >
                    หมายเหตุ:
                  </Text>
                  <Input
                    size="sm"
                    id="remark"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                  />
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme="blue"
                  mr={3}
                  onClick={onClose}
                >
                  เพิ่มรายการ
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    onClose();
                  }}
                >
                  ยกเลิก
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
      {modalSelector === "harvest" && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>เก็บเกี่ยว</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleHarvest}>
              <ModalBody>
                <Flex align="baseline" mb={1}>
                  <Text as="label" for="date" w="50%" textAlign="right" mr={2}>
                    วันที่:
                  </Text>
                  <Input
                    type="date"
                    size="sm"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Flex>
                <Flex align="baseline" mb={1}>
                  <Text as="label" for="type" w="50%" textAlign="right" mr={2}>
                    สินค้า:
                  </Text>
                  <Select
                    size="sm"
                    id="type"
                    defaultValue="cost"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  >
                    <option value="">เพิ่มในสินค้า</option>
                    {products.map((product, index) => (
                      <option key={index} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </Select>
                </Flex>
                <Flex align="baseline" mb={1}>
                  <Text
                    as="label"
                    for="description"
                    w="50%"
                    textAlign="right"
                    mr={2}
                  >
                    รายละเอียด:
                  </Text>
                  <Input
                    size="sm"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Flex>
                <Flex align="baseline" mb={1}>
                  <Text
                    as="label"
                    for="vendor-customer-name"
                    w="50%"
                    textAlign="right"
                    mr={2}
                  >
                    ชื่อผู้ขาย/ซื้อ:
                  </Text>
                  <Input
                    size="sm"
                    id="vendor-customer-name"
                    value={vendorCustomerName}
                    onChange={(e) => setVendorCustomerName(e.target.value)}
                  />
                </Flex>
                <Flex align="baseline" mb={1}>
                  <Text
                    as="label"
                    for="quantity"
                    w="50%"
                    textAlign="right"
                    mr={2}
                  >
                    จำนวน:
                  </Text>
                  <Input
                    size="sm"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Flex>
                <Flex align="baseline" mb={1}>
                  <Text as="label" for="unit" w="50%" textAlign="right" mr={2}>
                    หน่วย(อัน, ชิ้น):
                  </Text>
                  <Input
                    size="sm"
                    id="unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  />
                </Flex>
                <Flex align="center" mb={1}>
                  <Text
                    as="label"
                    for="amount"
                    w="50%"
                    textAlign="right"
                    mr={2}
                  >
                    ต้นทุนมาตรฐานต่อหน่วย
                  </Text>
                  <Input
                    size="sm"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Flex>
                <Flex align="baseline" mb={1}>
                  <Text
                    as="label"
                    for="remark"
                    w="50%"
                    textAlign="right"
                    mr={2}
                  >
                    หมายเหตุ:
                  </Text>
                  <Input
                    size="sm"
                    id="remark"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                  />
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme="blue"
                  mr={3}
                  onClick={onClose}
                >
                  เพิ่มรายการ
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    onClose();
                  }}
                >
                  ยกเลิก
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

export default SinglePlantingPage;
