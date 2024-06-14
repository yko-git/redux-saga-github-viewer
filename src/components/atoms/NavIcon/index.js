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
      <FiMenu />
    </NavIconArea>
  );
}
