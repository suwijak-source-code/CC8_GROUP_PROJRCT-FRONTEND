import "./FinishWorkComponent.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    Flex, FormControl, FormLabel, Input, Box, Button, NumberInput, NumberInputField,
    NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper
} from "@chakra-ui/react";
import axios from "../../../../config/axios";
import { useHistory } from 'react-router-dom';


const FinishWorkComponent = ({ setOpenFinish }) => {
    const [finish, setFinish] = useState({
        mission: '', farmName: '', harvestedAmount: ''
    });
    const [error, setError] = useState({});

    const history = useHistory();
    const eachAssign = useSelector((state) => state.workPlanManagement.eachAssign);
    const eachJob = useSelector((state) => state.workPlanManagement.eachJob);

    useEffect(() => {
        let farm;
        if (!(eachJob.Farm)) {
            farm = eachJob.Planting.Farm.name
        } else {
            farm = eachJob.Farm.name;
        }
        setFinish({
            mission: eachAssign.mission, farmName: farm
        })
    }, [])

    const handleHarvestedAmountChange = (value) => {
        setFinish(prev => ({ ...prev, harvestedAmount: value }));
    };

    const validateInput = () => {
        const newError = {};
        if (!finish.harvestedAmount) newError.harvestedAmount = 'กรุณาระบุจำนวนผลผลิต';
        setError(newError);
    };

    const handlerSubmit = async () => {
        try {
            validateInput();
            await axios.patch(`/jobs/${eachAssign.id}`, {
                status: 'finish', harvestedAmount: finish.harvestedAmount
            });
            history.push('/work-plan-management');
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            };
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        setOpenFinish(false);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setFinish({
            harvestedAmount: ''
        })
    };
    return (
        <div className="popup-finish">
            <div className="popup-finish-from">
                <div>
                    <a className="close-popup-finish" onClick={handleClose}>&#10006;</a>
                </div>
                <div>
                    <h1><b>เก็บเกี่ยวผลผลิตเสร็จสิ้น</b></h1>
                </div>
                <div><hr /></div>
                <div>
                    <form onSubmit={handlerSubmit}>
                        <FormControl isRequired>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">งาน:</FormLabel>
                                {finish.mission === 'gardening' && <Input name="mission" value="หว่านเมล็ดและดูแล" placeholder="งาน" />}
                                {finish.mission === 'harvest' && <Input name="mission" value="เก็บเกี่ยวผลผลิต" placeholder="งาน" />}
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">ชื่อแปลงปลูก:</FormLabel>
                                <Input name="farmName" value={finish.farmName} placeholder="ชื่อแปลงปลูก" />
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">จำนวนผลผลิต:</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="harvestedAmount" value={finish.harvestedAmount}
                                    onChange={handleHarvestedAmountChange}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                {error.harvestedAmount && <Box as="span" textAlign="center" color="#E53E3E">{error.harvestedAmount}</Box>}
                            </Flex>
                        </FormControl>
                        <Box my="5">
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

export default FinishWorkComponent;