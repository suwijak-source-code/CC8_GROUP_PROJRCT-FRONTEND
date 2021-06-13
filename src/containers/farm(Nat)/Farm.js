import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/layout";
import axios from "../../config/axios";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function Farm() {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [farms, setFarms] = useState([]);
  const [seeds, setSeeds] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [farmId, setFarmId] = useState("");
  const [date, setDate] = useState("");
  const [remark, setRemark] = useState("");
  const [seed, setSeed] = useState("");
  const [reservedCustomer, setReservedCustomer] = useState("");
  const [harvestDate, setHarvestDate] = useState();
  const userProfile = useSelector((state) => state.profile.userProfile);

  const fetchSeeds = async () => {
    const res = await axios.get("/seeds");
    setSeeds(res.data.seed);
  };
  const fetchCustomers = async () => {
    const res = await axios.get("/customer");
    setCustomers(res.data.customers);
  };
  const fetchFarms = async () => {
    const res = await axios.get("/farms");
    console.log(res.data.farms);
    setFarms(res.data.farms);
  };
  useEffect(() => {
    fetchFarms();
  }, []);
  const handleStartPlanting = async (id) => {
    try {
      onOpen();
      fetchSeeds();
      fetchCustomers();
      setFarmId(id);
    } catch (err) {
      console.dir(err);
    }
  };
  const handleSubmitStartPlanting = async (e) => {
    try {
      e.preventDefault();
      const res = axios.post("/plantings/start", {
        farmId,
        reservedCustomer,
        seedId: seed,
        remark,
        harvestDate,
        startDate: date,
        plantedAmount: 1,
        harvertedAmount: 0,
        plantingApprovedBy: userProfile.id,
        fertilizerPrice: 0,
        maintenanceCost: 0,
        miscellaneous_expenses: 0,
        status: "started",
      });
      fetchFarms();
    } catch (err) {
      console.dir(err);
    }
  };
  const handleDropDown = (id) => {
    const newFarms = farms.map((farm, index) =>
      farm.id === id ? { ...farm, dropDown: !farm.dropDown } : { ...farm }
    );
    setFarms(newFarms);
  };
  const handleExploreCurrentPlanting = async (farm) => {
    try {
      console.log(farm);
      const planting = farm.Plantings.find(
        (item) => item.status !== "cancel" && item.status !== "finished"
      );
      history.push("/planting/" + planting.id);
    } catch (err) {
      console.dir(err);
    }
  };
  return (
    <Box p={2} m={2}>
      <Flex align="center" direction="column">
        <Container maxW="container.xl">
          <Heading>หน้าจัดการฟาร์ม</Heading>
          <Grid
            templateColumns="repeat(10, 1fr)"
            gap={2}
            justify="center"
            flex="1"
            fontWeight="semibold"
          >
            <GridItem colSpan={1}>
              <Text>id</Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text>name</Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text>status</Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text>remark</Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text>approve by</Text>
            </GridItem>
          </Grid>
          {farms.map((farm, index) => (
            <>
              <Grid
                key={index}
                templateColumns="repeat(10, 1fr)"
                gap={2}
                justify="center"
                flex="1"
              >
                <GridItem colSpan={1}>
                  <Text>{farm.id}</Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text>{farm.name}</Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text>{farm.status}</Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text>{farm.remark}</Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text>{farm.User.firstName + " " + farm.User.lastName}</Text>
                </GridItem>
                {farm.status !== "idle" && (
                  <GridItem colSpan={1}>
                    <Text
                      as="u"
                      _hover={{ cursor: "pointer" }}
                      onClick={() => handleExploreCurrentPlanting(farm)}
                    >
                      งานปัจจุบัน
                    </Text>
                  </GridItem>
                )}
                {farm.status === "idle" && (
                  <GridItem colSpan={1}>
                    <Text
                      as="u"
                      _hover={{ cursor: "pointer" }}
                      onClick={() => handleStartPlanting(farm.id)}
                    >
                      เริ่มปลูก
                    </Text>
                  </GridItem>
                )}
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>เริ่มปลูก</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmitStartPlanting}>
                      <ModalBody>
                        <Flex align="baseline">
                          <Text
                            as="label"
                            for="farm-id"
                            w="30%"
                            textAlign="right"
                            mr={2}
                          >
                            farm id:
                          </Text>
                          <Input
                            size="sm"
                            id="farm-id"
                            defaultValue={farmId}
                            disabled
                          />
                        </Flex>
                        <Flex align="baseline">
                          <Text
                            as="label"
                            for="seed"
                            w="30%"
                            textAlign="right"
                            mr={2}
                          >
                            เมล็ดพันธู์:
                          </Text>
                          <Select
                            size="sm"
                            id="seed"
                            onChange={(e) => setSeed(e.target.value)}
                          >
                            {seed === "" && (
                              <option value="">เลือกเมล็ดพันธู์</option>
                            )}
                            {seeds.map((seed, index) => (
                              <option key={index} value={seed.id}>
                                {seed.name}
                              </option>
                            ))}
                          </Select>
                        </Flex>
                        <Flex align="baseline">
                          <Text
                            as="label"
                            for="start-date"
                            w="30%"
                            textAlign="right"
                            mr={2}
                          >
                            วันที่เริ่ม:
                          </Text>
                          <Input
                            size="sm"
                            type="date"
                            id="start-date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </Flex>
                        <Flex align="baseline">
                          <Text
                            as="label"
                            for="harvest-date"
                            w="30%"
                            textAlign="right"
                            mr={2}
                          >
                            วันที่เก็บเกี่ยว:
                          </Text>
                          <Input
                            size="sm"
                            id="harvest-date"
                            type="date"
                            defaultValue={harvestDate}
                            onChange={(e) => setHarvestDate(e.target.value)}
                          />
                        </Flex>
                        <Flex align="baseline">
                          <Text
                            as="label"
                            for="reserved-customer"
                            w="30%"
                            textAlign="right"
                            mr={2}
                          >
                            สำหรับลูกค้า:
                          </Text>
                          <Select
                            size="sm"
                            id="reserved-customer"
                            defaultValue={null}
                            onChange={(e) =>
                              setReservedCustomer(e.target.value)
                            }
                          >
                            <option value={null}>ไม่กำหนด</option>
                            {customers.map((customer, index) => (
                              <option key={index} value={customer.id}>
                                {customer.fullName}
                              </option>
                            ))}
                          </Select>
                        </Flex>
                        <Flex align="baseline">
                          <Text
                            as="label"
                            for="remark"
                            w="30%"
                            textAlign="right"
                            mr={2}
                          >
                            หมายเหตุ:
                          </Text>
                          <Input
                            size="sm"
                            id="remark"
                            defaultValue={remark}
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
                          เริ่มปลูก
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setFarmId("");
                            onClose();
                          }}
                        >
                          ยกเลิก
                        </Button>
                      </ModalFooter>
                    </form>
                  </ModalContent>
                </Modal>
                <GridItem colSpan={1}>
                  <Text
                    as="u"
                    _hover={{ cursor: "pointer" }}
                    onClick={() => handleDropDown(farm.id)}
                  >
                    ประวัติการปลูก
                  </Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text as="u" _hover={{ cursor: "pointer" }}>
                    แก้ไข
                  </Text>
                </GridItem>
              </Grid>
              {farm.dropDown && (
                <>
                  <Grid
                    templateColumns="repeat(8, 1fr)"
                    gap={2}
                    justify="center"
                    flex="1"
                    my={1}
                    mx="5%"
                    p={3}
                    border="1px solid black"
                  >
                    <GridItem colSpan={1} fontWeight="semibold">
                      <Text>หมายเลขการปลูก</Text>
                    </GridItem>
                    <GridItem colSpan={1} fontWeight="semibold">
                      <Text>วันที่เริ่ม</Text>
                    </GridItem>
                    <GridItem colSpan={1} fontWeight="semibold">
                      <Text>วันที่เก็บเกี่ยว</Text>
                    </GridItem>
                    <GridItem colSpan={1} fontWeight="semibold">
                      <Text>พืชที่ปลูก</Text>
                    </GridItem>
                    <GridItem colSpan={1} fontWeight="semibold">
                      <Text>สถานะ</Text>
                    </GridItem>
                    <GridItem colSpan={1} fontWeight="semibold">
                      <Text textAlign="right">ต้นทุนทั้งหมด</Text>
                    </GridItem>
                    <GridItem colSpan={1} fontWeight="semibold">
                      <Text textAlign="right">รายได้ทั้งหมด</Text>
                    </GridItem>
                    <GridItem colSpan={1} fontWeight="semibold">
                      <Text textAlign="right">กำไร</Text>
                    </GridItem>
                  </Grid>
                  {farm.Plantings.map((planting, index) => (
                    <Grid
                      key={index}
                      templateColumns="repeat(8, 1fr)"
                      gap={2}
                      justify="center"
                      flex="1"
                      mx="5%"
                      p={3}
                      _hover={{ cursor: "pointer", bg: "gray.200" }}
                      onClick={() => history.push("/planting/" + planting.id)}
                    >
                      <GridItem colSpan={1}>
                        <Text>{planting.id}</Text>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Text>{planting.startDate}</Text>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Text>{planting.harvestDate}</Text>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Text>{planting.Seed.name}</Text>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Text>{planting.status}</Text>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Text textAlign="right">
                          {planting.PlantingTransactions.reduce(
                            (acc, { quantity, amount }) =>
                              +amount < 0
                                ? (acc += quantity * amount * -1)
                                : acc,
                            0
                          )}
                        </Text>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Text textAlign="right">
                          {planting.PlantingTransactions.reduce(
                            (acc, { quantity, amount }) =>
                              +amount > 0 ? (acc += quantity * amount) : acc,
                            0
                          )}
                        </Text>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Text textAlign="right">
                          {planting.PlantingTransactions.reduce(
                            (acc, { quantity, amount }) =>
                              (acc += quantity * amount),
                            0
                          )}
                        </Text>
                      </GridItem>
                    </Grid>
                  ))}
                </>
              )}
            </>
          ))}
        </Container>
      </Flex>
    </Box>
  );
}

export default Farm;
