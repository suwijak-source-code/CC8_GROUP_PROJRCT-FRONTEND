import "./FarmManagementComponent.css"
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../../../config/axios';
import { useSelector, useDispatch } from "react-redux";
import {
    setFarmManagement, setSeedManagement, setPlantingManagement, setEachFarm,
    setAllFarm, setInProgressFarm, setIdleFarm, setFarmOpenAddPlanting
} from "../../../../features/ProcessManagement/ProcessManagementSlice";
import { setCurrentPage, setPageNumber } from "../../../../features/Paginate/PaginateSlice";
import { Icon, Button, Box, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Input, Link } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import AddFarmComponent from "../addFarm/AddFarmComponent";
import EditFarmComponent from '../editFarm/EditFarmComponent';


const FarmManagementComponent = () => {
    const [openPopupAdd, setOpenPopupAdd] = useState(false);
    const [openPopupEdit, setOpenPopupEdit] = useState(false);
    const [farmList, setFarmList] = useState([]);
    const [error, setError] = useState({});
    const [search, setSearch] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.paginate.currentPage);
    const listPerPage = useSelector((state) => state.paginate.listPerPage);
    const pageNumber = useSelector((state) => state.paginate.pageNumber);
    const eachFarm = useSelector((state) => state.processManagement.eachFarm);
    const all = useSelector((state) => state.processManagement.allFarm);
    const inProgress = useSelector((state) => state.processManagement.inProgressFarm);
    const idle = useSelector((state) => state.processManagement.idleFarm);

    useEffect(() => {
        const fetchFarmList = async () => {
            try {
                const res = await axios.get(`/farms/${'all'}`);
                setFarmList(res.data.farm);
                if (res.data.farm && res.data.farm.length > 0) {
                    dispatch(setCurrentPage(1));
                    const pageNumberTmp = [];
                    if (Math.ceil(res.data.farm.length / listPerPage) <= 0) {
                        pageNumberTmp.push(1);
                    } else {
                        for (let i = 1; i <= Math.ceil(res.data.farm.length / listPerPage); i++) {
                            pageNumberTmp.push(i);
                        };
                    }
                    dispatch(setPageNumber(pageNumberTmp));
                };
            } catch (err) {
                if (err.response) {
                    setError({ server: err.response.data.message });
                } else {
                    setError({ front: err.message });
                }
            }
        }
        fetchFarmList();
    }, []);


    const handleAll = async (e) => {
        try {
            e.preventDefault();
            dispatch(setAllFarm(true));
            dispatch(setInProgressFarm(false));
            dispatch(setIdleFarm(false));
            const res = await axios.get(`/farms/${'all'}`);
            setFarmList(res.data.farm);
            if (res.data.farm && res.data.farm.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.farm.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.farm.length / listPerPage); i++) {
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
            dispatch(setAllFarm(false));
            dispatch(setInProgressFarm(true));
            dispatch(setIdleFarm(false));
            const res = await axios.get(`/farms/${'active'}`);
            setFarmList(res.data.farm);
            if (res.data.farm && res.data.farm.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.farm.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.farm.length / listPerPage); i++) {
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

    const handleIdle = async (e) => {
        try {
            e.preventDefault();
            dispatch(setAllFarm(false));
            dispatch(setInProgressFarm(false));
            dispatch(setIdleFarm(true));
            const res = await axios.get(`/farms/${'idle'}`);
            setFarmList(res.data.farm);
            if (res.data.farm && res.data.farm.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.farm.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.farm.length / listPerPage); i++) {
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
                dispatch(setFarmManagement(true));
                dispatch(setSeedManagement(false));
                dispatch(setPlantingManagement(false));
                dispatch(setAllFarm(true));
                dispatch(setInProgressFarm(false));
                dispatch(setIdleFarm(false));
                const res = await axios.get(`/farms/${'all'}`);
                setFarmList(res.data.farm);
                if (res.data.farm && res.data.farm.length > 0) {
                    dispatch(setCurrentPage(1));
                    const pageNumberTmp = [];
                    if (Math.ceil(res.data.farm.length / listPerPage) <= 0) {
                        pageNumberTmp.push(1);
                    } else {
                        for (let i = 1; i <= Math.ceil(res.data.farm.length / listPerPage); i++) {
                            pageNumberTmp.push(i);
                        };
                    }
                    dispatch(setPageNumber(pageNumberTmp));
                };
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
            dispatch(setFarmManagement(true));
            dispatch(setSeedManagement(false));
            dispatch(setPlantingManagement(false));
            dispatch(setAllFarm(true));
            dispatch(setInProgressFarm(false));
            dispatch(setIdleFarm(false));
            const res = await axios.get(`/farms/search?search=${search}`);
            setFarmList(res.data.farm);
            if (res.data.farm && res.data.farm.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.farm.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.farm.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                }
                dispatch(setPageNumber(pageNumberTmp));
            };
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

    const handleCreate = (item, e) => {
        e.preventDefault();
        dispatch(setEachFarm(item));
        history.push('/process-management/add-planting');
        dispatch(setFarmOpenAddPlanting(true));
    };

    const handleOpenEdit = (item, e) => {
        e.preventDefault();
        dispatch(setEachFarm(item));
        setOpenPopupEdit(true);
    };

    const handleDelete = async (item, e) => {
        try {
            await axios.delete(`/farms/${item.id}`);
            dispatch(setFarmManagement(true));
            dispatch(setSeedManagement(false));
            dispatch(setPlantingManagement(false));
            dispatch(setAllFarm(true));
            dispatch(setInProgressFarm(false));
            dispatch(setIdleFarm(false));
            const res = await axios.get(`/farms/${'all'}`);
            setFarmList(res.data.farm);
            if (res.data.farm && res.data.farm.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.farm.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.farm.length / listPerPage); i++) {
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
            };
        };
    };

    const indexOfLastPost = currentPage * listPerPage;
    const indexOfFirstPost = indexOfLastPost - listPerPage;
    const currentFarmList = farmList.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (numbers, e) => {
        e.preventDefault();
        dispatch(setCurrentPage(numbers));
    };


    return (
        <Box>
            <Box py="2.5">
                <h1><b><u>??????????????????????????????????????????</u></b></h1>
            </Box>
            <Flex py="2.5" flexFlow="row wrap" justifyContent="space-between" alignItems="center">
                <Box mr="6">
                    <Button variant="outline" onClick={handleOpenPopupAdd}>??????????????????????????????????????????????????? +</Button>
                </Box>
                <form className='search-form-farm' action="" onSubmit={handleSearch}>
                    <Box maxW="750px" w="100%">
                        <Input borderRadius="10" onChange={handleInputChange} value={search}
                            placeholder="?????????????????????????????????????????????????????????????????????????????????????????????" />
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
                        <BreadcrumbLink onClick={handleAll}>?????????????????????</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={handleInProgress}>??????????????????????????????????????????</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={handleIdle}>????????????</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Flex>
            <Box my="4"><hr /></Box>
            {all && currentFarmList.map((item, index) => <Flex key={index} border="1px solid lightgrey" borderRadius="xl" my="5" p="5" flexFlow="column wrap">
                <Box bg="muted.300" borderRadius="xl" p="5">
                    <Flex my="4" justifyContent="space-between">
                        <Box>
                            <Box as='span'>?????????????????????:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>???????????????:</Box>&nbsp;&nbsp;
                            {item.status === 'active' && <Box as='span'>??????????????????????????????????????????</Box>}
                            {item.status === 'idle' && <Box as='span'>????????????</Box>}
                        </Box>
                        <Box>
                            <Box as='span'>?????????????????????????????????:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.User.firstName} {item.User.lastName}</Box>
                        </Box>

                    </Flex>
                    <Flex my="4">
                        <Box as='span'>????????????????????????:</Box>&nbsp;&nbsp;
                        {item.remark && <Box as='span'>{item.remark}</Box>}
                        {!item.remark && <Box as='span'>-</Box>}
                    </Flex>
                </Box>
                <Box>
                    {item.status === 'active' && <Flex justifyContent="flex-end" m="4">
                        <Box mx="3">
                            <Button variant="primary" size="sm" disabled onClick={(e) => handleCreate(item, e)}>????????????????????????????????????</Button>
                        </Box>
                        <Box mx="3">
                            <Button variant="primary" size="sm" disabled onClick={(e) => handleOpenEdit(item, e)}>???????????????</Button>
                        </Box>
                        <Box mx="3">
                            <Button variant="primary" size="sm" disabled onClick={(e) => handleDelete(item, e)}>??????????????????????????????</Button>
                        </Box>
                    </Flex>}
                    {item.status === 'idle' && <Flex justifyContent="flex-end" m="4">
                        <Box mx="3">
                            <Button variant="primary" size="sm" onClick={(e) => handleCreate(item, e)}>????????????????????????????????????</Button>
                        </Box>
                        <Box mx="3">
                            <Button variant="primary" size="sm" onClick={(e) => handleOpenEdit(item, e)}>???????????????</Button>
                        </Box>
                        <Box mx="3">
                            <Button variant="primary" size="sm" onClick={(e) => handleDelete(item, e)}>??????????????????????????????</Button>
                        </Box>
                    </Flex>}

                </Box>
            </Flex>)}

            {inProgress && currentFarmList.map((item, index) => <Flex key={index} border="1px solid lightgrey" borderRadius="xl" my="5" p="5" flexFlow="column wrap">
                <Box bg="muted.300" borderRadius="xl" p="5">
                    <Flex my="4" justifyContent="space-between">
                        <Box>
                            <Box as='span'>?????????????????????:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>???????????????:</Box>&nbsp;&nbsp;
                            {item.status === 'active' && <Box as='span'>??????????????????????????????????????????</Box>}
                            {item.status === 'idle' && <Box as='span'>????????????</Box>}
                        </Box>
                        <Box>
                            <Box as='span'>?????????????????????????????????:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.User.firstName} {item.User.lastName}</Box>
                        </Box>

                    </Flex>
                    <Flex my="4">
                        <Box as='span'>????????????????????????:</Box>&nbsp;&nbsp;
                        {item.remark && <Box as='span'>{item.remark}</Box>}
                        {!item.remark && <Box as='span'>-</Box>}
                    </Flex>
                </Box>
                <Box>
                    <Flex justifyContent="flex-end" m="4">
                        <Box mx="3">
                            <Button variant="primary" size="sm" disabled onClick={(e) => handleCreate(item, e)}>????????????????????????????????????</Button>
                        </Box>
                        <Box mx="3">
                            <Button variant="primary" size="sm" disabled onClick={(e) => handleOpenEdit(item, e)} >???????????????</Button>
                        </Box>
                        <Box mx="3">
                            <Button variant="primary" size="sm" disabled onClick={(e) => handleDelete(item, e)}>??????????????????????????????</Button>
                        </Box>
                    </Flex>
                </Box>
            </Flex>)}

            {idle && currentFarmList.map((item, index) => <Flex key={index} border="1px solid lightgrey" borderRadius="xl" my="5" p="5" flexFlow="column wrap">
                <Box bg="muted.300" borderRadius="xl" p="5">
                    <Flex my="4" justifyContent="space-between">
                        <Box>
                            <Box as='span'>?????????????????????:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.name}</Box>
                        </Box>
                        <Box>
                            <Box as='span'>???????????????:</Box>&nbsp;&nbsp;
                            {item.status === 'active' && <Box as='span'>??????????????????????????????????????????</Box>}
                            {item.status === 'idle' && <Box as='span'>????????????</Box>}
                        </Box>
                        <Box>
                            <Box as='span'>?????????????????????????????????:</Box>&nbsp;&nbsp;
                            <Box as='span'>{item.User.firstName} {item.User.lastName}</Box>
                        </Box>

                    </Flex>
                    <Flex my="4">
                        <Box as='span'>????????????????????????:</Box>&nbsp;&nbsp;
                        {item.remark && <Box as='span'>{item.remark}</Box>}
                        {!item.remark && <Box as='span'>-</Box>}
                    </Flex>
                </Box>
                <Box>
                    <Flex justifyContent="flex-end" m="4">
                        <Box mx="3">
                            <Button variant="primary" size="sm" onClick={(e) => handleCreate(item, e)}>????????????????????????????????????</Button>
                        </Box>
                        <Box mx="3">
                            <Button variant="primary" size="sm" onClick={(e) => handleOpenEdit(item, e)}>???????????????</Button>
                        </Box>
                        <Box mx="3">
                            <Button variant="primary" size="sm" onClick={(e) => handleDelete(item, e)}>??????????????????????????????</Button>
                        </Box>
                    </Flex>
                </Box>
            </Flex>)}
            {openPopupAdd && <AddFarmComponent setOpenPopupAdd={setOpenPopupAdd} setFarmList={setFarmList} />}
            {openPopupEdit && <EditFarmComponent setOpenPopupEdit={setOpenPopupEdit} setFarmList={setFarmList} />}
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

export default FarmManagementComponent;