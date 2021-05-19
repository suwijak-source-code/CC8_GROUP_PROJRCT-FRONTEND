import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Box } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setFarmManagement, setSeedManagement, setPlantingManagement } from "../../../features/ProcessManagement/ProcessManagementSlice";
import FarmManagementComponent from "../../../components/adminPageComponent/processManagement/farmManagement/FarmManagementComponent";
import SeedManagementComponent from "../../../components/adminPageComponent/processManagement/seedManagement/SeedManagementComponent";
import PlantingManagementComponent from "../../../components/adminPageComponent/processManagement/plantingManagement/PlantingManagementComponent";


const ProcessManagement = () => {

    const dispatch = useDispatch();
    const farmManagement = useSelector((state) => state.processManagement.farmManagement);
    const seedManagement = useSelector((state) => state.processManagement.seedManagement);
    const plantingManagement = useSelector((state) => state.processManagement.plantingManagement);

    const handleFarm = (e) => {
        e.preventDefault();
        dispatch(setFarmManagement(true));
        dispatch(setSeedManagement(false));
        dispatch(setPlantingManagement(false));
    };

    const handleSeed = (e) => {
        e.preventDefault();
        dispatch(setFarmManagement(false));
        dispatch(setSeedManagement(true));
        dispatch(setPlantingManagement(false));
    };

    const handlePlanting = (e) => {
        e.preventDefault();
        dispatch(setFarmManagement(false));
        dispatch(setSeedManagement(false));
        dispatch(setPlantingManagement(true));
    };

    return (
        <Box>
            <Flex justifyContent="center" p="8">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={handleFarm}>จัดการแปลงปลูก</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={handleSeed}>จัดการเมล็ดพันธ์ุ</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={handlePlanting}>จัดการการปลูก</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Flex>

            <Box>
                <hr />
            </Box>

            {farmManagement &&
                <Box my="5" px="40">
                    <FarmManagementComponent setFarmManagement={setFarmManagement} />
                </Box>
            }

            {seedManagement &&
                <Box my="5" px="40">
                    <SeedManagementComponent />
                </Box>
            }

            {plantingManagement &&
                <Box my="5" px="40">
                    <PlantingManagementComponent />
                </Box>
            }

            <Box my="5">
                <hr />
            </Box>
        </Box>
    )
}

export default ProcessManagement;