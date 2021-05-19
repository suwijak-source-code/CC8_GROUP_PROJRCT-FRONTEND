import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";



const LinkMenuComponent = () => {


    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink href="/work-plan-management">งาน</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink href="/employees-management">พนักงาน</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink href="/process-management">การผลิต</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink href="#">คลังสินค้า</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink href="#">คำสั่งซื้อ</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink href="#">บัญชีต้นทุน</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink href="#">บัญชีรายรับ</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink href="#">สรุปยอด</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
};

export default LinkMenuComponent;