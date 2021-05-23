import { Input } from "@chakra-ui/input";
import { Container, Flex, Text } from "@chakra-ui/layout";
import axios from "../../config/axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "@chakra-ui/button";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../features/Product/ProductsSlice";

function CreateProductContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const fetchProducts = async () => {
    const res = await axios.get("/product/");
    dispatch(setProducts(res.data.products));
  };
  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/product", {
      name,
      price,
    });
    // fetchProducts();
    history.push("/inventory");
  };
  return (
    <div>
      <Flex align="center" direction="column">
        <Container maxW="container.md">
          <Text as="h2" fontSize="2xl" fontWeight="semibold">
            เพิ่มสินค้า
          </Text>
        </Container>
        <Container maxW="container.md" border="1px solid black" p={2} m={2}>
          <Container maxW="container.sm">
            <form onSubmit={handleSubmit}>
              <Flex align="baseline" justify="center" px="10%" m={1}>
                <Text size="sm" mx={2} minW="10">
                  ชื่อ:
                </Text>
                <Input
                  size="sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Flex>
              <Flex align="baseline" justify="center" px="10%" m={1}>
                <Text size="sm" mx={2} minW="10">
                  ราคา:
                </Text>
                <Input
                  size="sm"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Flex>
              <Flex justify="center">
                <Button size="sm" m={1} type="submit">
                  ยืนยัน
                </Button>
              </Flex>
            </form>
          </Container>
        </Container>
      </Flex>
    </div>
  );
}

export default CreateProductContainer;
