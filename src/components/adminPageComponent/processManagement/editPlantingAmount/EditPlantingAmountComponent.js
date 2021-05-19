import "./EditPlantingAmountComponent.css";
import { useState, useEffect } from 'react';
import axios from '../../../../config/axios';
import { useSelector, useDispatch } from "react-redux";
import {
    Flex, FormControl, FormLabel, Input, Box, Button, NumberInput, NumberInputField,
    NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper
} from "@chakra-ui/react";
import { setFarmManagement, setSeedManagement, setPlantingManagement } from "../../../../features/ProcessManagement/ProcessManagementSlice";
import { setCurrentPage, setPageNumber } from "../../../../features/Paginate/PaginateSlice";



const EditPlantingAmount = ({ eachPlanting, setEditAmount, setPlantingList, setAll, setInProgress, setHarvest
    , setFinish, setCancel }) => {
    const [amount, setAmount] = useState({
        farmName: '', seedName: '', harvestedAmount: ''
    });
    const [error, setError] = useState({});

    const dispatch = useDispatch();
    const listPerPage = useSelector((state) => state.paginate.listPerPage);

    useEffect(() => {
        setAmount({
            farmName: eachPlanting.farmName, seedName: eachPlanting.seedName, harvestedAmount: eachPlanting.harvestedAmount
        });
    }, []);

    const handleAmountChange = (value) => {
        setAmount(prev => ({ ...prev, harvestedAmount: value }));
    };

    const validateInput = () => {
        const newError = {};
        if (!amount.harvestedAmount) newError.harvestedAmount = 'กรุณาระบุจำนวนผลผลิต';
        setError(newError);
    };

    const handlerSubmit = async (e) => {
        try {
            e.preventDefault();
            validateInput();
            await axios.patch(`/plantings/update-harvest-amount/${eachPlanting.id}`, {
                harvestedAmount: amount.harvestedAmount
            });
            setEditAmount(false);
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
        setEditAmount(false);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setAmount({
            harvestedAmount: ''
        })
    };
    return (
        <div className="popup-planting-edit-amount">
            <div className="popup-planting-edit-amount-from">
                <div>
                    <a className="close-popup-planting-edit-amount" onClick={handleClose}>&#10006;</a>
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
                                <Input name="farmName" value={amount.farmName} placeholder="ชื่อแปลงปลูก" />
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="1">ชื่อเมล็ดพันธุ์:</FormLabel>
                                <Input name="seedName" value={amount.seedName} placeholder="ชื่อแปลงปลูก" />
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="1">จำนวนผลผลิต:</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="harvestedAmount" value={amount.harvestedAmount}
                                    onChange={handleAmountChange}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>
                        </FormControl>
                        <Box my="3">
                            <hr />
                        </Box>
                        <Flex justifyContent="center">
                            <Box mx="3">
                                <Button variant="primary" type="submit" size="sm">ตกลง</Button>
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

export default EditPlantingAmount;