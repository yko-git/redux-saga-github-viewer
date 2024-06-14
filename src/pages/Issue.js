import { useSelector } from "react-redux";
import styled from "styled-components";
import Issue from "../components/organisms/Issue";
import Modal from "../components/organisms/Modal";
import Layout from "../Layout";

const TabWrapper = styled.div`
  max-width: 896px;
  margin: 0 auto;
  padding: 32px 16px;
`;

function IssuePage() {
  const { isOpen } = useSelector((store) => store.modal);
  return (
    <Layout>
      {isOpen && <Modal />}
      <TabWrapper>
        <Issue />
      </TabWrapper>
    </Layout>
  );
}

export default IssuePage;
