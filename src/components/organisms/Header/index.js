import styled from "styled-components";
import LogoMenu from "../../molecules/LogoMenu";
import HeaderNav from "../../molecules/HeaderNav";

const HeaderArea = styled.div`
  background-color: #333333;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Header() {
  return (
    <HeaderArea>
      <LogoMenu />
      <HeaderNav />
    </HeaderArea>
  );
}
