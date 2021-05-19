import "./navbar.css";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";

const NavbarComponents = () => {
  return (
    <>
      <div className="navbar-main">
        <h1>PLANT MANAGER</h1>
      </div>

      <Menu>
        <MenuButton as={IconButton} aria-label="Options" variant="outline" />
        <MenuList>
          <MenuItem>New Tab</MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem>Open Closed Tab</MenuItem>
          <MenuItem>Open File...</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default NavbarComponents;
