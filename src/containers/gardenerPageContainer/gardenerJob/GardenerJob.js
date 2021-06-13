import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Box, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GardenerJobListComponent from "../../../components/gardenerPageComponent/gardenerJobList/GardenerJobListComponent";
import axios from "../../../config/axios";
import { setCurrentPage, setPageNumber } from "../../../features/Paginate/PaginateSlice";



const GardenerJob = () => {
    const [gardenerJob, setGardenerJob] = useState([]);
    const [all, setAll] = useState(true);
    const [assign, setAssign] = useState(false);
    const [inProgress, setInProgress] = useState(false);
    const [checking, setChecking] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState({});

    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.paginate.currentPage);
    const listPerPage = useSelector((state) => state.paginate.listPerPage);
    const pageNumber = useSelector((state) => state.paginate.pageNumber);


    useEffect(() => {
        const fetchGardenerJob = async () => {
            try {
                const res = await axios.get(`/jobs/by-user/${'all'}`);
                const job = res.data.job.filter((item) => {
                    if (item.assignDate === `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}`) {
                        return item;
                    }
                });
                setGardenerJob(job);
                if (job && job.length > 0) {
                    dispatch(setCurrentPage(1));
                    const pageNumberTmp = [];
                    if (Math.ceil(job.length / listPerPage) <= 0) {
                        pageNumberTmp.push(1);
                    } else {
                        for (let i = 1; i <= Math.ceil(job.length / listPerPage); i++) {
                            pageNumberTmp.push(i);
                        };
                    };
                    dispatch(setPageNumber(pageNumberTmp));
                };
            } catch (err) {
                if (err.response) {
                    setError({ server: err.response.data.message });
                } else {
                    setError({ front: err.message });
                }
            };
        };
        fetchGardenerJob();
    }, []);

    const handleAll = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.get(`/jobs/by-user/${'all'}`);
            const job = res.data.job.filter((item) => {
                if (item.assignDate === `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}`) {
                    return item;
                }
            });
            setGardenerJob(job);
            if (job && job.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(job.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(job.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                };
                dispatch(setPageNumber(pageNumberTmp));
            };
            setAll(true);
            setAssign(false);
            setInProgress(false);
            setChecking(false);
            setSuccess(false);
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    };

    const handleAssign = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.get(`/jobs/by-user/${'assign'}`);
            const job = res.data.job.filter((item) => {
                if (item.assignDate === `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}`) {
                    return item;
                }
            });
            setGardenerJob(job);
            if (job && job.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(job.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(job.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                };
                dispatch(setPageNumber(pageNumberTmp));
            };
            setAll(false);
            setAssign(true);
            setInProgress(false);
            setChecking(false);
            setSuccess(false);
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
            const res = await axios.get(`/jobs/by-user/${'in progress'}`);
            const job = res.data.job.filter((item) => {
                if (item.assignDate === `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}`) {
                    return item;
                }
            });
            setGardenerJob(job);
            if (job && job.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(job.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(job.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                };
                dispatch(setPageNumber(pageNumberTmp));
            };
            setAll(false);
            setAssign(false);
            setInProgress(true);
            setChecking(false);
            setSuccess(false);
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
            const res = await axios.get(`/jobs/by-user/${'checking'}`);
            const job = res.data.job.filter((item) => {
                if (item.assignDate === `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}`) {
                    return item;
                }
            });
            setGardenerJob(job);
            if (job && job.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(job.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(job.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                };
                dispatch(setPageNumber(pageNumberTmp));
            };
            setAll(false);
            setAssign(false);
            setInProgress(false);
            setChecking(true);
            setSuccess(false);
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        };
    };

    const handleSuccess = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.get(`/jobs/by-user/${'finish'}`);
            const job = res.data.job.filter((item) => {
                if (item.assignDate === `${(new Date().getFullYear())}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}`) {
                    return item;
                }
            });
            setGardenerJob(job);
            if (job && job.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(job.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(job.length / listPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                };
                dispatch(setPageNumber(pageNumberTmp));
            };
            setAll(false);
            setAssign(false);
            setInProgress(false);
            setChecking(false);
            setSuccess(true);
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        };
    };

    const indexOfLastPost = currentPage * listPerPage;
    const indexOfFirstPost = indexOfLastPost - listPerPage;
    const currentGardenerJob = gardenerJob.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (numbers, e) => {
        e.preventDefault();
        dispatch(setCurrentPage(numbers));
    };
    console.log(gardenerJob)

    return (
        <Box>
            <Box my="5" px="40">
                <Box><h1><b><u>งานที่ต้องทำวันนี้</u></b></h1></Box>
                <Box my="4"><hr /></Box>
                <Flex justifyContent="center" p="8">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleAll}>งานทั้งหมด</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleAssign}>งานที่ได้รับมอบหมาย</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleInProgress}>งานที่กำลังดำเนินการ</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleChecking}>งานที่รอตรวจสอบ</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleSuccess}>งานที่สำเร็จ</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Flex>
                <Box my="4"><hr /></Box>

                {all && currentGardenerJob.map((item, index) => <GardenerJobListComponent key={index} item={item} />)}

                {assign && currentGardenerJob.map((item, index) => <GardenerJobListComponent key={index} item={item} />)}

                {inProgress && currentGardenerJob.map((item, index) => <GardenerJobListComponent key={index} item={item} />)}

                {checking && currentGardenerJob.map((item, index) => <GardenerJobListComponent key={index} item={item} />)}

                {success && currentGardenerJob.map((item, index) => <GardenerJobListComponent key={index} item={item} />)}

                <Flex justifyContent="center" my="5">
                    {pageNumber.map((numbers, index) =>
                        <Link key={index} mx="1" onClick={(e) => paginate(numbers, e)}>
                            {numbers}
                        </Link>
                    )}
                </Flex>
            </Box>
            <Box my="5">
                <hr />
            </Box>
        </Box>
    )
}
export default GardenerJob;