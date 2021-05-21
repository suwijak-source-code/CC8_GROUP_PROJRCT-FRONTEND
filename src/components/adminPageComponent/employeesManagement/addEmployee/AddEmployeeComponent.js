import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Textarea,
  Select,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../../../config/axios";

const AddEmployeeComponent = () => {
  const [createEmployee, setCreateEmployee] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    gender: "",
    birthDate: "",
    nationalId: "",
    phone: "",
    startDate: "",
    role: "",
    imgPath: "",
  });
  const [error, setError] = useState({});

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (e) => {
    try {
      if (e.target.files[0]) {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        const res = await axios.post("/users/upload", formData);
        setCreateEmployee((prev) => ({
          ...prev,
          imgPath: res.data.secure_url.secure_url,
        }));
      } else {
        setCreateEmployee((prev) => ({ ...prev, imgPath: "" }));
      }
    } catch (err) {
      if (err.response) {
        setError({ server: err.response.data.message });
      } else {
        setError({ front: err.message });
      }
    }
  };

  const checkNationalID = (nationalId) => {
    let num = 0;
    for (let index = 0; index < nationalId.length - 1; index++) {
      num += +nationalId[index] * (13 - index);
    }
    let digit = (11 - (num % 11)).toString().slice(-1);
    return digit;
  };

  const validateInput = () => {
    const newError = {};
    if (!createEmployee.username) newError.username = "กรุณากรอกชื่อผู้ใช้";
    if (!createEmployee.password) newError.password = "กรุณากรอกรหัสผ่าน";
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
        createEmployee.password
      )
    )
      newError.password =
        "รหัสผ่านต้องมี 8-15 ตัวอักษรและต้องมีอักษรตัวใหญ่, ตัวเล็ก, ตัวเลข, อักขระพิเศษ อย่างน้อย 1 ตัว";
    if (!createEmployee.confirmPassword)
      newError.confirmPassword = "กรุณากรอกยืนยันรหัสผ่าน";
    if (createEmployee.password !== createEmployee.confirmPassword)
      newError.confirmPassword = "กรุณาระบุยืนยันรหัสผ่านให้ตรงกับรหัสผ่าน";
    if (!createEmployee.firstName) newError.firstName = "กรุณากรอกชื่อ";
    if (!createEmployee.lastName) newError.lastName = "กรุณากรอกนามสกุล";
    if (!createEmployee.address) newError.address = "กรุณากรอกที่อยู่";
    if (!createEmployee.gender) newError.gender = "กรุณากรอกเพศ";
    if (!createEmployee.birthDate) newError.birthDate = "กรุณากรอกวันเกิด";
    if (!createEmployee.startDate) newError.startDate = "กรุณากรอกวันเริ่มงาน";
    if (!createEmployee.role) newError.role = "กรุณากรอกตำแหน่ง";
    if (!createEmployee.phone) newError.phone = "กรุณากรอกเบอร์โทรศัพท์";
    if (!createEmployee.email) newError.email = "กรุณากรอกอีเมล";
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        createEmployee.email
      )
    )
      newError.email = "อีเมลไม่ถูกต้อง";
    if (!createEmployee.nationalId)
      newError.nationalId = "กรุณากรอกเลขบัตรประชาชน";
    if (createEmployee.nationalId.length !== 13)
      newError.nationalId = "เลขประจำตัวประชาชนต้องมี 13 หลัก";
    const digit = checkNationalID(createEmployee.nationalId);
    if (createEmployee.nationalId.slice(-1) !== digit)
      newError.nationalId = "เลขบัตรประชาชนไม่ถูกต้อง";
    setError(newError);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      validateInput();
      const res = await axios.post("/users/register", {
        username: createEmployee.username,
        firstName: createEmployee.firstName,
        lastName: createEmployee.lastName,
        email: createEmployee.email,
        password: createEmployee.password,
        confirmPassword: createEmployee.confirmPassword,
        address: createEmployee.address,
        status: "active",
        gender: createEmployee.gender,
        birthDate: createEmployee.birthDate,
        nationalId: createEmployee.nationalId,
        phone: createEmployee.phone,
        startDate: createEmployee.startDate,
        role: createEmployee.role,
        imgPath: createEmployee.imgPath,
      });
      history.push("/employees-management");
    } catch (err) {
      if (err.response) {
        setError({ server: err.response.data.message });
      } else {
        setError({ front: err.message });
      }
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setCreateEmployee({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      gender: "",
      birthDate: "",
      nationalId: "",
      phone: "",
      startDate: "",
      role: "",
      imgPath: "",
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/employees-management");
  };

  return (
    <Box py="5" px="40">
      <Box>
        <Box textAlign="center" my="5">
          <h1>
            <b>ลงทะเบียนพนักงาน</b>
          </h1>
        </Box>
        <Box>
          <hr />
        </Box>
        <Box>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <Flex flexFlow="column wrap">
                <FormLabel my="3">ชื่อผู้ใช้งาน:</FormLabel>
                <Input
                  name="username"
                  value={createEmployee.username}
                  placeholder="ชื่อผู้ใช้งาน"
                  onChange={handleInputChange}
                />
              </Flex>
              <Flex flexFlow="column wrap">
                <FormLabel my="3">รหัสผ่าน:</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={createEmployee.password}
                  placeholder="รหัสผ่าน"
                  onChange={handleInputChange}
                />
              </Flex>
              <Flex flexFlow="column wrap">
                <FormLabel my="3">ยืนยันรหัสผ่าน:</FormLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={createEmployee.confirmPassword}
                  placeholder="ยืนยันรหัสผ่าน"
                  onChange={handleInputChange}
                />
              </Flex>
              <Flex flexFlow="column wrap">
                <FormLabel my="3">เลขประจำตัวประชาชน:</FormLabel>
                <Input
                  name="nationalId"
                  value={createEmployee.nationalId}
                  placeholder="เลขประจำตัวประชาชน"
                  onChange={handleInputChange}
                />
              </Flex>
              <Flex flexFlow="column wrap">
                <FormLabel my="3">อีเมล:</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={createEmployee.email}
                  placeholder="อีเมล"
                  onChange={handleInputChange}
                />
              </Flex>
              <Flex flexFlow="column wrap">
                <FormLabel my="3">ชื่อ-นามสกุล:</FormLabel>
                <Flex justifyContent="space-between">
                  <Box mr="4" maxW="600px" w="100%">
                    <Input
                      name="firstName"
                      value={createEmployee.firstName}
                      placeholder="ชื่อ"
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box ml="4" maxW="600px" w="100%">
                    <Input
                      name="lastName"
                      value={createEmployee.lastName}
                      placeholder="นามสกุล"
                      onChange={handleInputChange}
                    />
                  </Box>
                </Flex>
              </Flex>
              <Flex justifyContent="space-between">
                <Flex flexFlow="column wrap">
                  <FormLabel my="3">เพศ:</FormLabel>
                  <Box mr="4">
                    <Select
                      name="gender"
                      onChange={handleInputChange}
                      placeholder="กรุณาเลือกเพศ"
                    >
                      <option value="male">ชาย</option>
                      <option value="female">หญิง</option>
                    </Select>
                  </Box>
                </Flex>
                <Flex flexFlow="column wrap">
                  <FormLabel my="3">วันเกิด:</FormLabel>
                  <Box ml="4">
                    <Input
                      type="date"
                      name="birthDate"
                      value={createEmployee.birthDate}
                      placeholder="วันเกิด"
                      onChange={handleInputChange}
                    />
                  </Box>
                </Flex>
                <Flex flexFlow="column wrap">
                  <FormLabel my="3">วันเริ่มทำงาน:</FormLabel>
                  <Box ml="4">
                    <Input
                      type="date"
                      name="startDate"
                      value={createEmployee.startDate}
                      placeholder="วันเริ่มทำงาน"
                      onChange={handleInputChange}
                    />
                  </Box>
                </Flex>
                <Flex flexFlow="column wrap">
                  <FormLabel my="3">ตำแหน่ง:</FormLabel>
                  <Box mr="4">
                    <Select
                      name="role"
                      onChange={handleInputChange}
                      placeholder="กรุณาเลือกตำแหน่ง"
                    >
                      <option value="gardener">คนสวน</option>
                      <option value="sales">พนักงานขาย</option>
                    </Select>
                  </Box>
                </Flex>
              </Flex>

              <Flex flexFlow="column wrap">
                <FormLabel>ที่อยู่:</FormLabel>
                <Textarea
                  name="address"
                  value={createEmployee.address}
                  placeholder="ที่อยู่"
                  onChange={handleInputChange}
                />
              </Flex>
              <Flex flexFlow="column wrap">
                <FormLabel my="3">เบอร์โทรศัพท์:</FormLabel>
                <Input
                  name="phone"
                  value={createEmployee.phone}
                  placeholder="เบอร์โทรศัพท์"
                  onChange={handleInputChange}
                />
              </Flex>
            </FormControl>
            <Flex my="5">
              <Box>
                <input type="file" onChange={handleUpload} />
              </Box>
              <Box>
                <Image src={createEmployee.imgPath} />
              </Box>
            </Flex>

            <Flex my="10" justifyContent="center">
              <Box mx="3">
                <Button variant="primary" type="submit" size="sm">
                  ตกลง
                </Button>
              </Box>
              <Box mx="3">
                <Button variant="primary" size="sm" onClick={handleReset}>
                  ล้าง
                </Button>
              </Box>
              <Box mx="3">
                <Button variant="primary" size="sm" onClick={handleCancel}>
                  ยกเลิก
                </Button>
              </Box>
            </Flex>
            <Box my="5">
              <hr />
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default AddEmployeeComponent;
