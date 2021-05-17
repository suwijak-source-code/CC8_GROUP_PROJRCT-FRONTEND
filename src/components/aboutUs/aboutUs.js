// import "./aboutUs.css";
import { Box, Flex } from "@chakra-ui/react";

function aboutUs() {
  return (
    <>
      <Box bgColor="tomato" w="100%" p="40px" mt="50px">
        <Box border="2px" p="30px" bgColor="white">
          <Box>
            <h2>ABOUT US</h2>
          </Box>
          <Box display="flex" justifyContent="center" mt="20px">
            <p>
              Plant Manager ได้ถูกสรรสร้างขึ้นเพื่อจัดการระบบต่างๆ
              ภายในสวนใต้กรอบแนวคิด "Record Everting on this to solution any
              PROBLEMS." จึงได้เกิดการรวมตัวขึ้น เพื่อจัดทำ Website นี้ขึ้นมา
              เพื่อตอบสนองความต้องการและเพื่อให้ทันต่อยุคสมัยดิจิทัล
            </p>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default aboutUs;
