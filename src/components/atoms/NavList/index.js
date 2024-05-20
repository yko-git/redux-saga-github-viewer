import styled from "styled-components";
import { Link } from "react-router-dom";

const NavListArea = styled.ul`
  position: absolute;
  top: 50px;
  right: 16px;
  width: 200px;
  padding: 8px 0;
  text-align: left;
  background: white;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: rgba(51, 51, 51, 0.15) 1px 1px 4px 1px;
`;

const NavListItem = styled.li`
  list-style: none;
`;
const NavListLink = styled(Link)`
  display: block;
  color: #333;
  list-style: none;
  text-decoration: none;
  padding: 8px 15px;
  font-size: 1rem;
  &:hover {
    background: rgb(3, 102, 214);
    color: white;
  }
`;

const links = [
  {
    id: 0,
    name: "Top",
    link: "/",
  },
  {
    id: 1,
    name: "Your Profile",
    link: "/profile",
  },
  {
    id: 3,
    name: "Issue",
    link: "/issue",
  },
  {
    id: 4,
    name: "Pull Request",
    link: "/pullrequest",
  },
];

export default function NavList() {
  const linksList = links.map((value) => (
    <NavListItem key={value.id}>
      <NavListLink to={value.link}>{value.name}</NavListLink>
    </NavListItem>
  ));
  return <NavListArea>{linksList}</NavListArea>;
}
