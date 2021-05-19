import "./SeedManagementComponent.css"
import { useState, useEffect } from "react";
import axios from "../../../../config/axios";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, setPageNumber } from "../../../../features/Paginate/PaginateSlice";
import { Icon, Button, Box, Flex, Input, Link } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import AddSeedComponent from "../addSeed/AddSeedComponent"
import EditSeedComponent from "../editSeed/EditSeedComponent";
import { setFarmManagement, setSeedManagement, setPlantingManagement } from "../../../../features/ProcessManagement/ProcessManagementSlice";


const SeedManagementComponent = () => {
    const [openPopupAdd, setOpenPopupAdd] = useState(false);
    const [openPopupEdit, setOpenPopupEdit] = useState(false);
    const [seedList, setSeedList] = useState([]);
    const [eachSeed, setEachSeed] = useState({});
    const [error, setError] = useState({});
    const [search, setSearch] = useState('');
    const [planting, setPlanting] = useState([]);

    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.paginate.currentPage);
    const listPerPage = useSelector((state) => state.paginate.listPerPage);
    const pageNumber = useSelector((state) => state.paginate.pageNumber);

    useEffect(() => {
        const fetchSeedList = async () => {
            try {
                const res = await axios.get(`/seeds/`);
                setSeedList(res.data.seed);
                const planting = await axios.get(`/plantings/all`);
                setPlanting(planting.data.planting);
                if (res.data.seed && res.data.seed.length > 0) {
                    dispatch(setCurrentPage(1));
                    const pageNumberTmp = [];
                    if (Math.ceil(res.data.seed.length / listPerPage) <= 0) {
                        pageNumberTmp.push(1);
                    } else {
                        for (let i = 1; i <= Math.ceil(res.data.seed.length / listPerPage); i++) {
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
        fetchSeedList();
    }, []);

    const handleInputChange = async (e) => {
        try {
            const { value } = e.target;
            if (value) {
                setSearch(value);
            } else {
                e.preventDefault();
                dispatch(setFarmManagement(false));
                dispatch(setSeedManagement(true));
                dispatch(setPlantingManagement(false));
                const res = await axios.get(`/seeds/`);
                setSeedList(res.data.seed);
                if (res.data.seed && res.data.seed.length > 0) {
                    dispatch(setCurrentPage(1));
                    const pageNumberTmp = [];
                    if (Math.ceil(res.data.seed.length / listPerPage) <= 0) {
                        pageNumberTmp.push(1);
                    } else {
                        for (let i = 1; i <= Math.ceil(res.data.seed.length / listPerPage); i++) {
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
            dispatch(setFarmManagement(false));
            dispatch(setSeedManagement(true));
            dispatch(setPlantingManagement(false));
            const res = await axios.get(`/seeds/search?search=${search}`);
            setSeedList(res.data.seed);
            if (res.data.seed && res.data.seed.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.seed.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.seed.length / listPerPage); i++) {
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

    const handleOpen = (e) => {
        e.preventDefault();
        setOpenPopupAdd(true);
    };

    const handleEdit = (item, e) => {
        e.preventDefault();
        setEachSeed(item)
        setOpenPopupEdit(true);
    };

    const handleDelete = async (item, e) => {
        try {
            e.preventDefault();
            await axios.delete(`/seeds/${item.id}`);
            dispatch(setFarmManagement(false));
            dispatch(setSeedManagement(true));
            dispatch(setPlantingManagement(false));
            const res = await axios.get(`/seeds/`);
            setSeedList(res.data.seed);
            if (res.data.seed && res.data.seed.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.seed.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.seed.length / listPerPage); i++) {
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
    const currentSeedList = seedList.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (numbers, e) => {
        e.preventDefault();
        dispatch(setCurrentPage(numbers));
    };

    const disableButton = (value, item) => {
        let list_o = value.filter(plan => plan.seedId === item.id)
        let tmp1 = list_o.find(plan => plan.status === 'harvested')
        let tmp2 = list_o.find(plan => plan.status === 'started' &&
            plan.startDate <= `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}`)
        let tmp3 = list_o.find(plan => plan.status === 'finished' &&
            plan.harvestDate === `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}`)
        let tmp4 = list_o.find(plan => plan.status === 'started' &&
            plan.startDate > `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}`)
        let tmp5 = list_o.find(plan => plan.status === 'finished' &&
            plan.harvestDate !== `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}`)
        let tmp6 = list_o.find(plan => plan.status === 'cancel')
        if (tmp1 || tmp2 || tmp3) {
            return true
        } else if (tmp4 || tmp5 || tmp6) {
            return false
        } else {
            return null
        }
    }

    return (
        <Box>
            <Box py="2.5">
                <h1><b><u>จัดการเมล็ดพันธุ์</u></b></h1>
            </Box>
            <Flex py="2.5" flexFlow="row wrap" justifyContent="space-between" alignItems="center">
                <Box mr="6">
                    <Button variant="outline" onClick={handleOpen}>เพิ่มเมล็ดพันธุ์ +</Button>
                </Box>
                <form className='search-form-seed' action="" onSubmit={handleSearch}>
                    <Box maxW="750px" w="100%">
                        <Input borderRadius="10" onChange={handleInputChange} value={search}
                            placeholder="กรุณากรอกชื่อเมล็ดพันธุ์ที่ต้องการค้นหา" />
                    </Box>
                    <Box ml="6">
                        <Button variant="primary" type="submit"><Icon as={SearchIcon} w={5} h={5} /></Button>
                    </Box>
                </form>
            </Flex>
            {currentSeedList.map((item, index) =>
                <Flex key={index} border="1px solid lightgrey" borderRadius="xl" my="5" p="5" flexFlow="column wrap">
                    <Box bg="muted.300" borderRadius="xl" p="5">
                        <Flex my="4" justifyContent="space-between">
                            <Box>
                                <Box as='span'>ชื่อเมล็ดพันธุ์:</Box>&nbsp;&nbsp;
                                <Box as='span'>{item.name}</Box>
                            </Box>
                            <Box>
                                <Box as='span'>ระยะเวลาปลูก:</Box>&nbsp;&nbsp;
                                <Box as='span'>{item.plantingTime}</Box>&nbsp;&nbsp;
                                <Box as='span'>วัน</Box>
                            </Box>
                            <Box>
                                <Box as='span'>ราคาเมล็ดพันธุ์:</Box>&nbsp;&nbsp;
                                <Box as='span'>{item.cost}</Box>&nbsp;&nbsp;
                                <Box as='span'>บาท</Box>
                            </Box>
                            <Box>
                                <Box as='span'>ผู้เพิ่มเมล็ดพันธุ์:</Box>&nbsp;&nbsp;
                                <Box as='span'>{item.User.firstName} {item.User.lastName}</Box>
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
                            {
                                disableButton(planting, item) === null ?
                                    <>
                                        <Box key={index} mx="3">
                                            <Button variant="primary" size="sm" onClick={(e) => handleEdit(item, e)}>แก้ไข</Button>
                                        </Box>
                                        <Box mx="3">
                                            <Button variant="primary" size="sm" onClick={(e) => handleDelete(item, e)}>ลบเมล็ดพันธุ์</Button>
                                        </Box>
                                    </> :
                                    <>
                                        <Box key={index} mx="3">
                                            <Button variant="primary" size="sm" disabled={disableButton(planting, item)} onClick={(e) => handleEdit(item, e)}>แก้ไข</Button>
                                        </Box>
                                        <Box mx="3">
                                            <Button variant="primary" size="sm" disabled={disableButton(planting, item)} onClick={(e) => handleDelete(item, e)}>ลบเมล็ดพันธุ์</Button>
                                        </Box>
                                    </>
                            }
                        </Flex>
                    </Box>
                </Flex>
            )}
            {openPopupAdd && <AddSeedComponent setOpenPopupAdd={setOpenPopupAdd} setSeedList={setSeedList} />}
            {openPopupEdit && <EditSeedComponent setOpenPopupEdit={setOpenPopupEdit} eachSeed={eachSeed} setSeedList={setSeedList} />}
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

export default SeedManagementComponent;