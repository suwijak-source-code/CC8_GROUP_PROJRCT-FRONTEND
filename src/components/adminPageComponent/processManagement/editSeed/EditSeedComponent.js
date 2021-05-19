import "./EditSeedComponent.css";
import axios from '../../../../config/axios';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import {
    Flex, FormControl, FormLabel, Input, Box, Button, Textarea, NumberInput, NumberInputField,
    NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFarmManagement, setSeedManagement, setPlantingManagement } from "../../../../features/ProcessManagement/ProcessManagementSlice";
import { setCurrentPage, setPageNumber } from "../../../../features/Paginate/PaginateSlice";



const EditSeedComponent = ({ setOpenPopupEdit, eachSeed, setSeedList }) => {
    const [editSeed, setEditSeed] = useState({
        seedName: '', seedApprovedFName: '', seedApprovedLName: '',
        seedRemark: '', seedCost: '', plantingTime: ''
    });
    const [error, setError] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();
    const listPerPage = useSelector((state) => state.paginate.listPerPage);

    useEffect(() => {
        setEditSeed({
            seedName: eachSeed.name, seedApprovedFName: eachSeed.User.firstName,
            seedApprovedLName: eachSeed.User.lastName, seedRemark: eachSeed.remark, seedCost: eachSeed.cost,
            plantingTime: eachSeed.plantingTime
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditSeed(prev => ({ ...prev, [name]: value }));
    };

    const handlePlantingTimeChange = (value) => {
        setEditSeed(prev => ({ ...prev, plantingTime: value }));
    };

    const handleSeedCostChange = (value) => {
        setEditSeed(prev => ({ ...prev, seedCost: value }));
    };

    const validateInput = () => {
        const newError = {};
        if (!editSeed.seedName) newError.seedName = 'กรุณาระบุชื่อเมล็ดพันธ์ุ';
        if (!editSeed.seedApprovedFName) newError.seedApprovedFName = 'กรุณาระบุชื่อผู้อนุมัติ';
        if (!editSeed.seedApprovedLName) newError.seedApprovedLName = 'กรุณาระบุนามสกุลผู้อนุมัติ';
        if (!editSeed.seedCost) newError.seedCost = 'กรุณาระบุราคาเมล็ดพันธุ์';
        if (!editSeed.plantingTime) newError.plantingTime = 'กรุณาระบุระยะเวลาการปลูก';
        setError(newError);
    };

    const handlerSubmit = async (e) => {
        try {
            e.preventDefault();
            validateInput();
            await axios.put(`/seeds/${eachSeed.id}`, {
                seedName: editSeed.seedName, seedApprovedFName: editSeed.seedApprovedFName,
                seedApprovedLName: editSeed.seedApprovedLName, seedRemark: editSeed.seedRemark, seedCost: editSeed.seedCost,
                plantingTime: editSeed.plantingTime
            });
            setOpenPopupEdit(false);
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
        };
    };

    const handleClose = (e) => {
        e.preventDefault();
        setOpenPopupEdit(false);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setEditSeed({
            seedName: '', seedApprovedFName: '', seedApprovedLName: '',
            seedRemark: '', seedCost: '', plantingTime: ''
        })
    };

    return (
        <div className="popup-seed-edit">
            <div className="popup-seed-edit-from">
                <div>
                    <a className="close-popup-seed-edit" onClick={handleClose}>&#10006;</a>
                </div>
                <div>
                    <h1><b>แก้ไขเมล็ดพันธุ์</b></h1>
                </div>
                <div><hr /></div>
                <div>
                    <form onSubmit={handlerSubmit}>
                        <FormControl isRequired>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">ชื่อเมล็ดพันธุ์:</FormLabel>
                                <Input name="seedName" value={editSeed.seedName} placeholder="ชื่อเมล็ดพันธุ์"
                                    onChange={handleInputChange} />
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">ระยะเวลาปลูก:</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="plantingTime" value={editSeed.plantingTime}
                                    onChange={handlePlantingTimeChange}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">ราคาเมล็ดพันธุ์:</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="seedCost" value={editSeed.seedCost}
                                    onChange={handleSeedCostChange}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">ชื่อ-นามสกุล ผู้อนุมัติ:</FormLabel>
                                <Flex justifyContent="space-between">
                                    <Box>
                                        <Input name="seedApprovedFName" value={editSeed.seedApprovedFName} placeholder="ชื่อ"
                                            onChange={handleInputChange} />
                                    </Box>
                                    <Box>
                                        <Input name="seedApprovedLName" value={editSeed.seedApprovedLName} placeholder="นามสกุล"
                                            onChange={handleInputChange} />
                                    </Box>
                                </Flex>
                            </Flex>
                        </FormControl>
                        <Box my="3">
                            <FormLabel >หมายเหตุ:</FormLabel>
                            <Textarea name="seedRemark" value={editSeed.seedRemark} placeholder="หมายเหตุ"
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
}

export default EditSeedComponent;