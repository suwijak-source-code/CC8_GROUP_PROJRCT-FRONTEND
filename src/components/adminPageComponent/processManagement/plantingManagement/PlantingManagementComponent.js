import "./PlantingManagementComponent.css"
import { useState, useEffect } from 'react';
import { Icon, Button, Box, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Input, Link } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from '../../../../config/axios';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, setPageNumber } from "../../../../features/Paginate/PaginateSlice";
import AddPlantingComponent from '../addPlanting/AddPlantingComponent';
import EditPlantingComponent from '../editPlanting/EditPlantingComponent';
import { setFarmManagement, setSeedManagement, setPlantingManagement } from "../../../../features/ProcessManagement/ProcessManagementSlice";
import EditPlantingAmountComponent from '../editPlantingAmount/EditPlantingAmountComponent';


const PlantingManagementComponent = () => {
    const [openPopupAdd, setOpenPopupAdd] = useState(false);
    const [openPopupEdit, setOpenPopupEdit] = useState(false);
    const [editAmount, setEditAmount] = useState(false);
    const [all, setAll] = useState(true);
    const [inProgress, setInProgress] = useState(false);
    const [harvest, setHarvest] = useState(false);
    const [finish, setFinish] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [error, setError] = useState({});
    const [plantingList, setPlantingList] = useState([]);
    const [eachPlanting, setEachPlanting] = useState([]);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.paginate.currentPage);
    const listPerPage = useSelector((state) => state.paginate.listPerPage);
    const pageNumber = useSelector((state) => state.paginate.pageNumber);

    useEffect(() => {
        const fetchPlantingList = async () => {
            try {
                const res = await axios.get(`/plantings/${'all'}`);
                setPlantingList(res.data.planting);
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
            setAll(true);
            setInProgress(false);
            setHarvest(false);
            setFinish(false);
            setCancel(false);
            const res = await axios.get(`/plantings/${'all'}`);
            setPlantingList(res.data.planting);
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
            setAll(false);
            setInProgress(true);
            setHarvest(false);
            setFinish(false);
            setCancel(false);
            const res = await axios.get(`/plantings/${'started'}`);
            setPlantingList(res.data.planting);
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
            setAll(false);
            setInProgress(false);
            setHarvest(true);
            setFinish(false);
            setCancel(false);
            const res = await axios.get(`/plantings/${'harvested'}`);
            setPlantingList(res.data.planting);
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
            setAll(false);
            setInProgress(false);
            setHarvest(false);
            setFinish(true);
            setCancel(false);
            const res = await axios.get(`/plantings/${'finished'}`);
            setPlantingList(res.data.planting);
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
            setAll(false);
            setInProgress(false);
            setHarvest(false);
            setFinish(true);
            setCancel(false);
            const res = await axios.get(`/plantings/${'cancel'}`);
            setPlantingList(res.data.planting);
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
                setAll(true);
                setInProgress(false);
                setHarvest(false);
                setFinish(false);
                setCancel(false);
                const res = await axios.get(`/plantings/${'all'}`);
                setPlantingList(res.data.planting);
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
            setAll(true);
            setInProgress(false);
            setHarvest(false);
            setFinish(false);
            setCancel(false);
            const res = await axios.get(`/plantings/search?search=${search}`);
            setPlantingList(res.data.planting);
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
        setOpenPopupAdd(true);
    };

    const handleOpenEdit = (item, e) => {
        e.preventDefault();
        setEachPlanting(item);
        setOpenPopupEdit(true);
    };

    const handleOpenEditAmount = (item, e) => {
        e.preventDefault();
        setEachPlanting(item);
        setEditAmount(true);
    };

    const handleDelete = async (item, e) => {
        try {
            await axios.patch(`/plantings/cancel/${item.id}`, { status: 'cancel' });
            dispatch(setFarmManagement(false));
            dispatch(setSeedManagement(false));
            dispatch(setPlantingManagement(true));
            setAll(true);
            setInProgress(false);
            setHarvest(false);
            setFinish(false);
            setCancel(false);
            const res = await axios.get(`/plantings/${'all'}`);
            setPlantingList(res.data.planting);
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

    console.log(plantingList);

    return (
        <Box>
            <Box py="2.5">
                <h1><b><u>จัดการแปลงปลูก</u></b></h1>
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
            {openPopupAdd && <AddPlantingComponent setOpenPopupAdd={setOpenPopupAdd} setPlantingList={setPlantingList}
                setAll={setAll} setInProgress={setInProgress} setHarvest={setHarvest} setFinish={setFinish} setCancel={setCancel} />}
            {openPopupEdit && <EditPlantingComponent eachPlanting={eachPlanting} setOpenPopupEdit={setOpenPopupEdit}
                setPlantingList={setPlantingList} setAll={setAll} setInProgress={setInProgress} setHarvest={setHarvest}
                setFinish={setFinish} setCancel={setCancel} />}
            {editAmount && <EditPlantingAmountComponent eachPlanting={eachPlanting} setEditAmount={setEditAmount}
                setPlantingList={setPlantingList} setAll={setAll} setInProgress={setInProgress} setHarvest={setHarvest}
                setFinish={setFinish} setCancel={setCancel} />}
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