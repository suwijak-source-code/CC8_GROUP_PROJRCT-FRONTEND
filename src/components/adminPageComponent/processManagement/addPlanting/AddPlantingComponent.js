import "./AddPlantingComponent.css";
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



const AddPlantingComponent = ({ setOpenPopupAdd, eachFarm, setOpenPopupCreatePlanting, setAll, setCancel, setInProgress,
    setHarvest, setFinish, setPlantingList }) => {
    const [createPlanting, setCreatePlanting] = useState({
        farmName: '', seedName: '', startDate: '', plantingApprovedFName: '', plantingApprovedLName: '', plantingRemark: '',
        customerName: '', plantedAmount: '', fertilizerPrice: '', maintenanceCost: '', miscellaneousExpenses: ''
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
                if (eachFarm) {
                    setCreatePlanting({ farmName: eachFarm.name })
                }
            } catch (err) {
                if (err.response) {
                    setError({ server: err.response.data.message });
                } else {
                    setError({ front: err.message });
                }
            }
        }
        fetchList();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreatePlanting(prev => ({ ...prev, [name]: value }));
    };

    const handlePlantedAmountChange = (value) => {
        setCreatePlanting(prev => ({ ...prev, plantedAmount: value }));
    };

    const handleFertilizerPrice = (value) => {
        setCreatePlanting(prev => ({ ...prev, fertilizerPrice: value }));
    };

    const handleMaintenanceCost = (value) => {
        setCreatePlanting(prev => ({ ...prev, maintenanceCost: value }));
    };

    const handleMiscellaneousExpenses = (value) => {
        setCreatePlanting(prev => ({ ...prev, miscellaneousExpenses: value }));
    };

    const validateInput = () => {
        const newError = {};
        if (!createPlanting.farmName) newError.farmName = 'กรุณาระบุชื่อสวน';
        if (!createPlanting.seedName) newError.seedName = 'กรุณาระบุชื่อเมล็ดพันธุ์';
        if (!createPlanting.plantingApprovedFName) newError.plantingApprovedFName = 'กรุณาระบุชื่อผู้อนุมัติ';
        if (!createPlanting.plantingApprovedLName) newError.plantingApprovedLName = 'กรุณาระบุนามสกุลผู้อนุมัติ';
        if (!createPlanting.startDate) newError.startDate = 'กรุณาระบุวันเริ่มปลูก';
        if (!createPlanting.plantedAmount) newError.plantedAmount = 'กรุณาระบุจำนวนที่ปลูก';
        if (!createPlanting.fertilizerPrice) newError.plantedAmount = 'กรุณาระบุราคาปุ๋ย';
        if (!createPlanting.maintenanceCost) newError.plantedAmount = 'กรุณาระบุค่าดูแลรักษา';
        if (!createPlanting.miscellaneousExpenses) newError.plantedAmount = 'กรุณาระบุค่าใช้จ่ายเบ็ดเตล็ด';
        setError(newError);
    };

    const handlerSubmit = async (e) => {
        try {
            e.preventDefault();
            validateInput();
            await axios.post('/plantings/',
                {
                    status: 'started', farmName: createPlanting.farmName, seedName: createPlanting.seedName,
                    startDate: createPlanting.startDate, plantingApprovedFName: createPlanting.plantingApprovedFName,
                    plantingApprovedLName: createPlanting.plantingApprovedLName, plantingRemark: createPlanting.plantingRemark,
                    customerName: createPlanting.customerName, plantedAmount: createPlanting.plantedAmount,
                    fertilizerPrice: createPlanting.fertilizerPrice, maintenanceCost: createPlanting.maintenanceCost,
                    miscellaneousExpenses: createPlanting.miscellaneousExpenses
                });
            setOpenPopupAdd(false);
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

    const handleClose = (e) => {
        e.preventDefault();
        if (setOpenPopupAdd) {
            setOpenPopupAdd(false);
        } else if (setOpenPopupCreatePlanting) {
            setOpenPopupCreatePlanting(false);
        }
    };

    const handleReset = (e) => {
        e.preventDefault();
        setCreatePlanting({
            farmName: '', seedName: '', startDate: '', plantingApprovedFName: '', plantingApprovedLName: '', plantingRemark: '',
            customerName: '', plantedAmount: '', fertilizerPrice: '', maintenanceCost: '', miscellaneousExpenses: ''
        })
    };
    return (
        <div className="popup-planting-create">
            <div className="popup-planting-create-from">
                <div>
                    <a className="close-popup-planting-create" onClick={handleClose}>&#10006;</a>
                </div>
                <div>
                    <h1><b>สร้างการผลิต</b></h1>
                </div>
                <div><hr /></div>
                <div>
                    <form onSubmit={handlerSubmit}>
                        <FormControl isRequired>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="1">ชื่อแปลงปลูก:</FormLabel>
                                {eachFarm && <Input name="farmName" value={createPlanting.farmName} placeholder="กรุณาเลือกแปลงปลูก" />}
                                {!eachFarm && <Select name="farmName" onChange={handleInputChange} placeholder="กรุณาเลือกแปลงปลูก">
                                    {farm.map((item, index) => {
                                        if (item.status === 'idle') {
                                            return <option key={index} value={item.name}>{item.name}</option>
                                        }
                                    })}
                                </Select>}
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="1">ชื่อเมล็ดพันธุ์:</FormLabel>
                                <Select name="seedName" onChange={handleInputChange} placeholder="กรุณาเลือกเมล็ดพันธุ์">
                                    {seed.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
                                </Select>
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="1">จำนวนที่ปลูก:</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="plantedAmount" value={createPlanting.plantedAmount}
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
                                    name="startDate" value={createPlanting.startDate} placeholder="วันเริ่มปลูก"
                                    onChange={handleInputChange} />
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="1">ชื่อ-นามสกุล ผู้อนุมัติ:</FormLabel>
                                <Flex justifyContent="space-between">
                                    <Box>
                                        <Input name="plantingApprovedFName" value={createPlanting.plantingApprovedFName} placeholder="ชื่อ"
                                            onChange={handleInputChange} />
                                    </Box>
                                    <Box>
                                        <Input name="plantingApprovedLName" value={createPlanting.plantingApprovedLName} placeholder="นามสกุล"
                                            onChange={handleInputChange} />
                                    </Box>
                                </Flex>
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="1">ราคาปุ๋ย:</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="fertilizerPrice" value={createPlanting.fertilizerPrice}
                                    onChange={handleFertilizerPrice}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="1">ค่าลูแลรักษา:</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="maintenanceCost" value={createPlanting.maintenanceCost}
                                    onChange={handleMaintenanceCost}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="1">ค่าใช้จ่ายเบ็ดเตล็ด:</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="miscellaneousExpenses" value={createPlanting.miscellaneousExpenses}
                                    onChange={handleMiscellaneousExpenses}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>
                        </FormControl>
                        <Flex my="1" flexFlow="column wrap">
                            <FormLabel my="1">ชื่อลูกค้าที่จอง:</FormLabel>
                            <Input name="customerName" value={createPlanting.customerName} placeholder="ชื่อลูกค้าที่จอง"
                                onChange={handleInputChange} />
                        </Flex>
                        <Box my="1">
                            <FormLabel >หมายเหตุ:</FormLabel>
                            <Textarea name="plantingRemark" value={createPlanting.plantingRemark} placeholder="หมายเหตุ"
                                onChange={handleInputChange} />
                        </Box>
                        <Box my="3">
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
    );
};

export default AddPlantingComponent;