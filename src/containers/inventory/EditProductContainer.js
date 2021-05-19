import { Input } from "@chakra-ui/input";
import { Container, Flex, Text } from "@chakra-ui/layout";
import axios from "../../config/axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../features/Product/ProductsSlice";

function EditProductContainer() {
  const params = useParams();
  const history = useHistory();
  const [product, setProduct] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const res = await axios.get("/product");
    dispatch(setProducts(res.data.products));
  };
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get("/product/" + params.id);
      setProduct(res.data.product);
      setName(res.data.product.name);
      setPrice(res.data.product.price);
    };
    fetchProduct();
    if (products.length === 0) fetchProducts();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put("/product/" + params.id, {
      name,
      price,
      id: product.id,
    });
    // fetchProducts();
    history.push("/inventory");
  };
  return (
    <div>
      <Flex align="center" direction="column">
        <Container maxW="container.md">
          <Text as="h2" fontSize="2xl" fontWeight="semibold">
            แก้ไขสินค้า
          </Text>
        </Container>
        <Container maxW="container.md" border="1px solid black" p={2} m={2}>
          <Container maxW="container.sm">
            <form onSubmit={handleSubmit}>
              <Flex align="baseline" justify="center" px="10%" m={1}>
                <Text size="sm" mx={2} minW="10">
                  id:
                </Text>
                <Input
                  size="sm"
                  value={product.id}
                  //   onChange={(e) => setId(e.target.value)}
                  isDisabled
                />
              </Flex>
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

export default EditProductContainer;
