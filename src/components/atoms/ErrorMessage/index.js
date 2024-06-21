import styled from "styled-components";

const ErrorMessageBlock = styled.div`
  padding: 16px 0;
  color: rgb(215, 58, 73);
  background-color: rgba(215, 58, 73, 0.35);
  padding: 8px;
  border-radius: 6px;
`;

export default function ErrorMessage({ children }) {
  return <ErrorMessageBlock>{children}</ErrorMessageBlock>;
}
