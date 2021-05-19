import "./EmployeesManagement.css"
import { Icon, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Box, Button, Input, Link } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import ListEmployeeComponent from "../../../components/adminPageComponent/employeesManagement/listEmployee/ListEmployeeComponent";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../../config/axios";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, setPageNumber } from "../../../features/Paginate/PaginateSlice";




const EmployeesManagement = () => {
    const [userList, setUserList] = useState([]);
    const [all, setAll] = useState(true);
    const [active, setActive] = useState(false);
    const [suspended, setSuspended] = useState(false);
    const [quited, setQuited] = useState(false);
    const [error, setError] = useState({});
    const [search, setSearch] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.paginate.currentPage);
    const listPerPage = useSelector((state) => state.paginate.listPerPage);
    const pageNumber = useSelector((state) => state.paginate.pageNumber);

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const res = await axios.get(`/users/${'all'}`);
                setUserList(res.data.profileAll);
                if (res.data.profileAll && res.data.profileAll.length > 0) {
                    dispatch(setCurrentPage(1));
                    const pageNumberTmp = [];
                    if (Math.ceil(res.data.profileAll.length / listPerPage) <= 0) {
                        pageNumberTmp.push(1);
                    } else {
                        for (let i = 1; i <= Math.ceil(res.data.profileAll.length / listPerPage); i++) {
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
        fetchUserList();
    }, []);

    const handleAll = async (e) => {
        try {
            e.preventDefault();
            setAll(true);
            setActive(false);
            setSuspended(false);
            setQuited(false);
            const res = await axios.get(`/users/${'all'}`);
            setUserList(res.data.profileAll);
            if (res.data.profileAll && res.data.profileAll.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.profileAll.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.profileAll.length / listPerPage); i++) {
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
    };

    const handleActive = async (e) => {
        try {
            e.preventDefault();
            setAll(false);
            setActive(true);
            setSuspended(false);
            setQuited(false);
            const res = await axios.get(`/users/${'active'}`);
            setUserList(res.data.profileAll);
            if (res.data.profileAll && res.data.profileAll.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.profileAll.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.profileAll.length / listPerPage); i++) {
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
    };

    const handleSuspended = async (e) => {
        try {
            e.preventDefault();
            setAll(false);
            setActive(false);
            setSuspended(true);
            setQuited(false);
            const res = await axios.get(`/users/${'break'}`);
            setUserList(res.data.profileAll);
            if (res.data.profileAll && res.data.profileAll.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.profileAll.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.profileAll.length / listPerPage); i++) {
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
    };

    const handleQuited = async (e) => {
        try {
            e.preventDefault();
            setAll(false);
            setActive(false);
            setSuspended(false);
            setQuited(true);
            const res = await axios.get(`/users/${'quited'}`);
            setUserList(res.data.profileAll);
            if (res.data.profileAll && res.data.profileAll.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.profileAll.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.profileAll.length / listPerPage); i++) {
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
    };

    const handleInputChange = async (e) => {
        try {
            const { value } = e.target;
            if (value) {
                setSearch(value);
            } else {
                e.preventDefault();
                setAll(true);
                setActive(false);
                setSuspended(false);
                setQuited(false);
                const res = await axios.get(`/users/${'all'}`);
                setUserList(res.data.profileAll);
                if (res.data.profileAll && res.data.profileAll.length > 0) {
                    dispatch(setCurrentPage(1));
                    const pageNumberTmp = [];
                    if (Math.ceil(res.data.profileAll.length / listPerPage) <= 0) {
                        pageNumberTmp.push(1);
                    } else {
                        for (let i = 1; i <= Math.ceil(res.data.profileAll.length / listPerPage); i++) {
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
            setAll(true);
            setActive(false);
            setSuspended(false);
            setQuited(false);
            let query;
            if (search === 'คนสวน') {
                query = 'gardener';
            } else if (search === 'พนักงานขาย') {
                query = 'sales';
            } else {
                query = search;
            }
            const res = await axios.get(`/users/search?search=${query}`);
            setUserList(res.data.profileSearch);
            if (res.data.profileAll && res.data.profileAll.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.profileAll.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.profileAll.length / listPerPage); i++) {
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
    };

    const handleOpenAdd = (e) => {
        e.preventDefault();
        history.push('/add-employees');
    };

    const indexOfLastPost = currentPage * listPerPage;
    const indexOfFirstPost = indexOfLastPost - listPerPage;
    const currentUserList = userList.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (numbers, e) => {
        e.preventDefault();
        dispatch(setCurrentPage(numbers));
    };

    return (
        <Box>
            <Box my="5" px="40">
                <Box>
                    <h1><b><u>รายชื่อพนักงาน</u></b></h1>
                </Box>
                <Flex py="2.5" flexFlow="row wrap" justifyContent="space-between" alignItems="center" >
                    <Box mr="6">
                        <Button variant="outline" onClick={handleOpenAdd}>เพิ่มพนักงาน +</Button>
                    </Box>
                    <form className='search-form' action="" onSubmit={handleSearch}>
                        <Box maxW="800px" w="100%">
                            <Input borderRadius="10" onChange={handleInputChange} value={search}
                                placeholder="กรุณากรอกชื่อ นามสกุล ตำแหน่ง หรือเลขบัตรประจำตัวประชาชน ของพนักงานที่ต้องการค้นหา" />
                        </Box>
                        <Box ml="6">
                            <Button variant="primary" type="submit"><Icon as={SearchIcon} w={5} h={5} /></Button>
                        </Box>
                    </form>
                </Flex>
                <Box my="4"><hr /></Box>
                <Flex justifyContent="center" p="8">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleAll}>ทั้งหมด</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleActive}>พนักงาน</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleSuspended}>พักงาน</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleQuited}>ลาออก</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Flex>
                <Box my="4"><hr /></Box>
            </Box>

            {all && <Box my="5" px="40">
                {currentUserList.map((item, index) => <ListEmployeeComponent key={index} item={item} />)}
            </Box>}

            {active && <Box my="5" px="40">
                {currentUserList.map((item, index) => <ListEmployeeComponent key={index} item={item} />)}
            </Box>}

            {suspended && <Box my="5" px="40">
                {currentUserList.map((item, index) => <ListEmployeeComponent key={index} item={item} />)}
            </Box>}

            {quited && <Box my="5" px="40">
                {currentUserList.map((item, index) => <ListEmployeeComponent key={index} item={item} />)}
            </Box>}

            <Flex justifyContent="center" my="5">
                {pageNumber.map((numbers, index) =>
                    <Link key={index} mx="1" onClick={(e) => paginate(numbers, e)}>
                        {numbers}
                    </Link>
                )}
            </Flex>
            <Box my="5">
                <hr />
            </Box>
        </Box>
    )
}

export default EmployeesManagement;