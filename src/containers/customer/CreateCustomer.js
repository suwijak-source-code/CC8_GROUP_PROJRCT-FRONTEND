import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import axios from "../../config/axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

function CreateCustomer() {
  const history = useHistory();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [VatId, setVatId] = useState("");

  const handleSubmitCreateCustomer = async (e) => {
    e.preventDefault();
    const res = await axios.post("/customer", {
      fullName,
      address,
      phone,
      email,
      VatId,
    });
    history.push("/customer");
  };
  return (
    <Box m={3} p={3}>
      <Flex direction="column">
        <Container maxW="container.xl">
          <Text as="h2" fontSize="2xl">
            เพิ่มลูกค้าใหม่
          </Text>
          <Container maxW="container.md">
            <form onSubmit={handleSubmitCreateCustomer}>
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
              </Flex>
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
                  เพิ่มลูกค้า
                </Button>
              </Flex>
            </form>
          </Container>
        </Container>
      </Flex>
    </Box>
  );
}

export default CreateCustomer;
