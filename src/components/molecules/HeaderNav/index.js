import styled from "styled-components";
import NavIcon from "../../atoms/NavIcon";
import NavList from "../../atoms/NavList";
import { useState } from "react";

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  zindex: 1;
  width: 100%;
  height: 100%;
`;

export default function HeaderNav() {
  const [navClick, setNavClick] = useState(false);

  function handleClick() {
    setNavClick(!navClick);
  }
  return (
    <div onClick={handleClick}>
      <NavIcon />
      {navClick && (
        <NavWrapper
          onClick={(e) => e.target === e.currentTarget && setNavClick(false)}
        >
          <NavList />
        </NavWrapper>
      )}
    </div>
  );
}
