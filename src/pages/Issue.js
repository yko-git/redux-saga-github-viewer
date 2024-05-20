import { useSelector } from "react-redux";
import styled from "styled-components";
import IssueBlock from "../components/organisms/IssueBlock";
import Header from "../components/organisms/Header";
import ModalBlock from "../components/organisms/ModalBlock";

const TabWrapper = styled.div`
  max-width: 896px;
  margin: 0 auto;
  padding: 32px 16px;
`;

function Issue() {
  const { isOpen } = useSelector((store) => store.modal);
  return (
    <>
      {isOpen && <ModalBlock />}
      <Header />
      <TabWrapper>
        <IssueBlock />
      </TabWrapper>
    </>
  );
}

export default Issue;
