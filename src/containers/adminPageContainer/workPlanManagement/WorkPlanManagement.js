import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Box, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import WorkPlanListComponent from "../../../components/adminPageComponent/adminHome/workPlanList/WorkPlanListComponent";
import axios from "../../../config/axios";
import AssignWorkComponent from "../../../components/adminPageComponent/adminHome/assignWork/AssignWorkComponent";
import { setCurrentPage, setPageNumber } from "../../../features/Paginate/PaginateSlice";
import { setGardener, setAssignments } from "../../../features/WorkPlanManagement/WorkPlanManagementSlice";
import EditAssignComponent from "../../../components/adminPageComponent/adminHome/editAssign/EditAssignComponent";
import FinishWorkComponent from "../../../components/adminPageComponent/adminHome/finishWork/FinishWorkComponent";
import AssignWorkListComponent from "../../../components/adminPageComponent/adminHome/assignWorkList/AssignWorkListComponent";


const WorkPlanManagement = () => {
    const [allJob, setAllJob] = useState([]);
    const [all, setAll] = useState(true);
    const [assign, setAssign] = useState(false);
    const [notAssigned, setNotAssign] = useState(false);
    const [error, setError] = useState({});
    const [openAssign, setOpenAssign] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openFinish, setOpenFinish] = useState(false)


    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.paginate.currentPage);
    const listPerPage = useSelector((state) => state.paginate.listPerPage);
    const pageNumber = useSelector((state) => state.paginate.pageNumber);


    useEffect(() => {
        const fetchAllJob = async () => {
            try {
                const gardener = await axios.get('/users/gardener');
                dispatch(setGardener(gardener.data.gardener));
                const assignment = await axios.get(`/jobs/`);
                dispatch(setAssignments(assignment.data.job));
                const res = await axios.get(`/plantings/work-plan/${'all'}`);
                setAllJob(res.data.planting);
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
                };
            } catch (err) {
                if (err.response) {
                    setError({ server: err.response.data.message });
                } else {
                    setError({ front: err.message });
                }
            };
        };
        fetchAllJob();
    }, []);

    const handleAll = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.get(`/plantings/work-plan/${'all'}`);
            setAllJob(res.data.planting);
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
            setAll(true);
            setAssign(false);
            setNotAssign(false);
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        };
    };

    const handleAssign = (e) => {
        e.preventDefault();
        setAll(false);
        setAssign(true);
        setNotAssign(false);
    };

    const handleNotAssign = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.get(`/plantings/work-plan/${'notAssign'}`);
            setAllJob(res.data.planting);
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
            setAll(false);
            setAssign(false);
            setNotAssign(true);
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
    const currentAllJob = allJob.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (numbers, e) => {
        e.preventDefault();
        dispatch(setCurrentPage(numbers));
    };

    console.log(allJob.map(item => item));
    return (
        <Box>
            <Box my="5" px="40">
                <Box><h1><b><u>งานวันนี้</u></b></h1></Box>
                <Box my="4"><hr /></Box>
                <Flex justifyContent="center" p="8">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleAll}>ทั้งหมด</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleAssign}>มอบหมาย</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleNotAssign}>ยังไม่มอบหมาย</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Flex>
                <Box my="4"><hr /></Box>
                <Box>
                    {all && currentAllJob.map((item, index) =>
                        <WorkPlanListComponent key={index} item={item} setOpenAssign={setOpenAssign} setOpenEdit={setOpenEdit}
                            setOpenFinish={setOpenFinish} />
                    )}
                    {assign && <AssignWorkListComponent setOpenEdit={setOpenEdit} setOpenFinish={setOpenFinish} />}
                    {notAssigned && currentAllJob.map((item, index) =>
                        <WorkPlanListComponent key={index} item={item} setOpenAssign={setOpenAssign} setOpenEdit={setOpenEdit}
                            setOpenFinish={setOpenFinish} />
                    )}
                </Box>
                {openAssign && <AssignWorkComponent setOpenAssign={setOpenAssign} />}
                {openEdit && <EditAssignComponent setOpenEdit={setOpenEdit} />}
                {openFinish && <FinishWorkComponent setOpenFinish={setOpenFinish} />}
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

export default WorkPlanManagement;