import { Flex, Box, Button, Image } from "@chakra-ui/react";
import axios from "../../../../config/axios";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEditEmployeeProfile } from '../../../../features/Profile/ProfileSlice';


const ListEmployeeComponent = ({ item }) => {
    const [error, setError] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();

    const handleEdit = async (item, e) => {
        e.preventDefault();
        dispatch(setEditEmployeeProfile(item));
        history.push('/edit-employees');
    }

    const handleSuspended = async (e) => {
        try {
            const res = await axios.patch(`/users/${item.id}`, { status: 'break' });
            window.location.reload(true);
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        };
    };

    const handleQuited = async (e) => {
        try {
            const res = await axios.patch(`/users/${item.id}`, { status: 'quited' });
            window.location.reload(true);
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        };
    };

    return (
        <Flex border="1px solid lightgrey" borderRadius="xl" my="5" p="5" flexFlow="column wrap">
            <Flex flexFlow="row wrap" bg="muted.300" borderRadius="xl" alignItems="center"
                justifyContent="space-between" px="20">
                <Flex w="94px" h="132px">
                    {item.imgPath && <Image src={item.imgPath} />}
                    {!item.imgPath && <Flex w="94px" h="132px" bg="muted.200" justifyContent="center" alignItems="center">รูปภาพ</Flex>}
                </Flex>
                <Flex flexFlow="column wrap" maxW="890px" w="100%">
                    <Flex justifyContent="space-between" my="3">
                        <Box mx="3">
                            <Box as='span'>ชื่อ-นามสกุล:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.firstName} {item.lastName}</Box>
                        </Box>
                        <Box mx="3">
                            <Box as='span'>ตำแหน่ง:</Box>&nbsp;&nbsp;
                            {item.role === 'gardener' && <Box as='span'>คนสวน</Box>}
                            {item.role === 'sales' && <Box as='span'>พนักงานขาย</Box>}
                        </Box>
                        <Box mx="3">
                            <Box as='span'>เพศ:</Box>&nbsp;&nbsp;
                            {item.gender === 'male' && <Box as='span'>ชาย</Box>}
                            {item.gender === 'female' && <Box as='span'>หญิง</Box>}
                        </Box>
                        <Box mx="3">
                            <Box as='span'>สถานะ:</Box>&nbsp;&nbsp;
                            {item.status === 'active' && <Box as='span'>พนักงาน</Box>}
                            {item.status === 'break' && <Box as='span'>พักงาน</Box>}
                            {item.status === 'quited' && <Box as='span'>ลาออก</Box>}
                        </Box>
                    </Flex>
                    <Flex justifyContent="space-between" my="3">
                        <Box mx="3">
                            <Box as='span'>เลขประจำตัวประชาชน:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.nationalId}</Box>
                        </Box>
                        <Box mx="3">
                            <Box as='span'>วันเกิด:</Box>&nbsp;&nbsp;
                            <Box as='span'>{`${("0" + (new Date(item.birthDate).getDate())).slice(-2)}/
                            ${("0" + (new Date(item.birthDate).getMonth() + 1)).slice(-2)}/
                            ${((new Date(item.birthDate).getFullYear()))}`}</Box>
                        </Box>
                        <Box mx="3">
                            <Box as='span'>วันเริ่มงาน:</Box>&nbsp;&nbsp;
                            <Box as='span'>{`${("0" + (new Date(item.startDate).getDate())).slice(-2)}/
                            ${("0" + (new Date(item.startDate).getMonth() + 1)).slice(-2)}/
                            ${((new Date(item.startDate).getFullYear()))}`}</Box>
                        </Box>
                        <Box mx="3">
                            <Box as='span'>วันลาออก:</Box>&nbsp;&nbsp;
                            {item.endDate && <Box as='span'>{`${("0" + (new Date(item.endDate).getDate())).slice(-2)}/
                            ${("0" + (new Date(item.endDate).getMonth() + 1)).slice(-2)}/
                            ${((new Date(item.endDate).getFullYear()))}`}</Box>}
                            {!item.endDate && <Box as='span'>-</Box>}

                        </Box>
                    </Flex>
                    <Flex justifyContent="space-between" my="3">
                        <Box mx="3">
                            <Box as='span'>อีเมล:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.email}</Box>
                        </Box>
                        <Box mx="3">
                            <Box as='span'>เบอร์โทรศัพท์:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.phone}</Box>
                        </Box>
                        <Box mx="3">
                            <Box as='span'>ผู้อนุมัติ:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.approvedBy}</Box>
                        </Box>
                    </Flex>
                    <Flex justifyContent="space-between" my="3">
                        <Box mx="3">
                            <Box as='span'>ที่อยู่:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.address}</Box>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
            <Box>
                <Flex justifyContent="flex-end" m="4">
                    <Box mx="3">
                        {item.status === 'quited' && <Button variant="primary" size="sm" disabled>แก้ไข</Button>}
                        {item.status !== 'quited' && <Button variant="primary" size="sm" onClick={(e) => handleEdit(item, e)}>แก้ไข</Button>}
                    </Box>
                    <Box mx="3">
                        {item.status === 'active' && <Button variant="primary" size="sm" onClick={handleSuspended}>พักงาน</Button>}
                        {item.status !== 'active' && <Button variant="primary" size="sm" disabled>พักงาน</Button>}
                    </Box>
                    <Box mx="3">
                        {item.status === 'quited' && <Button variant="primary" size="sm" disabled>ลาออก</Button>}
                        {item.status !== 'quited' && <Button variant="primary" size="sm" onClick={handleQuited}>ลาออก</Button>}

                    </Box>
                </Flex>
            </Box>
        </Flex>
    )
}

export default ListEmployeeComponent;