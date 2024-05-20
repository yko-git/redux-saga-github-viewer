import { IconContext } from "react-icons";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";

const NavIconArea = styled.div`
  color: white;
  display: inline-block;
  cursor: pointer;
`;

export default function NavIcon() {
  return (
    <NavIconArea>
      <IconContext.Provider value={{ size: "20px" }}>
        <FiMenu />
      </IconContext.Provider>
    </NavIconArea>
  );
}
