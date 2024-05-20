import styled from "styled-components";

const ButtonLink = styled.div`
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
  background: ${(props) =>
    props.variant ? "rgb(66, 195, 96)" : "rgb(215, 58, 73)"};
  border-bottom: ${(props) =>
    props.variant
      ? "2px solid rgb(40, 167, 69)"
      : "2px solid rgb(175, 28, 42)"};
  &:hover {
    background: ${(props) =>
      props.variant ? "rgb(40, 167, 69)" : "rgb(175, 28, 42)"};
    border-bottom: ${(props) =>
      props.variant
        ? "2px solid rgb(32, 132, 55)"
        : "2px solid rgb(103, 16, 25)"};
  }
`;

export default function Button({ children, variant, handleClick }) {
  return (
    <ButtonLink variant={variant} onClick={handleClick}>
      {children}
    </ButtonLink>
  );
}
