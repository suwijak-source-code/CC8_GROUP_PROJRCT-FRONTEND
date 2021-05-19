import "./EditFarmComponent.css";
import axios from '../../../../config/axios';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Flex, FormControl, FormLabel, Input, Box, Button, Textarea, Select } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setFarmManagement, setSeedManagement, setPlantingManagement } from "../../../../features/ProcessManagement/ProcessManagementSlice";
import { setCurrentPage, setPageNumber } from "../../../../features/Paginate/PaginateSlice";


const EditFarmComponent = ({ setOpenPopupEdit, eachFarm, setAll, setInProgress, setIdle, setFarmList }) => {
    const [editFarm, setEditFarm] = useState({
        farmName: '', farmApprovedFName: '', farmApprovedLName: '', farmRemark: '', status: ''
    });
    const [error, setError] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();
    const listPerPage = useSelector((state) => state.paginate.listPerPage);

    useEffect(() => {
        setEditFarm({
            farmName: eachFarm.name, farmApprovedFName: eachFarm.User.firstName,
            farmApprovedLName: eachFarm.User.lastName, farmRemark: eachFarm.remark, status: eachFarm.status
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFarm(prev => ({ ...prev, [name]: value }));
    };

    const validateInput = () => {
        const newError = {};
        if (!editFarm.farmName) newError.farmName = 'กรุณาระบุชื่อสวน';
        if (!editFarm.farmApprovedFName) newError.farmApprovedFName = 'กรุณาระบุชื่อผู้อนุมัติ';
        if (!editFarm.farmApprovedLName) newError.farmApprovedLName = 'กรุณาระบุนามสกุลผู้อนุมัติ';
        if (!editFarm.status) newError.status = 'กรุณาระบุสถานะ';
        setError(newError);
    };

    const handlerSubmit = async (e) => {
        try {
            e.preventDefault();
            validateInput();
            await axios.put(`/farms/${eachFarm.id}`, {
                farmName: editFarm.farmName, farmApprovedFName: editFarm.farmApprovedFName, farmApprovedLName: editFarm.farmApprovedLName,
                farmRemark: editFarm.farmRemark, status: editFarm.status
            });
            setOpenPopupEdit(false);
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
        setOpenPopupEdit(false);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setEditFarm({
            farmName: '', farmApprovedFName: '', farmApprovedLName: '', farmRemark: '', status: ''
        })
    };


    return (
        <div className="popup-farm-edit">
            <div className="popup-farm-edit-from">
                <div>
                    <a className="close-popup-farm-edit" onClick={handleClose}>&#10006;</a>
                </div>
                <div>
                    <h1><b>แก้ไขแปลงปลูก</b></h1>
                </div>
                <div><hr /></div>
                <div>
                    <form onSubmit={handlerSubmit}>
                        <FormControl isRequired>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">ชื่อสวน:</FormLabel>
                                <Input name="farmName" value={editFarm.farmName} placeholder="ชื่อสวน"
                                    onChange={handleInputChange} />
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">สถานะ:</FormLabel>
                                <Select name="status" onChange={handleInputChange} placeholder="กรุณาเลือกสถานะ">
                                    {editFarm.status && editFarm.status === 'idle' && <option value={editFarm.status} selected>ว่าง</option>}
                                    {editFarm.status && editFarm.status !== 'idle' && <option value={editFarm.status} selected>กำลังดำเนินการ</option>}
                                    {editFarm.status && editFarm.status === 'idle' && <option value="active">กำลังดำเนินการ</option>}
                                    {editFarm.status && editFarm.status !== 'idle' && <option value="idle">ว่าง</option>}
                                    {!editFarm.status && <option value="idle">ว่าง</option>}
                                    {!editFarm.status && <option value="active">กำลังดำเนินการ</option>}
                                </Select>
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">ชื่อ-นามสกุล ผู้อนุมัติ:</FormLabel>
                                <Flex justifyContent="space-between">
                                    <Box>
                                        <Input name="farmApprovedFName" value={editFarm.farmApprovedFName} placeholder="ชื่อ"
                                            onChange={handleInputChange} />
                                    </Box>
                                    <Box>
                                        <Input name="farmApprovedLName" value={editFarm.farmApprovedLName} placeholder="นามสกุล"
                                            onChange={handleInputChange} />
                                    </Box>
                                </Flex>
                            </Flex>
                        </FormControl>
                        <Box my="3">
                            <FormLabel >หมายเหตุ:</FormLabel>
                            <Textarea name="farmRemark" value={editFarm.farmRemark} placeholder="หมายเหตุ"
                                onChange={handleInputChange} />
                        </Box>
                        <Box my="5">
                            <hr />
                        </Box>
                        <Flex justifyContent="center">
                            <Box mx="3">
                                <Button variant="primary" type="submit" size="sm">แก้ไข</Button>
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
};

export default EditFarmComponent;