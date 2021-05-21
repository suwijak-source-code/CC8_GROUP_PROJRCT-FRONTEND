import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import axios from "../../config/axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Select } from "@chakra-ui/select";
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

function EditCustomer() {
  const params = useParams();
  const history = useHistory();
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [VatId, setVatId] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchCustomers = async () => {
    const res = await axios.get("/customer");
    setCustomers(res.data.customers);
  };
  const fetchCustomer = async () => {
    const res = await axios.get("/customer/" + params.id);
    setCustomer(res.data.customer);
    setFullName(res.data.customer.fullName);
    const index = res.data.customer.CustomerAddresses.findIndex(
      (item) => item.main === true
    );
    setAddress(res.data.customer.CustomerAddresses[index].address);
    setPhone(res.data.customer.CustomerAddresses[index].phone);
    setEmail(res.data.customer.CustomerAddresses[index].email);
    setVatId(res.data.customer.VatId);
  };
  useEffect(() => {
    fetchCustomers();
    fetchCustomer();
  }, []);
  console.log(customer);
  const handleSubmitEditCustomer = async (e) => {
    e.preventDefault();
    const mainAddress = customer.CustomerAddresses.find(
      (item) =>
        item.address === address && item.phone === phone && item.email === email
    );
    console.log(mainAddress);
    const res = await axios.put("/customer", {
      fullName,
      VatId,
      addressId: mainAddress.id,
      id: customer.id,
    });
    history.push("/customer");
  };
  const selectMainAddress = (e) => {
    try {
      const index = customer.CustomerAddresses.findIndex(
        (item) => item.address === e.target.value
      );
      console.log(e.target.value);
      setAddress(customer.CustomerAddresses[index].address);
      setPhone(customer.CustomerAddresses[index].phone);
      setEmail(customer.CustomerAddresses[index].email);
    } catch (err) {
      console.dir(err);
    }
  };
  const createAddress = async () => {
    try {
      const res = await axios.post("/customer/address", {
        customerId: params.id,
        address: newAddress,
        phone: newPhone,
        email: newEmail,
      });
      onClose();
      fetchCustomer();
    } catch (err) {
      console.dir(err);
    }
  };
  return (
    <Box m={3} p={3}>
      <Flex direction="column">
        <Container maxW="container.xl">
          <Text as="h2" fontSize="2xl">
            แก้ไขรายละเอียด
          </Text>
          <Container maxW="container.md">
            <form onSubmit={handleSubmitEditCustomer}>
              <Flex align="baseline" justify="flex-end" my={1}>
                <Text as="label" for="id" mr={2}>
                  รหัส:
                </Text>
                <Input
                  size="sm"
                  id="id"
                  w="70%"
                  value={customer.id}
                  onChange={(e) => setCustomer(e.target.value)}
                  disabled
                />
              </Flex>
              <Flex align="baseline" justify="flex-end" my={1}>
                <Text as="label" for="name" mr={2}>
                  ชื่อ:
                </Text>
                <Input
                  size="sm"
                  id="name"
                  w="70%"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Flex>
              <Flex align="baseline" justify="flex-end" my={1}>
                <Text
                  as="label"
                  for="main-address"
                  mr={2}
                  w="30%"
                  textAlign="right"
                >
                  เลือกที่อยู่หลัก:
                </Text>
                <Select
                  size="sm"
                  id="main-address"
                  w="60%"
                  value={address}
                  onChange={selectMainAddress}
                >
                  {customer.CustomerAddresses &&
                    customer.CustomerAddresses.map((item, index) => (
                      <option key={index}>{item.address}</option>
                    ))}
                </Select>
                <Button size="xs" mx={2} onClick={onOpen}>
                  เพิ่มที่อยู่
                </Button>
                <Modal
                  blockScrollOnMount={false}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>เพิ่มที่อยู่</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Flex align="baseline" justify="flex-end" my={1}>
                        <Text as="label" for="address" mr={2}>
                          ที่อยู่:
                        </Text>
                        <Input
                          size="sm"
                          id="address"
                          w="70%"
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                        />
                      </Flex>
                      <Flex align="baseline" justify="flex-end" my={1}>
                        <Text as="label" for="phone" mr={2}>
                          โทร:
                        </Text>
                        <Input
                          size="sm"
                          id="phone"
                          w="70%"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                        />
                      </Flex>
                      <Flex align="baseline" justify="flex-end" my={1}>
                        <Text as="label" for="email" mr={2}>
                          อีเมล:
                        </Text>
                        <Input
                          size="sm"
                          id="email"
                          w="70%"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                        />
                      </Flex>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={createAddress}>
                        ยืนยัน
                      </Button>
                      <Button
                        variant="outline"
                        bg="muted.200"
                        onClick={onClose}
                      >
                        ปิด
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                {/* <AddAddress onOpen /> */}
              </Flex>
              {/* <Flex align="baseline" justify="flex-end" my={1}>
                <Text as="label" for="address" mr={2}>
                  ที่อยู่:
                </Text>
                <Input
                  size="sm"
                  id="address"
                  w="70%"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Flex> */}
              <Flex align="baseline" justify="flex-end" my={1}>
                <Text as="label" for="phone" mr={2}>
                  โทร:
                </Text>
                <Input
                  size="sm"
                  id="phone"
                  w="70%"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled
                />
              </Flex>
              <Flex align="baseline" justify="flex-end" my={1}>
                <Text as="label" for="email" mr={2}>
                  อีเมล:
                </Text>
                <Input
                  size="sm"
                  id="email"
                  w="70%"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </Flex>
              <Flex align="baseline" justify="flex-end" my={1}>
                <Text as="label" for="VatId" mr={2}>
                  เลขประจำตัวผู้เสียภาษี:
                </Text>
                <Input
                  size="sm"
                  id="VatId"
                  w="70%"
                  value={VatId}
                  onChange={(e) => setVatId(e.target.value)}
                />
              </Flex>
              <Flex justify="center">
                <Button size="sm" type="submit">
                  แก้ไข
                </Button>
              </Flex>
            </form>
          </Container>
        </Container>
      </Flex>
    </Box>
  );
}

export default EditCustomer;
