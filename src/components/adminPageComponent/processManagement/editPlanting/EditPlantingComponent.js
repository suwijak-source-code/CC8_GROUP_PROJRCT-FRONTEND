import "./EditPlantingComponent.css";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../../../config/axios';
import {
    Flex, FormControl, FormLabel, Input, Box, Button, Textarea, NumberInput, NumberInputField,
    NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Select
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setFarmManagement, setSeedManagement, setPlantingManagement } from "../../../../features/ProcessManagement/ProcessManagementSlice";
import { setCurrentPage, setPageNumber } from "../../../../features/Paginate/PaginateSlice";


const EditPlantingComponent = ({ eachPlanting, setOpenPopupEdit, setAll, setCancel, setInProgress,
    setHarvest, setFinish, setPlantingList }) => {
    const [editPlanting, setEditPlanting] = useState({
        farmName: '', seedName: '', startDate: '', plantingApprovedFName: '', plantingApprovedLName: '', plantingRemark: '',
        customerName: '', plantedAmount: ''
    });
    const [farm, setFarm] = useState([]);
    const [seed, setSeed] = useState([]);
    const [error, setError] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();
    const listPerPage = useSelector((state) => state.paginate.listPerPage);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const resFarm = await axios.get(`/farms/${'all'}`);
                setFarm(resFarm.data.farm);
                const resSeed = await axios.get(`/seeds/`);
                setSeed(resSeed.data.seed);
            } catch (err) {
                if (err.response) {
                    setError({ server: err.response.data.message });
                } else {
                    setError({ front: err.message });
                }
            }
        }
        fetchList();
        let customer;
        if (!eachPlanting.Customer) {
            customer = "";
        } else {
            customer = eachPlanting.Customer.fullName;
        }
        setEditPlanting({
            farmName: eachPlanting.Farm.name, seedName: eachPlanting.Seed.name,
            startDate: eachPlanting.startDate,
            plantingApprovedFName: eachPlanting.PlantingApproved.firstName,
            plantingApprovedLName: eachPlanting.PlantingApproved.lastName, plantingRemark: eachPlanting.remark,
            customerName: customer, plantedAmount: eachPlanting.plantedAmount
        })
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditPlanting(prev => ({ ...prev, [name]: value }));
    };

    const handlePlantedAmountChange = (value) => {
        setEditPlanting(prev => ({ ...prev, plantedAmount: value }));
    };

    const validateInput = () => {
        const newError = {};
        if (!editPlanting.farmName) newError.farmName = 'กรุณาระบุชื่อสวน';
        if (!editPlanting.seedName) newError.seedName = 'กรุณาระบุชื่อเมล็ดพันธุ์';
        if (!editPlanting.plantingApprovedFName) newError.plantingApprovedFName = 'กรุณาระบุชื่อผู้อนุมัติ';
        if (!editPlanting.plantingApprovedLName) newError.plantingApprovedLName = 'กรุณาระบุนามสกุลผู้อนุมัติ';
        if (!editPlanting.startDate) newError.startDate = 'กรุณาระบุวันเริ่มปลูก';
        if (!editPlanting.plantedAmount) newError.plantedAmount = 'กรุณาระบุจำนวนที่ปลูก';
        setError(newError);
    };

    const handlerSubmit = async (e) => {
        try {
            e.preventDefault();
            validateInput();
            await axios.put(`/plantings/${eachPlanting.id}`, {
                farmName: editPlanting.farmName, seedName: editPlanting.seedName, startDate: editPlanting.startDate,
                plantingApprovedFName: editPlanting.plantingApprovedFName, plantingApprovedLName: editPlanting.plantingApprovedLName,
                plantingRemark: editPlanting.plantingRemark, customerName: editPlanting.customerName, plantedAmount: editPlanting.plantedAmount
            });
            setOpenPopupEdit(false);
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
        };
    };

    const handleClose = (e) => {
        e.preventDefault();
        setOpenPopupEdit(false);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setEditPlanting({
            farmName: '', seedName: '', startDate: '', plantingApprovedFName: '', plantingApprovedLName: '', plantingRemark: '',
            customerName: '', plantedAmount: ''
        })
    };

    return (
        <div className="popup-planting-edit">
            <div className="popup-planting-edit-from">
                <div>
                    <a className="close-popup-planting-edit" onClick={handleClose}>&#10006;</a>
                </div>
                <div>
                    <h1><b>แก้ไขการผลิต</b></h1>
                </div>
                <div><hr /></div>
                <div>
                    <form onSubmit={handlerSubmit}>
                        <FormControl isRequired>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="1">ชื่อแปลงปลูก:</FormLabel>
                                {editPlanting.farmName && <Select name="farmName" value={editPlanting.farmName} onChange={handleInputChange} placeholder="กรุณาเลือกแปลงปลูก">
                                    {farm.map((item, index) => {
                                        if (item.status === 'idle' || item.name === editPlanting.farmName) {
                                            return <option key={index} value={item.name}>{item.name}</option>
                                        }
                                    })}
                                </Select>}
                                {!editPlanting.farmName && <Select name="farmName" onChange={handleInputChange} placeholder="กรุณาเลือกแปลงปลูก">
                                    {farm.map((item, index) => {
                                        if (item.status === 'idle') {
                                            return <option key={index} value={item.name}>{item.name}</option>
                                        }
                                    })}
                                </Select>}
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="1">ชื่อเมล็ดพันธุ์:</FormLabel>
                                {editPlanting.seedName && <Select name="seedName" value={editPlanting.seedName} onChange={handleInputChange} placeholder="กรุณาเลือกเมล็ดพันธุ์">
                                    {seed.map((item, index) => <option key={index} value={item.name} >{item.name}</option>)}
                                </Select>}
                                {!editPlanting.seedName && <Select name="seedName" onChange={handleInputChange} placeholder="กรุณาเลือกเมล็ดพันธุ์">
                                    {seed.map((item, index) => <option key={index} value={item.name} >{item.name}</option>)}
                                </Select>}

                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="1">จำนวนที่ปลูก:</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="plantedAmount" value={editPlanting.plantedAmount}
                                    onChange={handlePlantedAmountChange}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="1">วันเริ่มปลูก:</FormLabel>
                                <Input type="date" min={`${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}`}
                                    name="startDate" value={editPlanting.startDate} placeholder="วันเริ่มปลูก"
                                    onChange={handleInputChange} />
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="1">ชื่อ-นามสกุล ผู้อนุมัติ:</FormLabel>
                                <Flex justifyContent="space-between">
                                    <Box>
                                        <Input name="plantingApprovedFName" value={editPlanting.plantingApprovedFName} placeholder="ชื่อ"
                                            onChange={handleInputChange} />
                                    </Box>
                                    <Box>
                                        <Input name="plantingApprovedLName" value={editPlanting.plantingApprovedLName} placeholder="นามสกุล"
                                            onChange={handleInputChange} />
                                    </Box>
                                </Flex>
                            </Flex>
                        </FormControl>
                        <Flex my="1" flexFlow="column wrap">
                            <FormLabel my="1">ชื่อลูกค้าที่จอง:</FormLabel>
                            <Input name="customerName" value={editPlanting.customerName} placeholder="ชื่อลูกค้าที่จอง"
                                onChange={handleInputChange} />
                        </Flex>
                        <Box my="1">
                            <FormLabel >หมายเหตุ:</FormLabel>
                            <Textarea name="plantingRemark" value={editPlanting.plantingRemark} placeholder="หมายเหตุ"
                                onChange={handleInputChange} />
                        </Box>
                        <Box my="3">
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
}

export default EditPlantingComponent;