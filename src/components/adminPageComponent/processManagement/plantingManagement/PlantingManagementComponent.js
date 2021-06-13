import "./PlantingManagementComponent.css"
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, Button, Box, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Input, Link } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from '../../../../config/axios';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, setPageNumber } from "../../../../features/Paginate/PaginateSlice";
import {
    setFarmManagement, setSeedManagement, setPlantingManagement, setAllPlanting, setInProgressPlanting,
    setHarvestPlanting, setFinishPlanting, setCancelPlanting, setEachPlanting,
    setPlantingList
} from "../../../../features/ProcessManagement/ProcessManagementSlice";
import EditPlantingAmountComponent from '../editPlantingAmount/EditPlantingAmountComponent';


const PlantingManagementComponent = () => {
    const [editAmount, setEditAmount] = useState(false);
    const [error, setError] = useState({});
    const [search, setSearch] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.paginate.currentPage);
    const listPerPage = useSelector((state) => state.paginate.listPerPage);
    const pageNumber = useSelector((state) => state.paginate.pageNumber);
    const all = useSelector((state) => state.processManagement.allPlanting);
    const inProgress = useSelector((state) => state.processManagement.inProgressPlanting);
    const harvest = useSelector((state) => state.processManagement.harvestPlanting);
    const finish = useSelector((state) => state.processManagement.finishPlanting);
    const cancel = useSelector((state) => state.processManagement.cancelPlanting);
    const plantingList = useSelector((state) => state.processManagement.plantingList);

    useEffect(() => {
        const fetchPlantingList = async () => {
            try {
                const res = await axios.get(`/plantings/${'all'}`);
                dispatch(setPlantingList(res.data.planting));
                if (res.data.planting && res.data.planting.length > 0) {
                    dispatch(setCurrentPage(1));
                    const pageNumberTmp = [];
                    if (Math.ceil(res.data.planting.length / listPerPage) <= 0) {
                        pageNumberTmp.push(1);
                    } else {
                        for (let i = 1; i <= Math.ceil(res.data.planting.length / listPerPage); i++) {
                            pageNumberTmp.push(i);
                        };
                    }
                    dispatch(setPageNumber(pageNumberTmp));
                }
            } catch (err) {
                if (err.response) {
                    setError({ server: err.response.data.message });
                } else {
                    setError({ front: err.message });
                }
            }
        }
        fetchPlantingList();
    }, []);

    const handleAll = async (e) => {
        try {
            e.preventDefault();
            dispatch(setAllPlanting(true));
            dispatch(setInProgressPlanting(false));
            dispatch(setHarvestPlanting(false));
            dispatch(setFinishPlanting(false));
            dispatch(setCancelPlanting(false));
            const res = await axios.get(`/plantings/${'all'}`);
            dispatch(setPlantingList(res.data.planting));
            if (res.data.planting && res.data.planting.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.planting.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.planting.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                }
                dispatch(setPageNumber(pageNumberTmp));
            }
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    };

    const handleInProgress = async (e) => {
        try {
            e.preventDefault();
            dispatch(setAllPlanting(false));
            dispatch(setInProgressPlanting(true));
            dispatch(setHarvestPlanting(false));
            dispatch(setFinishPlanting(false));
            dispatch(setCancelPlanting(false));
            const res = await axios.get(`/plantings/${'started'}`);
            dispatch(setPlantingList(res.data.planting));
            if (res.data.planting && res.data.planting.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.planting.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.planting.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                }
                dispatch(setPageNumber(pageNumberTmp));
            }
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    };

    const handleHarvest = async (e) => {
        try {
            e.preventDefault();
            dispatch(setAllPlanting(false));
            dispatch(setInProgressPlanting(false));
            dispatch(setHarvestPlanting(true));
            dispatch(setFinishPlanting(false));
            dispatch(setCancelPlanting(false));
            const res = await axios.get(`/plantings/${'harvested'}`);
            dispatch(setPlantingList(res.data.planting));
            if (res.data.planting && res.data.planting.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.planting.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.planting.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                }
                dispatch(setPageNumber(pageNumberTmp));
            }
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
            dispatch(setAllPlanting(false));
            dispatch(setInProgressPlanting(false));
            dispatch(setHarvestPlanting(false));
            dispatch(setFinishPlanting(true));
            dispatch(setCancelPlanting(false));
            const res = await axios.get(`/plantings/${'finished'}`);
            dispatch(setPlantingList(res.data.planting));
            if (res.data.planting && res.data.planting.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.planting.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.planting.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                }
                dispatch(setPageNumber(pageNumberTmp));
            }
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    };

    const handleCancel = async (e) => {
        try {
            e.preventDefault();
            dispatch(setAllPlanting(false));
            dispatch(setInProgressPlanting(false));
            dispatch(setHarvestPlanting(false));
            dispatch(setFinishPlanting(false));
            dispatch(setCancelPlanting(true));
            const res = await axios.get(`/plantings/${'cancel'}`);
            dispatch(setPlantingList(res.data.planting));
            if (res.data.planting && res.data.planting.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.planting.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.planting.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                }
                dispatch(setPageNumber(pageNumberTmp));
            }
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    };

    const handleInputChange = async (e) => {
        try {
            const { value } = e.target;
            if (value) {
                setSearch(value);
            } else {
                e.preventDefault();
                dispatch(setAllPlanting(true));
                dispatch(setInProgressPlanting(false));
                dispatch(setHarvestPlanting(false));
                dispatch(setFinishPlanting(false));
                dispatch(setCancelPlanting(false));
                const res = await axios.get(`/plantings/${'all'}`);
                dispatch(setPlantingList(res.data.planting));
                if (res.data.planting && res.data.planting.length > 0) {
                    dispatch(setCurrentPage(1));
                    const pageNumberTmp = [];
                    if (Math.ceil(res.data.planting.length / listPerPage) <= 0) {
                        pageNumberTmp.push(1);
                    } else {
                        for (let i = 1; i <= Math.ceil(res.data.planting.length / listPerPage); i++) {
                            pageNumberTmp.push(i);
                        };
                    }
                    dispatch(setPageNumber(pageNumberTmp));
                }
                setSearch('');
            }
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    };

    const handleSearch = async (e) => {
        try {
            e.preventDefault();
            dispatch(setAllPlanting(true));
            dispatch(setInProgressPlanting(false));
            dispatch(setHarvestPlanting(false));
            dispatch(setFinishPlanting(false));
            dispatch(setCancelPlanting(false));
            const res = await axios.get(`/plantings/search?search=${search}`);
            dispatch(setPlantingList(res.data.planting));
            if (res.data.planting && res.data.planting.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.planting.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.planting.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                }
                dispatch(setPageNumber(pageNumberTmp));
            }
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    }

    const handleOpenPopupAdd = (e) => {
        e.preventDefault();
        history.push('/process-management/add-planting');
    };

    const handleOpenEdit = (item, e) => {
        e.preventDefault();
        dispatch(setEachPlanting(item));
        history.push('/process-management/edit-planting');
    };

    const handleOpenEditAmount = (item, e) => {
        e.preventDefault();
        dispatch(setEachPlanting(item));
        setEditAmount(true);
    };

    const handleDelete = async (item, e) => {
        try {
            await axios.patch(`/plantings/cancel/${item.id}`, { status: 'cancel' });
            dispatch(setFarmManagement(false));
            dispatch(setSeedManagement(false));
            dispatch(setPlantingManagement(true));
            dispatch(setAllPlanting(true));
            dispatch(setInProgressPlanting(false));
            dispatch(setHarvestPlanting(false));
            dispatch(setFinishPlanting(false));
            dispatch(setCancelPlanting(false));
            const res = await axios.get(`/plantings/${'all'}`);
            dispatch(setPlantingList(res.data.planting));
            if (res.data.planting && res.data.planting.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.planting.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.planting.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                }
                dispatch(setPageNumber(pageNumberTmp));
            }
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    };

    const indexOfLastPost = currentPage * listPerPage;
    const indexOfFirstPost = indexOfLastPost - listPerPage;
    const currentPlantingList = plantingList.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (numbers, e) => {
        e.preventDefault();
        dispatch(setCurrentPage(numbers));
    };

    return (
        <Box>
            <Box py="2.5">
                <h1><b><u>จัดการการปลูก</u></b></h1>
            </Box>
            <Flex py="2.5" flexFlow="row wrap" justifyContent="space-between" alignItems="center">
                <Box mr="6">
                    <Button variant="outline" onClick={handleOpenPopupAdd}>เพิ่มการผลิต +</Button>
                </Box>
                <form className='search-form-planting' action="" onSubmit={handleSearch}>
                    <Box maxW="750px" w="100%">
                        <Input borderRadius="10" onChange={handleInputChange} value={search}
                            placeholder="กรุณากรอกชื่อสวนที่ต้องการค้นหา" />
                    </Box>
                    <Box ml="6">
                        <Button variant="primary" type="submit"><Icon as={SearchIcon} w={5} h={5} /></Button>
                    </Box>
                </form>
            </Flex>
            <Box my="4"><hr /></Box>
            <Flex justifyContent="center" p="4">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={handleAll}>ทั้งหมด</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={handleInProgress}>กำลังดำเนินการ</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={handleHarvest}>เก็บเกี่ยว</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={handleFinish}>สำเร็จ</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={handleCancel}>ยกเลิก</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Flex>
            <Box my="4"><hr /></Box>
            {all && currentPlantingList.map((item, index) => <Flex key={index} border="1px solid lightgrey" borderRadius="xl" my="5" p="5" flexFlow="column wrap">
                <Box bg="muted.300" borderRadius="xl" p="5">
                    <Flex my="4" justifyContent="space-between">
                        <Box>
                            <Box as='span'>ชื่อสวน:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.Farm.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>ชื่อเมล็ดพันธุ์:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.Seed.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>วันเริ่มปลูก:</Box>&nbsp;&nbsp;
                            <Box as='span'>{`${("0" + (new Date(item.startDate).getDate())).slice(-2)}/
                            ${("0" + (new Date(item.startDate).getMonth() + 1)).slice(-2)}/
                            ${((new Date(item.startDate).getFullYear()))}`}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>วันเก็บเกี่ยว:</Box>&nbsp;&nbsp;
                            <Box as='span'>{`${("0" + (new Date(item.harvestDate).getDate())).slice(-2)}/
                            ${("0" + (new Date(item.harvestDate).getMonth() + 1)).slice(-2)}/
                            ${((new Date(item.harvestDate).getFullYear()))}`}</Box>
                        </Box>
                    </Flex>
                    <Flex my="4" justifyContent="space-between">
                        <Box>
                            <Box as='span'>สถานะ:</Box>&nbsp;&nbsp;
                            {item.status === 'started' && <Box as='span'>เริ่มการปลูก</Box>}
                            {item.status === 'harvested' && <Box as='span'>เก็บเกี่ยว</Box>}
                            {item.status === 'finished' && <Box as='span'>สำเร็จ</Box>}
                            {item.status === 'cancel' && <Box as='span'>ยกเลิก</Box>}
                        </Box>
                        <Box>
                            <Box as='span'>จำนวนที่ปลูก:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.plantedAmount}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>จำนวนผลผลิต:</Box>&nbsp;&nbsp;
                            {item.harvestedAmount !== 0 && <Box as='span'>{item.harvestedAmount}</Box>}
                            {item.harvestedAmount === 0 && <Box as='span'>-</Box>}
                        </Box>
                        <Box>
                            <Box as='span'>ผู้เพิ่มการผลิต:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.PlantingApproved.firstName} {item.PlantingApproved.lastName}</Box>
                        </Box>
                    </Flex>
                    <Flex my="4">
                        <Box >
                            <Box as='span'>ลูกค้าที่จอง:</Box>&nbsp;&nbsp;
                            {item.Customer && <Box as='span'>{item.Customer.fullName}</Box>}
                            {!item.Customer && <Box as='span'>-</Box>}
                        </Box>
                    </Flex>
                    <Flex my="4">
                        <Box>
                            <Box as='span'>หมายเหตุ:</Box>&nbsp;&nbsp;
                            {item.remark && <Box as='span'>{item.remark}</Box>}
                            {!item.remark && <Box as='span'>-</Box>}
                        </Box>

                    </Flex>
                </Box>
                <Box>
                    <Flex justifyContent="flex-end" m="4">
                        {item.startDate >= `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}` &&
                            item.status !== 'cancel' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleOpenEdit(item, e)}>แก้ไข</Button>
                            </Box>
                        }
                        {item.startDate >= `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}` &&
                            item.status === 'cancel' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>แก้ไข</Button>
                            </Box>
                        }
                        {item.startDate < `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}` &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>แก้ไข</Button>
                            </Box>
                        }

                        {item.status === 'finished' && <Box mx="3">
                            <Button variant="primary" type="submit" size="sm" onClick={(e) => handleOpenEditAmount(item, e)}>แก้ไขจำนวนผลผลิต</Button>
                        </Box>}

                        {item.status === 'finished' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>ยกเลิก</Button>
                            </Box>}
                        {item.status === 'cancel' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>ยกเลิก</Button>
                            </Box>}
                        {item.status === 'finished' || item.status === 'cancel' ||
                            <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleDelete(item, e)}>ยกเลิก</Button>
                            </Box>}

                    </Flex>
                </Box>
            </Flex>)}

            {inProgress && currentPlantingList.map((item, index) => <Flex key={index} border="1px solid lightgrey" borderRadius="xl" my="5" p="5" flexFlow="column wrap">
                <Box bg="muted.300" borderRadius="xl" p="5">
                    <Flex my="4" justifyContent="space-between">
                        <Box>
                            <Box as='span'>ชื่อสวน:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.Farm.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>ชื่อเมล็ดพันธุ์:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.Seed.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>วันเริ่มปลูก:</Box>&nbsp;&nbsp;
                            <Box as='span'>{`${("0" + (new Date(item.startDate).getDate())).slice(-2)}/
                            ${("0" + (new Date(item.startDate).getMonth() + 1)).slice(-2)}/
                            ${((new Date(item.startDate).getFullYear()))}`}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>วันเก็บเกี่ยว:</Box>&nbsp;&nbsp;
                            <Box as='span'>{`${("0" + (new Date(item.harvestDate).getDate())).slice(-2)}/
                            ${("0" + (new Date(item.harvestDate).getMonth() + 1)).slice(-2)}/
                            ${((new Date(item.harvestDate).getFullYear()))}`}</Box>
                        </Box>
                    </Flex>
                    <Flex my="4" justifyContent="space-between">
                        <Box>
                            <Box as='span'>สถานะ:</Box>&nbsp;&nbsp;
                            {item.status === 'started' && <Box as='span'>เริ่มการปลูก</Box>}
                            {item.status === 'harvested' && <Box as='span'>เก็บเกี่ยว</Box>}
                            {item.status === 'finished' && <Box as='span'>สำเร็จ</Box>}
                            {item.status === 'cancel' && <Box as='span'>ยกเลิก</Box>}
                        </Box>
                        <Box>
                            <Box as='span'>จำนวนที่ปลูก:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.plantedAmount}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>จำนวนผลผลิต:</Box>&nbsp;&nbsp;
                            {item.harvestedAmount !== 0 && <Box as='span'>{item.harvestedAmount}</Box>}
                            {item.harvestedAmount === 0 && <Box as='span'>-</Box>}
                        </Box>
                        <Box>
                            <Box as='span'>ผู้เพิ่มการผลิต:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.PlantingApproved.firstName} {item.PlantingApproved.lastName}</Box>
                        </Box>
                    </Flex>
                    <Flex my="4">
                        <Box >
                            <Box as='span'>ลูกค้าที่จอง:</Box>&nbsp;&nbsp;
                            {item.Customer && <Box as='span'>{item.Customer.fullName}</Box>}
                            {!item.Customer && <Box as='span'>-</Box>}
                        </Box>
                    </Flex>
                    <Flex my="4">
                        <Box as='span'>หมายเหตุ:</Box>&nbsp;&nbsp;
                        {item.remark && <Box as='span'>{item.remark}</Box>}
                        {!item.remark && <Box as='span'>-</Box>}
                    </Flex>
                </Box>
                <Box>
                    <Flex justifyContent="flex-end" m="4">
                        {item.startDate >= `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}` &&
                            item.status !== 'cancel' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleOpenEdit(item, e)}>แก้ไข</Button>
                            </Box>
                        }
                        {item.startDate >= `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}` &&
                            item.status === 'cancel' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>แก้ไข</Button>
                            </Box>
                        }
                        {item.startDate < `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}` &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>แก้ไข</Button>
                            </Box>
                        }

                        {item.status === 'finished' && <Box mx="3">
                            <Button variant="primary" type="submit" size="sm" onClick={(e) => handleOpenEditAmount(item, e)}>แก้ไขจำนวนผลผลิต</Button>
                        </Box>}

                        {item.status === 'finished' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>ยกเลิก</Button>
                            </Box>}
                        {item.status === 'cancel' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>ยกเลิก</Button>
                            </Box>}
                        {item.status === 'finished' || item.status === 'cancel' ||
                            <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleDelete(item, e)}>ยกเลิก</Button>
                            </Box>}

                    </Flex>
                </Box>
            </Flex>)}

            {harvest && currentPlantingList.map((item, index) => <Flex key={index} border="1px solid lightgrey" borderRadius="xl" my="5" p="5" flexFlow="column wrap">
                <Box bg="muted.300" borderRadius="xl" p="5">
                    <Flex my="4" justifyContent="space-between">
                        <Box>
                            <Box as='span'>ชื่อสวน:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.Farm.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>ชื่อเมล็ดพันธุ์:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.Seed.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>วันเริ่มปลูก:</Box>&nbsp;&nbsp;
                            <Box as='span'>{`${("0" + (new Date(item.startDate).getDate())).slice(-2)}/
                            ${("0" + (new Date(item.startDate).getMonth() + 1)).slice(-2)}/
                            ${((new Date(item.startDate).getFullYear()))}`}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>วันเก็บเกี่ยว:</Box>&nbsp;&nbsp;
                            <Box as='span'>{`${("0" + (new Date(item.harvestDate).getDate())).slice(-2)}/
                            ${("0" + (new Date(item.harvestDate).getMonth() + 1)).slice(-2)}/
                            ${((new Date(item.harvestDate).getFullYear()))}`}</Box>
                        </Box>
                    </Flex>
                    <Flex my="4" justifyContent="space-between">
                        <Box>
                            <Box as='span'>สถานะ:</Box>&nbsp;&nbsp;
                            {item.status === 'started' && <Box as='span'>เริ่มการปลูก</Box>}
                            {item.status === 'harvested' && <Box as='span'>เก็บเกี่ยว</Box>}
                            {item.status === 'finished' && <Box as='span'>สำเร็จ</Box>}
                            {item.status === 'cancel' && <Box as='span'>ยกเลิก</Box>}
                        </Box>
                        <Box>
                            <Box as='span'>จำนวนที่ปลูก:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.plantedAmount}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>จำนวนผลผลิต:</Box>&nbsp;&nbsp;
                            {item.harvestedAmount !== 0 && <Box as='span'>{item.harvestedAmount}</Box>}
                            {item.harvestedAmount === 0 && <Box as='span'>-</Box>}
                        </Box>
                        <Box>
                            <Box as='span'>ผู้เพิ่มการผลิต:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.PlantingApproved.firstName} {item.PlantingApproved.lastName}</Box>
                        </Box>
                    </Flex>
                    <Flex my="4">
                        <Box >
                            <Box as='span'>ลูกค้าที่จอง:</Box>&nbsp;&nbsp;
                            {item.Customer && <Box as='span'>{item.Customer.fullName}</Box>}
                            {!item.Customer && <Box as='span'>-</Box>}
                        </Box>
                    </Flex>
                    <Flex my="4">
                        <Box as='span'>หมายเหตุ:</Box>&nbsp;&nbsp;
                        {item.remark && <Box as='span'>{item.remark}</Box>}
                        {!item.remark && <Box as='span'>-</Box>}
                    </Flex>
                </Box>
                <Box>
                    <Flex justifyContent="flex-end" m="4">
                        {item.startDate >= `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}` &&
                            item.status !== 'cancel' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleOpenEdit(item, e)}>แก้ไข</Button>
                            </Box>
                        }
                        {item.startDate >= `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}` &&
                            item.status === 'cancel' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>แก้ไข</Button>
                            </Box>
                        }
                        {item.startDate < `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}` &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>แก้ไข</Button>
                            </Box>
                        }

                        {item.status === 'finished' && <Box mx="3">
                            <Button variant="primary" type="submit" size="sm" onClick={(e) => handleOpenEditAmount(item, e)}>แก้ไขจำนวนผลผลิต</Button>
                        </Box>}

                        {item.status === 'finished' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>ยกเลิก</Button>
                            </Box>}
                        {item.status === 'cancel' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>ยกเลิก</Button>
                            </Box>}
                        {item.status === 'finished' || item.status === 'cancel' ||
                            <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleDelete(item, e)}>ยกเลิก</Button>
                            </Box>}

                    </Flex>
                </Box>
            </Flex>)}

            {finish && currentPlantingList.map((item, index) => <Flex key={index} border="1px solid lightgrey" borderRadius="xl" my="5" p="5" flexFlow="column wrap">
                <Box bg="muted.300" borderRadius="xl" p="5">
                    <Flex my="4" justifyContent="space-between">
                        <Box>
                            <Box as='span'>ชื่อสวน:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.Farm.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>ชื่อเมล็ดพันธุ์:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.Seed.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>วันเริ่มปลูก:</Box>&nbsp;&nbsp;
                            <Box as='span'>{`${("0" + (new Date(item.startDate).getDate())).slice(-2)}/
                            ${("0" + (new Date(item.startDate).getMonth() + 1)).slice(-2)}/
                            ${((new Date(item.startDate).getFullYear()))}`}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>วันเก็บเกี่ยว:</Box>&nbsp;&nbsp;
                            <Box as='span'>{`${("0" + (new Date(item.harvestDate).getDate())).slice(-2)}/
                            ${("0" + (new Date(item.harvestDate).getMonth() + 1)).slice(-2)}/
                            ${((new Date(item.harvestDate).getFullYear()))}`}</Box>
                        </Box>
                    </Flex>
                    <Flex my="4" justifyContent="space-between">
                        <Box>
                            <Box as='span'>สถานะ:</Box>&nbsp;&nbsp;
                            {item.status === 'started' && <Box as='span'>เริ่มการปลูก</Box>}
                            {item.status === 'harvested' && <Box as='span'>เก็บเกี่ยว</Box>}
                            {item.status === 'finished' && <Box as='span'>สำเร็จ</Box>}
                            {item.status === 'cancel' && <Box as='span'>ยกเลิก</Box>}
                        </Box>
                        <Box>
                            <Box as='span'>จำนวนที่ปลูก:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.plantedAmount}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>จำนวนผลผลิต:</Box>&nbsp;&nbsp;
                            {item.harvestedAmount !== 0 && <Box as='span'>{item.harvestedAmount}</Box>}
                            {item.harvestedAmount === 0 && <Box as='span'>-</Box>}
                        </Box>
                        <Box>
                            <Box as='span'>ผู้เพิ่มการผลิต:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.PlantingApproved.firstName} {item.PlantingApproved.lastName}</Box>
                        </Box>
                    </Flex>
                    <Flex my="4">
                        <Box >
                            <Box as='span'>ลูกค้าที่จอง:</Box>&nbsp;&nbsp;
                            {item.Customer && <Box as='span'>{item.Customer.fullName}</Box>}
                            {!item.Customer && <Box as='span'>-</Box>}
                        </Box>
                    </Flex>
                    <Flex my="4">
                        <Box as='span'>หมายเหตุ:</Box>&nbsp;&nbsp;
                        {item.remark && <Box as='span'>{item.remark}</Box>}
                        {!item.remark && <Box as='span'>-</Box>}
                    </Flex>
                </Box>
                <Box>
                    <Flex justifyContent="flex-end" m="4">
                        {item.startDate >= `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}` &&
                            item.status !== 'cancel' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleOpenEdit(item, e)}>แก้ไข</Button>
                            </Box>
                        }
                        {item.startDate >= `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}` &&
                            item.status === 'cancel' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>แก้ไข</Button>
                            </Box>
                        }
                        {item.startDate < `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}` &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>แก้ไข</Button>
                            </Box>
                        }

                        {item.status === 'finished' && <Box mx="3">
                            <Button variant="primary" type="submit" size="sm" onClick={(e) => handleOpenEditAmount(item, e)}>แก้ไขจำนวนผลผลิต</Button>
                        </Box>}

                        {item.status === 'finished' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>ยกเลิก</Button>
                            </Box>}
                        {item.status === 'cancel' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>ยกเลิก</Button>
                            </Box>}
                        {item.status === 'finished' || item.status === 'cancel' ||
                            <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleDelete(item, e)}>ยกเลิก</Button>
                            </Box>}

                    </Flex>
                </Box>
            </Flex>)}

            {cancel && currentPlantingList.map((item, index) => <Flex key={index} border="1px solid lightgrey" borderRadius="xl" my="5" p="5" flexFlow="column wrap">
                <Box bg="muted.300" borderRadius="xl" p="5">
                    <Flex my="4" justifyContent="space-between">
                        <Box>
                            <Box as='span'>ชื่อสวน:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.Farm.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>ชื่อเมล็ดพันธุ์:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.Seed.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>วันเริ่มปลูก:</Box>&nbsp;&nbsp;
                            <Box as='span'>{`${("0" + (new Date(item.startDate).getDate())).slice(-2)}/
                            ${("0" + (new Date(item.startDate).getMonth() + 1)).slice(-2)}/
                            ${((new Date(item.startDate).getFullYear()))}`}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>วันเก็บเกี่ยว:</Box>&nbsp;&nbsp;
                            <Box as='span'>{`${("0" + (new Date(item.harvestDate).getDate())).slice(-2)}/
                            ${("0" + (new Date(item.harvestDate).getMonth() + 1)).slice(-2)}/
                            ${((new Date(item.harvestDate).getFullYear()))}`}</Box>
                        </Box>
                    </Flex>
                    <Flex my="4" justifyContent="space-between">
                        <Box>
                            <Box as='span'>สถานะ:</Box>&nbsp;&nbsp;
                            {item.status === 'started' && <Box as='span'>เริ่มการปลูก</Box>}
                            {item.status === 'harvested' && <Box as='span'>เก็บเกี่ยว</Box>}
                            {item.status === 'finished' && <Box as='span'>สำเร็จ</Box>}
                            {item.status === 'cancel' && <Box as='span'>ยกเลิก</Box>}
                        </Box>
                        <Box>
                            <Box as='span'>จำนวนที่ปลูก:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.plantedAmount}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>จำนวนผลผลิต:</Box>&nbsp;&nbsp;
                            {item.harvestedAmount !== 0 && <Box as='span'>{item.harvestedAmount}</Box>}
                            {item.harvestedAmount === 0 && <Box as='span'>-</Box>}
                        </Box>
                        <Box>
                            <Box as='span'>ผู้เพิ่มการผลิต:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.PlantingApproved.firstName} {item.PlantingApproved.lastName}</Box>
                        </Box>
                    </Flex>
                    <Flex my="4">
                        <Box >
                            <Box as='span'>ลูกค้าที่จอง:</Box>&nbsp;&nbsp;
                            {item.Customer && <Box as='span'>{item.Customer.fullName}</Box>}
                            {!item.Customer && <Box as='span'>-</Box>}
                        </Box>
                    </Flex>
                    <Flex my="4">
                        <Box as='span'>หมายเหตุ:</Box>&nbsp;&nbsp;
                        {item.remark && <Box as='span'>{item.remark}</Box>}
                        {!item.remark && <Box as='span'>-</Box>}
                    </Flex>
                </Box>
                <Box>
                    <Flex justifyContent="flex-end" m="4">
                        {item.startDate >= `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}` &&
                            item.status !== 'cancel' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleOpenEdit(item, e)}>แก้ไข</Button>
                            </Box>
                        }
                        {item.startDate >= `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}` &&
                            item.status === 'cancel' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>แก้ไข</Button>
                            </Box>
                        }
                        {item.startDate < `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}` &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>แก้ไข</Button>
                            </Box>
                        }

                        {item.status === 'finished' && <Box mx="3">
                            <Button variant="primary" type="submit" size="sm" onClick={(e) => handleOpenEditAmount(item, e)}>แก้ไขจำนวนผลผลิต</Button>
                        </Box>}

                        {item.status === 'finished' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>ยกเลิก</Button>
                            </Box>}
                        {item.status === 'cancel' &&
                            <Box mx="3">
                                <Button variant="primary" size="sm" disabled>ยกเลิก</Button>
                            </Box>}
                        {item.status === 'finished' || item.status === 'cancel' ||
                            <Box mx="3">
                                <Button variant="primary" size="sm" onClick={(e) => handleDelete(item, e)}>ยกเลิก</Button>
                            </Box>}

                    </Flex>
                </Box>
            </Flex>)}
            {editAmount && <EditPlantingAmountComponent setEditAmount={setEditAmount} />}
            <Flex justifyContent="center" my="5">
                {pageNumber.map((numbers, index) =>
                    <Link key={index} mx="1" onClick={(e) => paginate(numbers, e)}>
                        {numbers}
                    </Link>
                )}
            </Flex>
        </Box>
    )
}

export default PlantingManagementComponent;