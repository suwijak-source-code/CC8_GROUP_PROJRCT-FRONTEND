import "./AddSeedComponent.css";
import axios from '../../../../config/axios';
import {
    Flex, FormControl, FormLabel, Input, Box, Button, Textarea, NumberInput, NumberInputField,
    NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper
} from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setFarmManagement, setSeedManagement, setPlantingManagement } from "../../../../features/ProcessManagement/ProcessManagementSlice";
import { setCurrentPage, setPageNumber } from "../../../../features/Paginate/PaginateSlice";

const AddSeedComponent = ({ setOpenPopupAdd, setSeedList }) => {
    const [createSeed, setCreateSeed] = useState({
        seedName: '', seedApprovedFName: '', seedApprovedLName: '',
        seedRemark: '', seedCost: '', plantingTime: ''
    });
    const [error, setError] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();
    const listPerPage = useSelector((state) => state.paginate.listPerPage);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreateSeed(prev => ({ ...prev, [name]: value }));
    };

    const handlePlantingTimeChange = (value) => {
        setCreateSeed(prev => ({ ...prev, plantingTime: value }));
    };

    const handleSeedCostChange = (value) => {
        setCreateSeed(prev => ({ ...prev, seedCost: value }));
    };

    const validateInput = () => {
        const newError = {};
        if (!createSeed.seedName) newError.seedName = 'กรุณาระบุชื่อเมล็ดพันธ์ุ';
        if (!createSeed.seedApprovedFName) newError.seedApprovedFName = 'กรุณาระบุชื่อผู้อนุมัติ';
        if (!createSeed.seedApprovedLName) newError.seedApprovedLName = 'กรุณาระบุนามสกุลผู้อนุมัติ';
        if (!createSeed.seedCost) newError.seedCost = 'กรุณาระบุราคาเมล็ดพันธุ์';
        if (!createSeed.plantingTime) newError.plantingTime = 'กรุณาระบุระยะเวลาการปลูก';
        setError(newError);
    };

    const handlerSubmit = async (e) => {
        try {
            e.preventDefault();
            validateInput();
            await axios.post('/seeds/',
                {
                    seedName: createSeed.seedName, seedApprovedFName: createSeed.seedApprovedFName,
                    seedApprovedLName: createSeed.seedApprovedLName, seedRemark: createSeed.seedRemark,
                    seedCost: createSeed.seedCost, plantingTime: createSeed.plantingTime
                });
            setOpenPopupAdd(false);
            dispatch(setFarmManagement(false));
            dispatch(setSeedManagement(true));
            dispatch(setPlantingManagement(false));
            const res = await axios.get(`/seeds/`);
            setSeedList(res.data.seed);
            if (res.data.seed && res.data.seed.length > 0) {
                dispatch(setCurrentPage(1));
                const pageNumberTmp = [];
                if (Math.ceil(res.data.seed.length / listPerPage) <= 0) {
                    pageNumberTmp.push(1);
                } else {
                    for (let i = 1; i <= Math.ceil(res.data.seed.length / listPerPage); i++) {
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
        setOpenPopupAdd(false);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setCreateSeed({
            seedName: '', seedApprovedFName: '', seedApprovedLName: '',
            seedRemark: '', seedCost: '', plantingTime: ''
        })
    };

    return (
        <div className="popup-seed-create">
            <div className="popup-seed-create-from">
                <div>
                    <a className="close-popup-seed-create" onClick={handleClose}>&#10006;</a>
                </div>
                <div>
                    <h1><b>สร้างเมล็ดพันธุ์</b></h1>
                </div>
                <div><hr /></div>
                <div>
                    <form onSubmit={handlerSubmit}>
                        <FormControl isRequired>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">ชื่อเมล็ดพันธุ์:</FormLabel>
                                <Input name="seedName" value={createSeed.seedName} placeholder="ชื่อเมล็ดพันธุ์"
                                    onChange={handleInputChange} />
                                {error.seedName && <Box as="span" textAlign="center" color="#E53E3E">{error.seedName}</Box>}
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">ระยะเวลาปลูก:</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="plantingTime" value={createSeed.plantingTime}
                                    onChange={handlePlantingTimeChange}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                {error.plantingTime && <Box as="span" textAlign="center" color="#E53E3E">{error.plantingTime}</Box>}
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">ราคาเมล็ดพันธุ์:</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="seedCost" value={createSeed.seedCost}
                                    onChange={handleSeedCostChange}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                {error.seedCost && <Box as="span" textAlign="center" color="#E53E3E">{error.seedCost}</Box>}
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">ชื่อ-นามสกุล ผู้อนุมัติ:</FormLabel>
                                <Flex justifyContent="space-between">
                                    <Box>
                                        <Input name="seedApprovedFName" value={createSeed.seedApprovedFName} placeholder="ชื่อ"
                                            onChange={handleInputChange} />
                                        {error.seedApprovedFName && <Box as="span" textAlign="center" color="#E53E3E">{error.seedApprovedFName}</Box>}
                                    </Box>
                                    <Box>
                                        <Input name="seedApprovedLName" value={createSeed.seedApprovedLName} placeholder="นามสกุล"
                                            onChange={handleInputChange} />
                                        {error.seedApprovedLName && <Box as="span" textAlign="center" color="#E53E3E">{error.seedApprovedLName}</Box>}
                                    </Box>
                                </Flex>
                            </Flex>
                        </FormControl>
                        <Box my="3">
                            <FormLabel >หมายเหตุ:</FormLabel>
                            <Textarea name="seedRemark" value={createSeed.seedRemark} placeholder="หมายเหตุ"
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
    );
};

export default AddSeedComponent