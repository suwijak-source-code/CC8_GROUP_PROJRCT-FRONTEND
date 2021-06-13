import { Flex, FormControl, FormLabel, Input, Box, Button, Textarea, Select, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axios from "../../../../config/axios";
import { useSelector } from "react-redux";



const EditEmployeeComponent = () => {
    const [editEmployee, setEditEmployee] = useState({
        firstName: '', lastName: '', email: '', address: '', gender: '', birthDate: '', nationalId: '',
        phone: '', startDate: '', role: '', imgPath: '', status: ''
    });
    const [error, setError] = useState({});

    const history = useHistory();
    const editEmployeeProfile = useSelector((state) => state.profile.editEmployeeProfile);

    useEffect(() => {
        setEditEmployee({
            firstName: editEmployeeProfile.firstName, lastName: editEmployeeProfile.lastName, email: editEmployeeProfile.email,
            address: editEmployeeProfile.address, gender: editEmployeeProfile.gender, birthDate: editEmployeeProfile.birthDate,
            nationalId: editEmployeeProfile.nationalId, phone: editEmployeeProfile.phone, startDate: editEmployeeProfile.startDate,
            role: editEmployeeProfile.role, imgPath: editEmployeeProfile.imgPath, status: editEmployeeProfile.status
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditEmployee(prev => ({ ...prev, [name]: value }));
    };

    const handleUpload = async (e) => {
        try {
            if (e.target.files[0]) {
                const formData = new FormData();
                formData.append('image', e.target.files[0]);
                const res = await axios.post('/users/upload', formData);
                setEditEmployee(prev => ({ ...prev, imgPath: res.data.secure_url.secure_url }));
            } else {
                setEditEmployee(prev => ({ ...prev, imgPath: '' }))
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
            num += ((+nationalId[index]) * (13 - index));
        }
        let digit = (11 - (num % 11)).toString().slice(-1);
        return digit;
    }

    const validateInput = () => {
        const newError = {};
        if (!editEmployee.firstName) newError.firstName = 'กรุณากรอกชื่อ';
        if (!editEmployee.lastName) newError.lastName = 'กรุณากรอกนามสกุล';
        if (!editEmployee.address) newError.address = 'กรุณากรอกที่อยู่';
        if (!editEmployee.gender) newError.gender = 'กรุณากรอกเพศ';
        if (!editEmployee.birthDate) newError.birthDate = 'กรุณากรอกวันเกิด';
        if (!editEmployee.startDate) newError.startDate = 'กรุณากรอกวันเริ่มงาน';
        if (!editEmployee.role) newError.role = 'กรุณากรอกตำแหน่ง';
        if (!editEmployee.phone) newError.phone = 'กรุณากรอกเบอร์โทรศัพท์';
        if (!editEmployee.status) newError.status = 'กรุณากรอกสถานะ';
        if (!editEmployee.email) newError.email = 'กรุณากรอกอีเมล';
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(editEmployee.email)) newError.email = 'อีเมลไม่ถูกต้อง';
        if (!editEmployee.nationalId) newError.nationalId = 'กรุณากรอกเลขบัตรประชาชน';
        if (editEmployee.nationalId.length !== 13) newError.nationalId = 'เลขประจำตัวประชาชนต้องมี 13 หลัก';
        const digit = checkNationalID(editEmployee.nationalId);
        if (editEmployee.nationalId.slice(-1) !== digit) newError.nationalId = 'เลขบัตรประชาชนไม่ถูกต้อง';
        setError(newError);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            validateInput();
            const res = await axios.put(`/users/${editEmployeeProfile.id}`, {
                firstName: editEmployee.firstName, lastName: editEmployee.lastName, email: editEmployee.email,
                address: editEmployee.address, gender: editEmployee.gender, birthDate: editEmployee.birthDate,
                nationalId: editEmployee.nationalId, phone: editEmployee.phone, startDate: editEmployee.startDate,
                role: editEmployee.role, imgPath: editEmployee.imgPath, status: editEmployee.status
            });
            history.push('/employees-management');
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            };
        };
    };

    const handleReset = (e) => {
        e.preventDefault();
        setEditEmployee({
            firstName: '', lastName: '', email: '', address: '', gender: '', birthDate: '', nationalId: '',
            phone: '', startDate: '', role: '', imgPath: '', status: ''
        });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/employees-management');
    };
    return (
        <Box py="5" px="40">
            <Box >
                <Box textAlign="center" my="5">
                    <h1><b>แก้ไขประวัติพนักงาน</b></h1>
                </Box>
                <Box><hr /></Box>
                <Box>
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">เลขประจำตัวประชาชน:</FormLabel>
                                <Input name="nationalId" value={editEmployee.nationalId} placeholder="เลขประจำตัวประชาชน"
                                    onChange={handleInputChange} />
                                {error.nationalId && <Box as="span" textAlign="center" color="#E53E3E">{error.nationalId}</Box>}
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">อีเมล:</FormLabel>
                                <Input type="email" name="email" value={editEmployee.email} placeholder="อีเมล"
                                    onChange={handleInputChange} />
                                {error.email && <Box as="span" textAlign="center" color="#E53E3E">{error.email}</Box>}
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">ชื่อ-นามสกุล:</FormLabel>
                                <Flex justifyContent="space-between">
                                    <Box mr="4" maxW="600px" w="100%">
                                        <Input name="firstName" value={editEmployee.firstName} placeholder="ชื่อ"
                                            onChange={handleInputChange} />
                                        {error.firstName && <Box as="span" textAlign="center" color="#E53E3E">{error.firstName}</Box>}
                                    </Box>
                                    <Box ml="4" maxW="600px" w="100%">
                                        <Input name="lastName" value={editEmployee.lastName} placeholder="นามสกุล"
                                            onChange={handleInputChange} />
                                        {error.lastName && <Box as="span" textAlign="center" color="#E53E3E">{error.lastName}</Box>}
                                    </Box>
                                </Flex>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <Flex flexFlow="column wrap">
                                    <FormLabel my="3">เพศ:</FormLabel>
                                    <Box mr="4">
                                        <Select name="gender" value={editEmployee.gender} onChange={handleInputChange} placeholder="กรุณาเลือกเพศ">
                                            <option value="male">ชาย</option>
                                            <option value="female">หญิง</option>
                                        </Select>
                                        {error.gender && <Box as="span" textAlign="center" color="#E53E3E">{error.gender}</Box>}
                                    </Box>
                                </Flex>
                                <Flex flexFlow="column wrap">
                                    <FormLabel my="3">วันเกิด:</FormLabel>
                                    <Box ml="4">
                                        <Input type="date" name="birthDate" value={editEmployee.birthDate} placeholder="วันเกิด"
                                            onChange={handleInputChange} />
                                        {error.birthDate && <Box as="span" textAlign="center" color="#E53E3E">{error.birthDate}</Box>}
                                    </Box>
                                </Flex>
                                <Flex flexFlow="column wrap">
                                    <FormLabel my="3">วันเริ่มทำงาน:</FormLabel>
                                    <Box ml="4">
                                        <Input type="date" name="startDate" value={editEmployee.startDate} placeholder="วันเริ่มทำงาน"
                                            onChange={handleInputChange} />
                                        {error.startDate && <Box as="span" textAlign="center" color="#E53E3E">{error.startDate}</Box>}
                                    </Box>
                                </Flex>
                                <Flex flexFlow="column wrap">
                                    <FormLabel my="3">ตำแหน่ง:</FormLabel>
                                    <Box mr="4">
                                        <Select name="role" value={editEmployee.role} onChange={handleInputChange} placeholder="กรุณาเลือกตำแหน่ง">
                                            <option value="admin">ผู้ดูแล</option>
                                            <option value="gardener">คนสวน</option>
                                            <option value="sales">พนักงานขาย</option>
                                        </Select>
                                        {error.role && <Box as="span" textAlign="center" color="#E53E3E">{error.role}</Box>}
                                    </Box>
                                </Flex>
                                <Flex flexFlow="column wrap">
                                    <FormLabel my="3">สถานะ:</FormLabel>
                                    <Box mr="4">
                                        <Select name="status" value={editEmployee.status} onChange={handleInputChange} placeholder="กรุณาเลือกตำแหน่ง">
                                            <option value="active">พนักงาน</option>
                                            <option value="break">พักงาน</option>
                                            <option value="quited">ลาออก</option>
                                        </Select>
                                        {error.status && <Box as="span" textAlign="center" color="#E53E3E">{error.status}</Box>}
                                    </Box>
                                </Flex>
                            </Flex>

                            <Flex flexFlow="column wrap">
                                <FormLabel >ที่อยู่:</FormLabel>
                                <Textarea name="address" value={editEmployee.address} placeholder="ที่อยู่"
                                    onChange={handleInputChange} />
                                {error.address && <Box as="span" textAlign="center" color="#E53E3E">{error.address}</Box>}
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">เบอร์โทรศัพท์:</FormLabel>
                                <Input name="phone" value={editEmployee.phone} placeholder="เบอร์โทรศัพท์"
                                    onChange={handleInputChange} />
                                {error.phone && <Box as="span" textAlign="center" color="#E53E3E">{error.phone}</Box>}
                            </Flex>
                        </FormControl>
                        <Flex my="5">
                            <Box>
                                <input type="file" onChange={handleUpload} />
                            </Box>
                            <Box>
                                <Image src={editEmployee.imgPath} />
                            </Box>
                        </Flex>

                        <Flex my="10" justifyContent="center">
                            <Box mx="3">
                                <Button variant="primary" type="submit" size="sm">ตกลง</Button>
                            </Box>
                            <Box mx="3">
                                <Button variant="primary" size="sm" onClick={handleReset}>ล้าง</Button>
                            </Box>
                            <Box mx="3">
                                <Button variant="primary" size="sm" onClick={handleCancel}>ยกเลิก</Button>
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

export default EditEmployeeComponent;