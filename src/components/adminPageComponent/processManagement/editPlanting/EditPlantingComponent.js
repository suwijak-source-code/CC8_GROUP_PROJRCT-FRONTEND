import "./EditPlantingComponent.css";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../../../config/axios';
import {
    Flex, FormControl, FormLabel, Input, Box, Button, Textarea, NumberInput, NumberInputField,
    NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Select
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
    setFarmManagement, setSeedManagement, setPlantingManagement, setAllPlanting, setInProgressPlanting, setHarvestPlanting,
    setFinishPlanting, setCancelPlanting, setPlantingList
} from "../../../../features/ProcessManagement/ProcessManagementSlice";
import { setCurrentPage, setPageNumber } from "../../../../features/Paginate/PaginateSlice";


const EditPlantingComponent = ({ setOpenPopupEdit, setAll, setCancel, setInProgress,
    setHarvest, setFinish }) => {
    const [editPlanting, setEditPlanting] = useState({
        farmName: '', seedName: '', startDate: '', plantingApprovedFName: '', plantingApprovedLName: '', plantingRemark: '',
        customerName: '', plantedAmount: '', fertilizerPrice: '', maintenanceCost: '', miscellaneousExpenses: ''
    });
    const [farm, setFarm] = useState([]);
    const [seed, setSeed] = useState([]);
    const [error, setError] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();
    const listPerPage = useSelector((state) => state.paginate.listPerPage);
    const eachPlanting = useSelector((state) => state.processManagement.eachPlanting);

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
            customerName: customer, plantedAmount: eachPlanting.plantedAmount, fertilizerPrice: eachPlanting.fertilizerPrice,
            maintenanceCost: eachPlanting.maintenanceCost, miscellaneousExpenses: eachPlanting.miscellaneousExpenses
        })
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditPlanting(prev => ({ ...prev, [name]: value }));
    };

    const handlePlantedAmountChange = (value) => {
        setEditPlanting(prev => ({ ...prev, plantedAmount: value }));
    };

    const handleFertilizerPrice = (value) => {
        setEditPlanting(prev => ({ ...prev, fertilizerPrice: value }));
    };

    const handleMaintenanceCost = (value) => {
        setEditPlanting(prev => ({ ...prev, maintenanceCost: value }));
    };

    const handleMiscellaneousExpenses = (value) => {
        setEditPlanting(prev => ({ ...prev, miscellaneousExpenses: value }));
    };


    const validateInput = () => {
        const newError = {};
        if (!editPlanting.farmName) newError.farmName = 'กรุณาระบุชื่อสวน';
        if (!editPlanting.seedName) newError.seedName = 'กรุณาระบุชื่อเมล็ดพันธุ์';
        if (!editPlanting.plantingApprovedFName) newError.plantingApprovedFName = 'กรุณาระบุชื่อผู้อนุมัติ';
        if (!editPlanting.plantingApprovedLName) newError.plantingApprovedLName = 'กรุณาระบุนามสกุลผู้อนุมัติ';
        if (!editPlanting.startDate) newError.startDate = 'กรุณาระบุวันเริ่มปลูก';
        if (!editPlanting.plantedAmount) newError.plantedAmount = 'กรุณาระบุจำนวนที่ปลูก';
        if (!editPlanting.fertilizerPrice) newError.fertilizerPrice = 'กรุณาระบุราคาปุ๋ย';
        if (!editPlanting.maintenanceCost) newError.maintenanceCost = 'กรุณาระบุค่าดูแลรักษา';
        if (!editPlanting.miscellaneousExpenses) newError.miscellaneousExpenses = 'กรุณาระบุค่าใช้จ่ายเบ็ดเตล็ด';
        setError(newError);
    };

    const handlerSubmit = async (e) => {
        try {
            e.preventDefault();
            validateInput();
            await axios.put(`/plantings/${eachPlanting.id}`, {
                farmName: editPlanting.farmName, seedName: editPlanting.seedName, startDate: editPlanting.startDate,
                plantingApprovedFName: editPlanting.plantingApprovedFName, plantingApprovedLName: editPlanting.plantingApprovedLName,
                plantingRemark: editPlanting.plantingRemark, customerName: editPlanting.customerName, plantedAmount: editPlanting.plantedAmount,
                fertilizerPrice: editPlanting.fertilizerPrice, maintenanceCost: editPlanting.maintenanceCost, miscellaneousExpenses: editPlanting.miscellaneousExpenses
            });
            history.push('/process-management');
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
        };
    };

    const handleReset = (e) => {
        e.preventDefault();
        setEditPlanting({
            farmName: '', seedName: '', startDate: '', plantingApprovedFName: '', plantingApprovedLName: '', plantingRemark: '',
            customerName: '', plantedAmount: '', fertilizerPrice: '', maintenanceCost: '', miscellaneousExpenses: ''
        })
    };

    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/process-management');
        dispatch(setFarmManagement(false));
        dispatch(setSeedManagement(false));
        dispatch(setPlantingManagement(true));
        dispatch(setAllPlanting(true));
        dispatch(setInProgressPlanting(false));
        dispatch(setHarvestPlanting(false));
        dispatch(setFinishPlanting(false));
        dispatch(setCancelPlanting(false));
    }

    return (
        <Box py="5" px="40">
            <Box textAlign="center" my="5">
                <h1><b><u>แก้ไขการผลิต</u></b></h1>
            </Box>
            <Box><hr /></Box>
            <Box my="5">
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
                            {error.farmName && <Box as="span" textAlign="center" color="#E53E3E">{error.farmName}</Box>}
                        </Flex>
                        <Flex flexFlow="column wrap">
                            <FormLabel my="1">ชื่อเมล็ดพันธุ์:</FormLabel>
                            {editPlanting.seedName && <Select name="seedName" value={editPlanting.seedName} onChange={handleInputChange} placeholder="กรุณาเลือกเมล็ดพันธุ์">
                                {seed.map((item, index) => <option key={index} value={item.name} >{item.name}</option>)}
                            </Select>}
                            {!editPlanting.seedName && <Select name="seedName" onChange={handleInputChange} placeholder="กรุณาเลือกเมล็ดพันธุ์">
                                {seed.map((item, index) => <option key={index} value={item.name} >{item.name}</option>)}
                            </Select>}
                            {error.seedName && <Box as="span" textAlign="center" color="#E53E3E">{error.seedName}</Box>}
                        </Flex>

                        <Flex flexFlow="column wrap">
                            <FormLabel my="1">วันเริ่มปลูก:</FormLabel>
                            <Input type="date" min={`${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}`}
                                name="startDate" value={editPlanting.startDate} placeholder="วันเริ่มปลูก"
                                onChange={handleInputChange} />
                            {error.startDate && <Box as="span" textAlign="center" color="#E53E3E">{error.startDate}</Box>}
                        </Flex>
                        <Flex flexFlow="row wrap" justifyContent="space-between">
                            <Flex mr="4" flexFlow="column wrap" mr="2">
                                <FormLabel my="1">จำนวนที่ปลูก:</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="plantedAmount" value={editPlanting.plantedAmount}
                                    onChange={handlePlantedAmountChange}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                {error.plantedAmount && <Box as="span" textAlign="center" color="#E53E3E">{error.plantedAmount}</Box>}
                            </Flex>
                            <Flex mx="4" flexFlow="column wrap" ml="2">
                                <FormLabel my="1">ราคาปุ๋ย: (บาท)</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="fertilizerPrice" value={editPlanting.fertilizerPrice}
                                    onChange={handleFertilizerPrice}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                {error.fertilizerPrice && <Box as="span" textAlign="center" color="#E53E3E">{error.fertilizerPrice}</Box>}
                            </Flex>
                            <Flex mx="4" flexFlow="column wrap" mr="2">
                                <FormLabel my="1">ค่าลูแลรักษา: (บาท)</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="maintenanceCost" value={editPlanting.maintenanceCost}
                                    onChange={handleMaintenanceCost}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                {error.maintenanceCost && <Box as="span" textAlign="center" color="#E53E3E">{error.maintenanceCost}</Box>}
                            </Flex>
                            <Flex ml="4" flexFlow="column wrap" ml="2">
                                <FormLabel my="1">ค่าใช้จ่ายเบ็ดเตล็ด: (บาท)</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="miscellaneousExpenses" value={editPlanting.miscellaneousExpenses}
                                    onChange={handleMiscellaneousExpenses}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                {error.miscellaneousExpenses && <Box as="span" textAlign="center" color="#E53E3E">{error.miscellaneousExpenses}</Box>}
                            </Flex>
                        </Flex>

                        <Flex flexFlow="column wrap">
                            <FormLabel my="1">ชื่อ-นามสกุล ผู้อนุมัติ:</FormLabel>
                            <Flex justifyContent="space-between">
                                <Box>
                                    <Input name="plantingApprovedFName" value={editPlanting.plantingApprovedFName} placeholder="ชื่อ"
                                        onChange={handleInputChange} />
                                    {error.plantingApprovedFName && <Box as="span" textAlign="center" color="#E53E3E">{error.plantingApprovedFName}</Box>}
                                </Box>
                                <Box>
                                    <Input name="plantingApprovedLName" value={editPlanting.plantingApprovedLName} placeholder="นามสกุล"
                                        onChange={handleInputChange} />
                                    {error.plantingApprovedLName && <Box as="span" textAlign="center" color="#E53E3E">{error.plantingApprovedLName}</Box>}
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

                    <Flex my="10" justifyContent="center">
                        <Box mx="3">
                            <Button variant="primary" type="submit" size="sm">แก้ไข</Button>
                        </Box>
                        <Box mx="3">
                            <Button variant="primary" size="sm" onClick={handleReset}>ล้าง</Button>
                        </Box>
                        <Box mx="3">
                            <Button variant="primary" size="sm" onClick={handleCancel}>ยกเลิก</Button>
                        </Box>
                    </Flex>
                </form>
            </Box>
            <Box my="5"><hr /></Box>
        </Box>
    )
}

export default EditPlantingComponent;