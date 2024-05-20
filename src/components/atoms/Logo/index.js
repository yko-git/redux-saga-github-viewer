import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoLink = styled(Link)`
  color: white;
  display: inline-block;
  text-decoration: none;
`;
const LogoLinkItem = styled.h1`
  margin: 0;
  padding: 0;
`;

export default function Logo() {
  return (
    <LogoLink to="/">
      <LogoLinkItem>Github Viewer</LogoLinkItem>
    </LogoLink>
  );
}
