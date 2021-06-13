import { Flex, Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from "../../../config/axios";



const GardenerJobListComponent = ({ item }) => {
    const [error, setError] = useState({});

    console.log(item + " " + "ttt");
    const handleConfirm = async () => {
        try {
            const res = await axios.patch(`/jobs/${item.id}`, {
                status: 'in progress'
            });
            window.location.reload(true);
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        };
    };

    const handleSuccess = async () => {
        try {
            const res = await axios.patch(`/jobs/${item.id}`, {
                status: 'checking'
            });
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
        <Box>
            <Flex border="1px solid lightgrey" borderRadius="xl" my="5" p="5" flexFlow="column wrap">
                <Box bg="muted.300" borderRadius="xl" p="5">
                    <Flex my="4" justifyContent="space-between">
                        <Box>
                            <Box as='span'>งาน:</Box>&nbsp;&nbsp;
                            {item.mission === 'gardening' && <span>หว่านเมล็ดและดูแล</span>}
                            {item.mission === 'harvest' && <span>เก็บเกี่ยวผลผลิต</span>}
                        </Box>
                        <Box>
                            <Box as='span'>ชื่อแปลงปลูก:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.Planting.Farm.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>ชื่อเมล็ดพันธุ์:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.Planting.Seed.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>ผู้มอบหมายงาน:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.Assignor.firstName} {item.Assignor.lastName}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>สถานะ:</Box>&nbsp;&nbsp;
                            {item.status === 'assign' && <Box as='span'>รอยืนยัน</Box>}
                            {item.status === 'in progress' && <Box as='span' color="#e6c12f" >กำลังดำเนินการ</Box>}
                            {item.status === 'checking' && <Box as='span' color="#e6c12f" >รอตรวจสอบ</Box>}
                            {item.status === 'finish' && <Box as='span' color="#008000" >เสร็จสิ้น</Box>}
                            {item.status === 'cancel' && <Box as='span' color="#ff0000" >ยกเลิก</Box>}
                        </Box>
                    </Flex>
                </Box>
                <Box>
                    <Flex justifyContent="flex-end" m="4">
                        <Box mx="3">
                            {item.status === 'assign' && <Button variant="primary" size="sm" onClick={handleConfirm}>รับทราบ</Button>}
                            {item.status !== 'assign' && <Button variant="primary" size="sm" disabled>รับทราบ</Button>}
                        </Box>
                        <Box mx="3">
                            {item.status === 'in progress' && <Button variant="primary" size="sm" onClick={handleSuccess}>เสร็จสิ้น</Button>}
                            {item.status !== 'in progress' && <Button variant="primary" size="sm" disabled onClick={handleSuccess}>เสร็จสิ้น</Button>}

                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

export default GardenerJobListComponent;