import { Icon, Button, Box, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Input, Link } from "@chakra-ui/react";
import axios from "../../../../config/axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, setPageNumber } from "../../../../features/Paginate/PaginateSlice";
import { setEachJob, setEachAssign } from "../../../../features/WorkPlanManagement/WorkPlanManagementSlice";



const AssignWorkListComponent = ({ setOpenEdit, setOpenFinish }) => {
    const [jobList, setJobList] = useState([]);
    const [assign, setAssign] = useState(true);
    const [inprogress, setInprogress] = useState(false);
    const [checking, setChecking] = useState(false);
    const [finish, setFinish] = useState(false);
    const [error, setError] = useState({});

    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.paginate.currentPage);
    const listPerPage = useSelector((state) => state.paginate.listPerPage);


    useEffect(() => {
        const fetchJobList = async () => {
            const res = await axios.get(`/jobs/assign-job/${'assign'}`);
            setJobList(res.data.jobAssign);
            if (res.data.jobAssign && res.data.jobAssign.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.jobAssign.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.jobAssign.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                }
                dispatch(setPageNumber(pageNumberTmp));
            };
        }
        fetchJobList()
    }, []);

    const handleAssign = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.get(`/jobs/assign-job/${'assign'}`);
            setJobList(res.data.jobAssign);
            if (res.data.jobAssign && res.data.jobAssign.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.jobAssign.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.jobAssign.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                }
                dispatch(setPageNumber(pageNumberTmp));
            };
            setAssign(true);
            setInprogress(false);
            setChecking(false);
            setFinish(false);
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    };

    const handleInprogress = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.get(`/jobs/assign-job/${'in progress'}`);
            setJobList(res.data.jobAssign);
            if (res.data.jobAssign && res.data.jobAssign.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.jobAssign.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.jobAssign.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                }
                dispatch(setPageNumber(pageNumberTmp));
            };
            setAssign(false);
            setInprogress(true);
            setChecking(false);
            setFinish(false);
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    };

    const handleChecking = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.get(`/jobs/assign-job/${'checking'}`);
            setJobList(res.data.jobAssign);
            if (res.data.jobAssign && res.data.jobAssign.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.jobAssign.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.jobAssign.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                }
                dispatch(setPageNumber(pageNumberTmp));
            };
            setAssign(false);
            setInprogress(false);
            setChecking(true);
            setFinish(false);
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    };

    const handleFinish = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.get(`/jobs/assign-job/${'finish'}`);
            setJobList(res.data.jobAssign);
            if (res.data.jobAssign && res.data.jobAssign.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.jobAssign.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.jobAssign.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                }
                dispatch(setPageNumber(pageNumberTmp));
            };
            setAssign(false);
            setInprogress(false);
            setChecking(false);
            setFinish(true);
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    };

    const handleEdit = (item, e) => {
        e.preventDefault();
        dispatch(setEachJob(item));
        dispatch(setEachAssign(item));
        setOpenEdit(true);
    };

    const handleCheck = async (item, e) => {
        try {
            if (item.Planting.status === 'started') {
                await axios.patch(`/jobs/${item.id}`, { status: 'finish' });
                window.location.reload(true);
            } else if (item.Planting.status === 'harvested') {
                e.preventDefault();
                setOpenFinish(true);
                dispatch(setEachJob(item));
                dispatch(setEachAssign(item));
            }
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            };
        };
    };

    const handleCancel = async (item, e) => {
        try {
            if (item.Planting.assignStatus === 'notAssign') {
                await axios.patch(`/plantings/cancel-job/${item.Planting.id}`);
                window.location.reload(true);
            } else if (item.Planting.assignStatus === 'assign') {
                await axios.patch(`/jobs/cancel/${item.id}`);
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

    const indexOfLastPost = currentPage * listPerPage;
    const indexOfFirstPost = indexOfLastPost - listPerPage;
    const currentJobList = jobList.slice(indexOfFirstPost, indexOfLastPost);


    return (
        <Box>
            <Flex justifyContent="center" p="4">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={handleAssign}>รอยืนยัน</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={handleInprogress}>กำลังดำเนินการ</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={handleChecking}>ตรวจสอบ</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={handleFinish}>สำเร็จ</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Flex>
            <Box my="4"><hr /></Box>

            {assign && currentJobList.map((item, index) =>
                <Flex key={index} border="1px solid lightgrey" borderRadius="xl" my="5" p="5" flexFlow="column wrap">
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
                                <Box as='span'>สถานะ:</Box>&nbsp;&nbsp;
                                {item.Planting.assignStatus === 'notAssign' && <Box as='span'>ยังไม่ได้มอบหมาย</Box>}
                                {item.Planting.assignStatus === 'assign' && <Box as='span'>มอบหมาย</Box>}
                            </Box>
                        </Flex>
                        {item.status !== 'finish' && <Flex my="4" justifyContent="flex-start">
                            <Box>
                                <Box as='span'>ผู้รับผิดชอบ:</Box>&nbsp;&nbsp;
                                    <Box as='span'>{item.Staff.firstName} {item.Staff.lastName}</Box>
                            </Box>
                            <Box ml="148px">
                                <Box as='span'>ผู้มอบหมาย:</Box>&nbsp;&nbsp;
                                    <Box as='span'>{item.Assignor.firstName} {item.Assignor.lastName}</Box>
                            </Box>
                            <Box ml="148px">
                                <Box as='span'>สถานะการทำงาน:</Box>&nbsp;&nbsp;
                                {item.status === 'assign' && <Box as='span'>รอยืนยัน</Box>}
                                {item.status === 'in progress' && <Box as='span' color="#e6c12f" >กำลังดำเนินการ</Box>}
                                {item.status === 'checking' && <Box as='span' color="#e6c12f" >รอตรวจสอบ</Box>}
                                {item.status === 'finish' && <Box as='span' color="#008000" >เสร็จสิ้น</Box>}
                                {item.status === 'cancel' && <Box as='span' color="#ff0000" >ยกเลิก</Box>}
                            </Box>
                        </Flex>}

                        {item.status === 'finish' &&
                            <Flex my="4" justifyContent="space-between">
                                <Box>
                                    <Box as='span'>ผู้รับผิดชอบ:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{item.Staff.firstName} {item.Staff.lastName}</Box>
                                </Box>
                                <Box>
                                    <Box as='span'>ผู้มอบหมาย:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{item.Assignor.firstName} {item.Assignor.lastName}</Box>
                                </Box>
                                <Box>
                                    <Box as='span'>สถานะการทำงาน:</Box>&nbsp;&nbsp;
                                    {item.status === 'assign' && <Box as='span' >รอยืนยัน</Box>}
                                    {item.status === 'in progress' && <Box as='span' color="#e6c12f" >กำลังดำเนินการ</Box>}
                                    {item.status === 'checking' && <Box as='span' color="#e6c12f" >รอตรวจสอบ</Box>}
                                    {item.status === 'finish' && <Box as='span' color="#008000" >เสร็จสิ้น</Box>}
                                    {item.status === 'cancel' && <Box as='span' color="#ff0000" >ยกเลิก</Box>}
                                </Box>
                                <Box>
                                    <Box as='span'>ผู้ตรวจสอบการทำงาน:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{item.Examiner.firstName} {item.Examiner.lastName}</Box>
                                </Box>
                                {item.status === 'cancel' && <Box>
                                    <Box as='span'>ผู้ยกเลิก:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{item.Canceler.firstName} {item.Canceler.lastName}</Box>
                                </Box>}
                            </Flex>
                        }
                    </Box>
                    <Box>
                        <Flex justifyContent="flex-end" m="4">
                            {item.Planting.assignStatus === 'assign' && item.status === 'assign' && <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleEdit(item, e)}>แก้ไข</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status !== 'assign' && <Box mx="3">
                                <Button variant="primary" size="sm" disabled>แก้ไข</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status === 'checking' && <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleCheck(item, e)}>เสร็จสิ้น</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status !== 'checking' && <Box mx="3">
                                <Button variant="primary" size="sm" disabled>เสร็จสิ้น</Button>
                            </Box>}
                            {item.Planting.assignStatus !== 'assign' && <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleCancel(item, e)}>ยกเลิก</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status !== 'finish' && <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleCancel(item, e)}>ยกเลิก</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status === 'finish' && <Box mx="3">
                                <Button variant="primary" size="sm" disabled onClick={(e) => handleCancel(item, e)}>ยกเลิก</Button>
                            </Box>}
                        </Flex>
                    </Box>
                </Flex>)}

            {inprogress && currentJobList.map((item, index) =>
                <Flex key={index} border="1px solid lightgrey" borderRadius="xl" my="5" p="5" flexFlow="column wrap">
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
                                <Box as='span'>สถานะ:</Box>&nbsp;&nbsp;
                            {item.Planting.assignStatus === 'notAssign' && <Box as='span'>ยังไม่ได้มอบหมาย</Box>}
                                {item.Planting.assignStatus === 'assign' && <Box as='span'>มอบหมาย</Box>}
                            </Box>
                        </Flex>
                        {item.status !== 'finish' && <Flex my="4" justifyContent="flex-start">
                            <Box>
                                <Box as='span'>ผู้รับผิดชอบ:</Box>&nbsp;&nbsp;
                                    <Box as='span'>{item.Staff.firstName} {item.Staff.lastName}</Box>
                            </Box>
                            <Box ml="148px">
                                <Box as='span'>ผู้มอบหมาย:</Box>&nbsp;&nbsp;
                                    <Box as='span'>{item.Assignor.firstName} {item.Assignor.lastName}</Box>
                            </Box>
                            <Box ml="148px">
                                <Box as='span'>สถานะการทำงาน:</Box>&nbsp;&nbsp;
                                {item.status === 'assign' && <Box as='span'>รอยืนยัน</Box>}
                                {item.status === 'in progress' && <Box as='span' color="#e6c12f" >กำลังดำเนินการ</Box>}
                                {item.status === 'checking' && <Box as='span' color="#e6c12f" >รอตรวจสอบ</Box>}
                                {item.status === 'finish' && <Box as='span' color="#008000" >เสร็จสิ้น</Box>}
                                {item.status === 'cancel' && <Box as='span' color="#ff0000" >ยกเลิก</Box>}
                            </Box>
                        </Flex>}

                        {item.status === 'finish' &&
                            <Flex my="4" justifyContent="space-between">
                                <Box>
                                    <Box as='span'>ผู้รับผิดชอบ:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{item.Staff.firstName} {item.Staff.lastName}</Box>
                                </Box>
                                <Box>
                                    <Box as='span'>ผู้มอบหมาย:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{item.Assignor.firstName} {item.Assignor.lastName}</Box>
                                </Box>
                                <Box>
                                    <Box as='span'>สถานะการทำงาน:</Box>&nbsp;&nbsp;
                                    {item.status === 'assign' && <Box as='span' >รอยืนยัน</Box>}
                                    {item.status === 'in progress' && <Box as='span' color="#e6c12f" >กำลังดำเนินการ</Box>}
                                    {item.status === 'checking' && <Box as='span' color="#e6c12f" >รอตรวจสอบ</Box>}
                                    {item.status === 'finish' && <Box as='span' color="#008000" >เสร็จสิ้น</Box>}
                                    {item.status === 'cancel' && <Box as='span' color="#ff0000" >ยกเลิก</Box>}
                                </Box>
                                <Box>
                                    <Box as='span'>ผู้ตรวจสอบการทำงาน:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{item.Examiner.firstName} {item.Examiner.lastName}</Box>
                                </Box>
                                {item.status === 'cancel' && <Box>
                                    <Box as='span'>ผู้ยกเลิก:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{item.Canceler.firstName} {item.Canceler.lastName}</Box>
                                </Box>}
                            </Flex>
                        }
                    </Box>
                    <Box>
                        <Flex justifyContent="flex-end" m="4">
                            {item.Planting.assignStatus === 'assign' && item.status === 'assign' && <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleEdit(item, e)}>แก้ไข</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status !== 'assign' && <Box mx="3">
                                <Button variant="primary" size="sm" disabled>แก้ไข</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status === 'checking' && <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleCheck(item, e)}>เสร็จสิ้น</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status !== 'checking' && <Box mx="3">
                                <Button variant="primary" size="sm" disabled>เสร็จสิ้น</Button>
                            </Box>}
                            {item.Planting.assignStatus !== 'assign' && <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleCancel(item, e)}>ยกเลิก</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status !== 'finish' && <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleCancel(item, e)}>ยกเลิก</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status === 'finish' && <Box mx="3">
                                <Button variant="primary" size="sm" disabled onClick={(e) => handleCancel(item, e)}>ยกเลิก</Button>
                            </Box>}
                        </Flex>
                    </Box>
                </Flex>)}

            {checking && currentJobList.map((item, index) =>
                <Flex key={index} border="1px solid lightgrey" borderRadius="xl" my="5" p="5" flexFlow="column wrap">
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
                                <Box as='span'>สถานะ:</Box>&nbsp;&nbsp;
                            {item.Planting.assignStatus === 'notAssign' && <Box as='span'>ยังไม่ได้มอบหมาย</Box>}
                                {item.Planting.assignStatus === 'assign' && <Box as='span'>มอบหมาย</Box>}
                            </Box>
                        </Flex>
                        {item.status !== 'finish' && <Flex my="4" justifyContent="flex-start">
                            <Box>
                                <Box as='span'>ผู้รับผิดชอบ:</Box>&nbsp;&nbsp;
                                    <Box as='span'>{item.Staff.firstName} {item.Staff.lastName}</Box>
                            </Box>
                            <Box ml="148px">
                                <Box as='span'>ผู้มอบหมาย:</Box>&nbsp;&nbsp;
                                    <Box as='span'>{item.Assignor.firstName} {item.Assignor.lastName}</Box>
                            </Box>
                            <Box ml="148px">
                                <Box as='span'>สถานะการทำงาน:</Box>&nbsp;&nbsp;
                                {item.status === 'assign' && <Box as='span'>รอยืนยัน</Box>}
                                {item.status === 'in progress' && <Box as='span' color="#e6c12f" >กำลังดำเนินการ</Box>}
                                {item.status === 'checking' && <Box as='span' color="#e6c12f" >รอตรวจสอบ</Box>}
                                {item.status === 'finish' && <Box as='span' color="#008000" >เสร็จสิ้น</Box>}
                                {item.status === 'cancel' && <Box as='span' color="#ff0000" >ยกเลิก</Box>}
                            </Box>
                        </Flex>}

                        {item.status === 'finish' &&
                            <Flex my="4" justifyContent="space-between">
                                <Box>
                                    <Box as='span'>ผู้รับผิดชอบ:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{item.Staff.firstName} {item.Staff.lastName}</Box>
                                </Box>
                                <Box>
                                    <Box as='span'>ผู้มอบหมาย:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{item.Assignor.firstName} {item.Assignor.lastName}</Box>
                                </Box>
                                <Box>
                                    <Box as='span'>สถานะการทำงาน:</Box>&nbsp;&nbsp;
                                    {item.status === 'assign' && <Box as='span' >รอยืนยัน</Box>}
                                    {item.status === 'in progress' && <Box as='span' color="#e6c12f" >กำลังดำเนินการ</Box>}
                                    {item.status === 'checking' && <Box as='span' color="#e6c12f" >รอตรวจสอบ</Box>}
                                    {item.status === 'finish' && <Box as='span' color="#008000" >เสร็จสิ้น</Box>}
                                    {item.status === 'cancel' && <Box as='span' color="#ff0000" >ยกเลิก</Box>}
                                </Box>
                                <Box>
                                    <Box as='span'>ผู้ตรวจสอบการทำงาน:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{item.Examiner.firstName} {item.Examiner.lastName}</Box>
                                </Box>
                                {item.status === 'cancel' && <Box>
                                    <Box as='span'>ผู้ยกเลิก:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{item.Canceler.firstName} {item.Canceler.lastName}</Box>
                                </Box>}
                            </Flex>
                        }
                    </Box>
                    <Box>
                        <Flex justifyContent="flex-end" m="4">
                            {item.Planting.assignStatus === 'assign' && item.status === 'assign' && <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleEdit(item, e)}>แก้ไข</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status !== 'assign' && <Box mx="3">
                                <Button variant="primary" size="sm" disabled>แก้ไข</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status === 'checking' && <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleCheck(item, e)}>เสร็จสิ้น</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status !== 'checking' && <Box mx="3">
                                <Button variant="primary" size="sm" disabled>เสร็จสิ้น</Button>
                            </Box>}
                            {item.Planting.assignStatus !== 'assign' && <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleCancel(item, e)}>ยกเลิก</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status !== 'finish' && <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleCancel(item, e)}>ยกเลิก</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status === 'finish' && <Box mx="3">
                                <Button variant="primary" size="sm" disabled onClick={(e) => handleCancel(item, e)}>ยกเลิก</Button>
                            </Box>}
                        </Flex>
                    </Box>
                </Flex>)}

            {finish && currentJobList.map((item, index) =>
                <Flex key={index} border="1px solid lightgrey" borderRadius="xl" my="5" p="5" flexFlow="column wrap">
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
                                <Box as='span'>สถานะ:</Box>&nbsp;&nbsp;
                            {item.Planting.assignStatus === 'notAssign' && <Box as='span'>ยังไม่ได้มอบหมาย</Box>}
                                {item.Planting.assignStatus === 'assign' && <Box as='span'>มอบหมาย</Box>}
                            </Box>
                        </Flex>
                        {item.status !== 'finish' && <Flex my="4" justifyContent="flex-start">
                            <Box>
                                <Box as='span'>ผู้รับผิดชอบ:</Box>&nbsp;&nbsp;
                                    <Box as='span'>{item.Staff.firstName} {item.Staff.lastName}</Box>
                            </Box>
                            <Box ml="148px">
                                <Box as='span'>ผู้มอบหมาย:</Box>&nbsp;&nbsp;
                                    <Box as='span'>{item.Assignor.firstName} {item.Assignor.lastName}</Box>
                            </Box>
                            <Box ml="148px">
                                <Box as='span'>สถานะการทำงาน:</Box>&nbsp;&nbsp;
                                {item.status === 'assign' && <Box as='span'>รอยืนยัน</Box>}
                                {item.status === 'in progress' && <Box as='span' color="#e6c12f" >กำลังดำเนินการ</Box>}
                                {item.status === 'checking' && <Box as='span' color="#e6c12f" >รอตรวจสอบ</Box>}
                                {item.status === 'finish' && <Box as='span' color="#008000" >เสร็จสิ้น</Box>}
                                {item.status === 'cancel' && <Box as='span' color="#ff0000" >ยกเลิก</Box>}
                            </Box>
                        </Flex>}

                        {item.status === 'finish' &&
                            <Flex my="4" justifyContent="space-between">
                                <Box>
                                    <Box as='span'>ผู้รับผิดชอบ:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{item.Staff.firstName} {item.Staff.lastName}</Box>
                                </Box>
                                <Box>
                                    <Box as='span'>ผู้มอบหมาย:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{item.Assignor.firstName} {item.Assignor.lastName}</Box>
                                </Box>
                                <Box>
                                    <Box as='span'>สถานะการทำงาน:</Box>&nbsp;&nbsp;
                                    {item.status === 'assign' && <Box as='span' >รอยืนยัน</Box>}
                                    {item.status === 'in progress' && <Box as='span' color="#e6c12f" >กำลังดำเนินการ</Box>}
                                    {item.status === 'checking' && <Box as='span' color="#e6c12f" >รอตรวจสอบ</Box>}
                                    {item.status === 'finish' && <Box as='span' color="#008000" >เสร็จสิ้น</Box>}
                                    {item.status === 'cancel' && <Box as='span' color="#ff0000" >ยกเลิก</Box>}
                                </Box>
                                <Box>
                                    <Box as='span'>ผู้ตรวจสอบการทำงาน:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{item.Examiner.firstName} {item.Examiner.lastName}</Box>
                                </Box>
                                {item.status === 'cancel' && <Box>
                                    <Box as='span'>ผู้ยกเลิก:</Box>&nbsp;&nbsp;
                                        <Box as='span'>{item.Canceler.firstName} {item.Canceler.lastName}</Box>
                                </Box>}
                            </Flex>
                        }
                    </Box>
                    <Box>
                        <Flex justifyContent="flex-end" m="4">
                            {item.Planting.assignStatus === 'assign' && item.status === 'assign' && <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleEdit(item, e)}>แก้ไข</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status !== 'assign' && <Box mx="3">
                                <Button variant="primary" size="sm" disabled>แก้ไข</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status === 'checking' && <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleCheck(item, e)}>เสร็จสิ้น</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status !== 'checking' && <Box mx="3">
                                <Button variant="primary" size="sm" disabled>เสร็จสิ้น</Button>
                            </Box>}
                            {item.Planting.assignStatus !== 'assign' && <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleCancel(item, e)}>ยกเลิก</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status !== 'finish' && <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleCancel(item, e)}>ยกเลิก</Button>
                            </Box>}
                            {item.Planting.assignStatus === 'assign' && item.status === 'finish' && <Box mx="3">
                                <Button variant="primary" size="sm" disabled onClick={(e) => handleCancel(item, e)}>ยกเลิก</Button>
                            </Box>}
                        </Flex>
                    </Box>
                </Flex>)}

        </Box>
    )
}

export default AssignWorkListComponent;