import { Flex, Box, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setEachJob, setEachAssign } from "../../../../features/WorkPlanManagement/WorkPlanManagementSlice";
import { useState, useEffect } from "react";
import axios from "../../../../config/axios";
import { useHistory } from 'react-router-dom';



const WorkPlanListComponent = ({ item, setOpenAssign, setOpenEdit, setOpenFinish }) => {
    const [assign, setAssign] = useState({})
    const [error, setError] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();
    const assignments = useSelector((state) => state.workPlanManagement.assignments);


    useEffect(() => {
        assignments.map((value) => {
            let mission;
            if (value.mission === 'gardening') {
                mission = 'started';
            } else if (value.mission === 'harvest') {
                mission = 'harvested';
            }
            const date = value.assignDate;
            const currentDate = `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}`;
            if (value.plantingId === item.id && currentDate === date) {
                if (item.status === mission || item.status === 'finished') {
                    setAssign(value);
                }
            }
        })
    }, []);

    const handleOpenAssign = (item, e) => {
        e.preventDefault();
        dispatch(setEachJob(item));
        setOpenAssign(true);
    };

    const handleEdit = (item, assign, e) => {
        e.preventDefault();
        dispatch(setEachJob(item));
        dispatch(setEachAssign(assign));
        setOpenEdit(true);
    };

    const handleCheck = async (item, assign, e) => {
        try {
            if (item.status === 'started') {
                await axios.patch(`/jobs/${assign.id}`, { status: 'finish' });
                window.location.reload(true);
            } else if (item.status === 'harvested') {
                e.preventDefault();
                setOpenFinish(true);
                dispatch(setEachJob(item));
                dispatch(setEachAssign(assign));
            }
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            };
        };
    };

    const handleCancel = async (item, assign, e) => {
        try {
            if (item.assignStatus === 'notAssign') {
                await axios.patch(`/plantings/cancel-job/${item.id}`);
                window.location.reload(true);
            } else if (item.assignStatus === 'assign') {
                await axios.patch(`/jobs/cancel/${assign.id}`);
                window.location.reload(true);
            }
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            };
        };
    };

    return (

        <Box>
            <Flex border="1px solid lightgrey" borderRadius="xl" my="5" p="5" flexFlow="column wrap">
                <Box bg="muted.300" borderRadius="xl" p="5">
                    <Flex my="4" justifyContent="space-between">
                        <Box>
                            <Box as='span'>งาน:</Box>&nbsp;&nbsp;
                            {item.status === 'started' && <span>หว่านเมล็ดและดูแล</span>}
                            {item.status === 'harvested' && <span>เก็บเกี่ยวผลผลิต</span>}
                            {item.status === 'finished' && <span>เก็บเกี่ยวผลผลิต</span>}
                        </Box>
                        <Box>
                            <Box as='span'>ชื่อแปลงปลูก:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.Farm.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>ชื่อเมล็ดพันธุ์:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.Seed.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>สถานะ:</Box>&nbsp;&nbsp;
                            {item.assignStatus === 'notAssign' && <Box as='span'>ยังไม่ได้มอบหมาย</Box>}
                            {item.assignStatus === 'assign' && <Box as='span'>มอบหมาย</Box>}
                        </Box>
                    </Flex>
                    {item.assignStatus === 'assign' && assign.Assignor && assign.Staff &&
                        <Box >
                            {assign.status !== 'finish' && <Flex my="4" justifyContent="flex-start">
                                <Box>
                                    <Box as='span'>ผู้รับผิดชอบ:</Box>&nbsp;&nbsp;
                                    <Box as='span'>{assign.Staff.firstName} {assign.Staff.lastName}</Box>
                                </Box>
                                <Box ml="148px">
                                    <Box as='span'>ผู้มอบหมาย:</Box>&nbsp;&nbsp;
                                    <Box as='span'>{assign.Assignor.firstName} {assign.Assignor.lastName}</Box>
                                </Box>
                                <Box ml="148px">
                                    <Box as='span'>สถานะการทำงาน:</Box>&nbsp;&nbsp;
                                    {assign.status === 'assign' && <Box as='span'>รอยืนยัน</Box>}
                                    {assign.status === 'in progress' && <Box as='span' color="#e6c12f" >กำลังดำเนินการ</Box>}
                                    {assign.status === 'checking' && <Box as='span' color="#e6c12f" >รอตรวจสอบ</Box>}
                                    {assign.status === 'finish' && <Box as='span' color="#008000" >เสร็จสิ้น</Box>}
                                    {assign.status === 'cancel' && <Box as='span' color="#ff0000" >ยกเลิก</Box>}
                                </Box>
                            </Flex>
                            }
                            {assign.status === 'finish' &&
                                <Flex my="4" justifyContent="space-between">
                                    <Box>
                                        <Box as='span'>ผู้รับผิดชอบ:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{assign.Staff.firstName} {assign.Staff.lastName}</Box>
                                    </Box>
                                    <Box>
                                        <Box as='span'>ผู้มอบหมาย:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{assign.Assignor.firstName} {assign.Assignor.lastName}</Box>
                                    </Box>
                                    <Box>
                                        <Box as='span'>สถานะการทำงาน:</Box>&nbsp;&nbsp;
                                        {assign.status === 'assign' && <Box as='span' >รอยืนยัน</Box>}
                                        {assign.status === 'in progress' && <Box as='span' color="#e6c12f" >กำลังดำเนินการ</Box>}
                                        {assign.status === 'checking' && <Box as='span' color="#e6c12f" >รอตรวจสอบ</Box>}
                                        {assign.status === 'finish' && <Box as='span' color="#008000" >เสร็จสิ้น</Box>}
                                        {assign.status === 'cancel' && <Box as='span' color="#ff0000" >ยกเลิก</Box>}
                                    </Box>
                                    <Box>
                                        <Box as='span'>ผู้ตรวจสอบการทำงาน:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{assign.Examiner.firstName} {assign.Examiner.lastName}</Box>
                                    </Box>
                                    {assign.status === 'cancel' && <Box>
                                        <Box as='span'>ผู้ยกเลิก:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{assign.Canceler.firstName} {assign.Canceler.lastName}</Box>
                                    </Box>}
                                </Flex>
                            }
                        </Box>
                    }
                </Box>
                <Box>
                    <Flex justifyContent="flex-end" m="4">
                        <Box mx="3">
                            {item.assignStatus === 'notAssign' && <Button variant="primary" size="sm" onClick={(e) => handleOpenAssign(item, e)}>มอบหมาย</Button>}
                        </Box>
                        {item.assignStatus === 'assign' && assign.status === 'assign' && <Box mx="3">
                            <Button variant="primary" size="sm" onClick={(e) => handleEdit(item, assign, e)}>แก้ไข</Button>
                        </Box>}
                        {item.assignStatus === 'assign' && assign.status !== 'assign' && <Box mx="3">
                            <Button variant="primary" size="sm" disabled>แก้ไข</Button>
                        </Box>}
                        {item.assignStatus === 'assign' && assign.status === 'checking' && <Box mx="3">
                            <Button variant="primary" size="sm" onClick={(e) => handleCheck(item, assign, e)}>เสร็จสิ้น</Button>
                        </Box>}
                        {item.assignStatus === 'assign' && assign.status !== 'checking' && <Box mx="3">
                            <Button variant="primary" size="sm" disabled>เสร็จสิ้น</Button>
                        </Box>}
                        {item.assignStatus !== 'assign' && <Box mx="3">
                            <Button variant="primary" size="sm" onClick={(e) => handleCancel(item, assign, e)}>ยกเลิก</Button>
                        </Box>}
                        {item.assignStatus === 'assign' && assign.status !== 'finish' && <Box mx="3">
                            <Button variant="primary" size="sm" onClick={(e) => handleCancel(item, assign, e)}>ยกเลิก</Button>
                        </Box>}
                        {item.assignStatus === 'assign' && assign.status === 'finish' && <Box mx="3">
                            <Button variant="primary" size="sm" disabled onClick={(e) => handleCancel(item, assign, e)}>ยกเลิก</Button>
                        </Box>}

                    </Flex>
                </Box>
            </Flex>
        </Box >

    )
}

export default WorkPlanListComponent;