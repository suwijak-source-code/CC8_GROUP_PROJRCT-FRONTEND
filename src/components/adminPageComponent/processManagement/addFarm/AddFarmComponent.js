import "./AddFarmComponent.css";
import axios from '../../../../config/axios';
import { Flex, FormControl, FormLabel, Input, Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setFarmManagement, setSeedManagement, setPlantingManagement } from "../../../../features/ProcessManagement/ProcessManagementSlice";
import { setCurrentPage, setPageNumber } from "../../../../features/Paginate/PaginateSlice";

const AddFarmComponent = ({ setOpenPopupAdd, setFarmList, setAll, setInProgress, setIdle }) => {
    const [createFarm, setCreateFarm] = useState({
        farmName: '', farmApprovedFName: '', farmApprovedLName: '', farmRemark: ''
    });
    const [error, setError] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();
    const listPerPage = useSelector((state) => state.paginate.listPerPage);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreateFarm(prev => ({ ...prev, [name]: value }));
    };

    const validateInput = () => {
        const newError = {};
        if (!createFarm.farmName) newError.farmName = 'กรุณาระบุชื่อสวน';
        if (!createFarm.farmApprovedFName) newError.farmApprovedFName = 'กรุณาระบุชื่อผู้อนุมัติ';
        if (!createFarm.farmApprovedLName) newError.farmApprovedLName = 'กรุณาระบุนามสกุลผู้อนุมัติ';
        setError(newError);
    };

    const handlerSubmit = async (e) => {
        try {
            e.preventDefault();
            validateInput();
            await axios.post('/farms/',
                {
                    status: 'idle', farmName: createFarm.farmName, farmApprovedFName: createFarm.farmApprovedFName,
                    farmApprovedLName: createFarm.farmApprovedLName, farmRemark: createFarm.farmRemark
                });
            setOpenPopupAdd(false);
            dispatch(setFarmManagement(true));
            dispatch(setSeedManagement(false));
            dispatch(setPlantingManagement(false));
            setAll(true);
            setInProgress(false);
            setIdle(false);
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
    };

    const handleClose = (e) => {
        e.preventDefault();
        setOpenPopupAdd(false);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setCreateFarm({
            farmName: '', farmApprovedFName: '', farmApprovedLName: '', farmRemark: ''
        })
    };

    return (
        <div className="popup-farm-create">
            <div className="popup-farm-create-from">
                <div>
                    <a className="close-popup-farm-create" onClick={handleClose}>&#10006;</a>
                </div>
                <div>
                    <h1><b>สร้างแปลงปลูก</b></h1>
                </div>
                <div><hr /></div>
                <div>
                    <form onSubmit={handlerSubmit}>
                        <FormControl isRequired>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">ชื่อสวน:</FormLabel>
                                <Input name="farmName" value={createFarm.farmName} placeholder="ชื่อสวน"
                                    onChange={handleInputChange} />
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">ชื่อ-นามสกุล ผู้อนุมัติ:</FormLabel>
                                <Flex justifyContent="space-between">
                                    <Box>
                                        <Input name="farmApprovedFName" value={createFarm.farmApprovedFName} placeholder="ชื่อ"
                                            onChange={handleInputChange} />
                                    </Box>
                                    <Box>
                                        <Input name="farmApprovedLName" value={createFarm.farmApprovedLName} placeholder="นามสกุล"
                                            onChange={handleInputChange} />
                                    </Box>
                                </Flex>
                            </Flex>
                        </FormControl>
                        <Box my="3">
                            <FormLabel >หมายเหตุ:</FormLabel>
                            <Textarea name="farmRemark" value={createFarm.farmRemark} placeholder="หมายเหตุ"
                                onChange={handleInputChange} />
                        </Box>
                        <Box my="5">
                            <hr />
                        </Box>
                        <Flex justifyContent="center">
                            <Box mx="3">
                                <Button variant="primary" type="submit" size="sm">สร้าง</Button>
                            </Box>
                            <Box mx="3">
                                <Button variant="primary" size="sm" onClick={handleReset}>ล้าง</Button>
                            </Box>
                        </Flex>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddFarmComponent;