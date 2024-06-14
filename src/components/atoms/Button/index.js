import styled from "styled-components";
import { variant } from "styled-system";

const variants = {
  primary: {
    backgroundColor: "rgb(66, 195, 96)",
    borderBottom: "2px solid rgb(40, 167, 69)",
    "&:hover": {
      backgroundColor: "rgb(40, 167, 69)",
      borderBottom: "2px solid rgb(32, 132, 55)",
    },
  },
  secondary: {
    backgroundColor: "rgb(215, 58, 73)",
    borderBottom: "2px solid rgb(175, 28, 42)",
    "&:hover": {
      backgroundColor: "rgb(175, 28, 42)",
      borderBottom: "2px solid rgb(103, 16, 25)",
    },
  },
};

const ButtonLink = styled.div`
  ${variant({ variants })}
  cursor: pointer;
  display: block;
  text-align: center;
  padding: 4px 16px;
  margin: 4px;
  min-width: 100px;
  border-radius: 6px;
  color: white;
  text-decoration: none;
  font-size: 1rem;
`;

export default function Button({ children, variant, handleClick }) {
  return (
    <ButtonLink variant={variant} onClick={handleClick}>
      {children}
    </ButtonLink>
  );
}
