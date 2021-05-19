import "./EditAssignComponent.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    Flex, FormControl, FormLabel, Input, Box, Button, Select
} from "@chakra-ui/react";
import axios from "../../../../config/axios";
import { useHistory } from 'react-router-dom';


const EditAssignComponent = ({ setOpenEdit }) => {
    const [assign, setAssign] = useState({
        farmName: '', staffId: '', mission: ''
    });
    const [error, setError] = useState({});

    const history = useHistory();
    const eachJob = useSelector((state) => state.workPlanManagement.eachJob);
    const gardener = useSelector((state) => state.workPlanManagement.gardener);
    const eachAssign = useSelector((state) => state.workPlanManagement.eachAssign);


    useEffect(() => {
        let status;
        if (eachJob.status === 'started' || eachJob.status === 'harvested') {
            if (eachJob.status === 'started') {
                status = 'gardening';
            } else if (eachJob.status === 'harvested') {
                status = 'harvest';
            }
        } else {
            status = eachJob.mission
        }
        let farm;
        if (!(eachJob.Farm)) {
            farm = eachJob.Planting.Farm.name
        } else {
            farm = eachJob.Farm.name;
        }
        setAssign({
            farmName: farm, mission: status, staffId: eachAssign.staffId
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAssign(prev => ({ ...prev, [name]: value }));
    };

    const validateInput = () => {
        const newError = {};
        if (!assign.farmName) newError.farmName = 'กรุณาระบุชื่อสวน';
        if (!assign.staffId) newError.farmApprovedLName = 'กรุณาระบุชื่อพนักงานที่รับผิดชอบ';
        if (!assign.mission) newError.farmApprovedLName = 'กรุณาระบุงาน';
        setError(newError);
    };

    const handlerSubmit = async () => {
        try {
            validateInput();
            await axios.patch(`/jobs/edit-assign/${eachAssign.id}`, {
                staffId: assign.staffId
            });
            history.push('/work-plan-management');
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    }

    const handleClose = (e) => {
        e.preventDefault();
        setOpenEdit(false);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setAssign({
            staffId: ''
        })
    };

    return (
        <div className="popup-edit-assign">
            <div className="popup-edit-assign-from">
                <div>
                    <a className="close-popup-edit-assign" onClick={handleClose}>&#10006;</a>
                </div>
                <div>
                    <h1><b>แก้ไขการมอบหมาย</b></h1>
                </div>
                <div><hr /></div>
                <div>
                    <form onSubmit={handlerSubmit}>
                        <FormControl isRequired>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">งาน:</FormLabel>
                                {assign.mission === 'gardening' && <Input name="mission" value="หว่านเมล็ดและดูแล" placeholder="งาน" />}
                                {assign.mission === 'harvest' && <Input name="mission" value="เก็บเกี่ยวผลผลิต" placeholder="งาน" />}
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">ชื่อแปลงปลูก:</FormLabel>
                                <Input name="farmName" value={assign.farmName} placeholder="ชื่อแปลงปลูก" />
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">พนักงานที่รับผิดชอบ:</FormLabel>
                                <Select name="staffId" value={assign.staffId} onChange={handleInputChange} placeholder="กรุณาเลือกพนักงาน">
                                    {gardener.map((item, index) => <option key={index} value={item.id} >{item.firstName} {item.lastName}</option>)}
                                </Select>
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

export default EditAssignComponent;