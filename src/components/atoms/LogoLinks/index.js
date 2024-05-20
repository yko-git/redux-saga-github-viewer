import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoLinksList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;
const LogoLinksItem = styled.li`
  color: white;
  margin-right: 16px;
`;

const LogoLinksLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

export default function LogoLinks() {
  return (
    <LogoLinksList>
      <LogoLinksItem>
        <LogoLinksLink to="/issue/">Issue</LogoLinksLink>
      </LogoLinksItem>
      <LogoLinksItem>
        <LogoLinksLink to="/pullrequest/">Pull Request</LogoLinksLink>
      </LogoLinksItem>
    </LogoLinksList>
  );
}
