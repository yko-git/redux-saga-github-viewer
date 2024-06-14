import { useSelector } from "react-redux";
import styled from "styled-components";
import Issue from "../components/organisms/Issue";
import Header from "../components/organisms/Header";
import Modal from "../components/organisms/Modal";

const TabWrapper = styled.div`
  max-width: 896px;
  margin: 0 auto;
  padding: 32px 16px;
`;

function IssuePage() {
  const { isOpen } = useSelector((store) => store.modal);
  return (
    <>
      {isOpen && <Modal />}
      <Header />
      <TabWrapper>
        <Issue />
      </TabWrapper>
    </>
  );
}

export default IssuePage;
