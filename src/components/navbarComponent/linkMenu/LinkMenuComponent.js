import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useSelector } from "react-redux";



const LinkMenuComponent = () => {
    const role = useSelector((state) => state.authenticated.role);
    return (
        <>
            {role === 'admin' && <Breadcrumb>
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
                    <BreadcrumbLink href="/inventory">คลังสินค้า</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href="/order">รายการขาย</BreadcrumbLink>
                </BreadcrumbItem>

            </Breadcrumb>
            }
            {role === 'sales' && <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/order">รายการขาย</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href="/inventory">คลังสินค้า</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href="#">ลูกค้า</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>}
            {!role && <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">หน้าหลัก</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href="/about-us">เกี่ยวกับ</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>}

        </>
    )
};

export default LinkMenuComponent;