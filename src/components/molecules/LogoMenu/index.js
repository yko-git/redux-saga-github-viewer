import styled from "styled-components";
import Logo from "../../atoms/Logo";
import LogoLinks from "../../atoms/LogoLinks";

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: block;
  }
`;

export default function LogoMenu() {
  return (
    <LogoArea>
      <Logo />
      <LogoLinks />
    </LogoArea>
  );
}
