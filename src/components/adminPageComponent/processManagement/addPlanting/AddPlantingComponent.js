import "./AddPlantingComponent.css";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../../../config/axios';
import {
    Flex, FormControl, FormLabel, Input, Box, Button, Textarea, NumberInput, NumberInputField,
    NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Select
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
    setFarmManagement, setSeedManagement, setPlantingManagement, setAllFarm, setInProgressFarm, setIdleFarm,
    setAllPlanting, setInProgressPlanting, setHarvestPlanting, setFinishPlanting, setCancelPlanting,
    setPlantingList, setFarmOpenAddPlanting
} from "../../../../features/ProcessManagement/ProcessManagementSlice";
import { setCurrentPage, setPageNumber } from "../../../../features/Paginate/PaginateSlice";



const AddPlantingComponent = () => {
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
    const eachFarm = useSelector((state) => state.processManagement.eachFarm);
    const farmOpenAddPlanting = useSelector((state) => state.processManagement.farmOpenAddPlanting);

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
        if (!createPlanting.farmName) newError.farmName = '????????????????????????????????????????????????';
        if (!createPlanting.seedName) newError.seedName = '????????????????????????????????????????????????????????????????????????';
        if (!createPlanting.plantingApprovedFName) newError.plantingApprovedFName = '?????????????????????????????????????????????????????????????????????';
        if (!createPlanting.plantingApprovedLName) newError.plantingApprovedLName = '??????????????????????????????????????????????????????????????????????????????';
        if (!createPlanting.startDate) newError.startDate = '???????????????????????????????????????????????????????????????';
        if (!createPlanting.plantedAmount) newError.plantedAmount = '???????????????????????????????????????????????????????????????';
        if (!createPlanting.fertilizerPrice) newError.fertilizerPrice = '???????????????????????????????????????????????????';
        if (!createPlanting.maintenanceCost) newError.maintenanceCost = '???????????????????????????????????????????????????????????????';
        if (!createPlanting.miscellaneousExpenses) newError.miscellaneousExpenses = '????????????????????????????????????????????????????????????????????????????????????';
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
        }
    };

    const handleReset = (e) => {
        e.preventDefault();
        setCreatePlanting({
            farmName: '', seedName: '', startDate: '', plantingApprovedFName: '', plantingApprovedLName: '', plantingRemark: '',
            customerName: '', plantedAmount: '', fertilizerPrice: '', maintenanceCost: '', miscellaneousExpenses: ''
        })
    };

    const handleCancel = (e) => {
        e.preventDefault();
        if (farmOpenAddPlanting) {
            dispatch(setFarmOpenAddPlanting(false));
            history.push('/process-management');
            dispatch(setFarmManagement(true));
            dispatch(setSeedManagement(false));
            dispatch(setPlantingManagement(false));
            dispatch(setAllFarm(true));
            dispatch(setInProgressFarm(false));
            dispatch(setIdleFarm(false));
        } else {
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
    };

    return (
        <Box py="5" px="40">
            <Box textAlign="center" my="5">
                <h1><b><u>????????????????????????????????????</u></b></h1>
            </Box>
            <Box>
                <hr />
            </Box>
            <Box my="5">
                <form onSubmit={handlerSubmit}>
                    <FormControl isRequired>
                        <Flex flexFlow="column wrap">
                            <FormLabel my="1">????????????????????????????????????:</FormLabel>
                            {farmOpenAddPlanting && <Input name="farmName" value={createPlanting.farmName} placeholder="??????????????????????????????????????????????????????" />}
                            {!farmOpenAddPlanting && <Select name="farmName" onChange={handleInputChange} placeholder="??????????????????????????????????????????????????????">
                                {farm.map((item, index) => {
                                    if (item.status === 'idle') {
                                        return <option key={index} value={item.name}>{item.name}</option>
                                    }
                                })}
                            </Select>}
                            {error.farmName && <Box as="span" textAlign="center" color="#E53E3E">{error.farmName}</Box>}
                        </Flex>
                        <Flex flexFlow="column wrap">
                            <FormLabel my="1">?????????????????????????????????????????????:</FormLabel>
                            <Select name="seedName" onChange={handleInputChange} placeholder="???????????????????????????????????????????????????????????????">
                                {seed.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
                            </Select>
                            {error.seedName && <Box as="span" textAlign="center" color="#E53E3E">{error.seedName}</Box>}
                        </Flex>

                        <Flex flexFlow="column wrap">
                            <FormLabel my="1">????????????????????????????????????:</FormLabel>
                            <Input type="date" min={`${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}`}
                                name="startDate" value={createPlanting.startDate} placeholder="????????????????????????????????????"
                                onChange={handleInputChange} />
                            {error.startDate && <Box as="span" textAlign="center" color="#E53E3E">{error.startDate}</Box>}
                        </Flex>
                        <Flex flexFlow="row wrap" justifyContent="space-between">
                            <Flex mr="4" flexFlow="column wrap" mr="2">
                                <FormLabel my="1">????????????????????????????????????:</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="plantedAmount" value={createPlanting.plantedAmount}
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
                                <FormLabel my="1">???????????????????????? (?????????):</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="fertilizerPrice" value={createPlanting.fertilizerPrice}
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
                                <FormLabel my="1">???????????????????????????????????? (?????????):</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="maintenanceCost" value={createPlanting.maintenanceCost}
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
                                <FormLabel my="1">????????????????????????????????????????????????????????? (?????????):</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="miscellaneousExpenses" value={createPlanting.miscellaneousExpenses}
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
                            <FormLabel my="1">????????????-????????????????????? ??????????????????????????????:</FormLabel>
                            <Flex justifyContent="space-between">
                                <Box mr="4" maxW="600px" w="100%">
                                    <Input name="plantingApprovedFName" value={createPlanting.plantingApprovedFName} placeholder="????????????"
                                        onChange={handleInputChange} />
                                    {error.plantingApprovedFName && <Box as="span" textAlign="center" color="#E53E3E">{error.plantingApprovedFName}</Box>}
                                </Box>
                                <Box ml="4" maxW="600px" w="100%">
                                    <Input name="plantingApprovedLName" value={createPlanting.plantingApprovedLName} placeholder="?????????????????????"
                                        onChange={handleInputChange} />
                                    {error.plantingApprovedLName && <Box as="span" textAlign="center" color="#E53E3E">{error.plantingApprovedLName}</Box>}
                                </Box>
                            </Flex>
                        </Flex>

                    </FormControl>
                    <Flex my="1" flexFlow="column wrap">
                        <FormLabel my="1">????????????????????????????????????????????????:</FormLabel>
                        <Input name="customerName" value={createPlanting.customerName} placeholder="????????????????????????????????????????????????"
                            onChange={handleInputChange} />
                    </Flex>
                    <Box my="1">
                        <FormLabel >????????????????????????:</FormLabel>
                        <Textarea name="plantingRemark" value={createPlanting.plantingRemark} placeholder="????????????????????????"
                            onChange={handleInputChange} />
                    </Box>

                    <Flex my="10" justifyContent="center">
                        <Box mx="3">
                            <Button variant="primary" type="submit" size="sm">???????????????</Button>
                        </Box>
                        <Box mx="3">
                            <Button variant="primary" size="sm" onClick={handleReset}>????????????</Button>
                        </Box>
                        <Box mx="3">
                            <Button variant="primary" size="sm" onClick={handleCancel}>??????????????????</Button>
                        </Box>
                    </Flex>
                </form>
            </Box>

            <Box my="5"><hr /></Box>
        </Box>
    );
};

export default AddPlantingComponent;