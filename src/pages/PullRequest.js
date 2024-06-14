import styled from "styled-components";
import PullRequest from "../components/organisms/PullRequest";
import Header from "../components/organisms/Header";
const TabWrapper = styled.div`
  max-width: 896px;
  margin: 0 auto;
  padding: 32px 16px;
`;

function PullRequestPage() {
  return (
    <>
      <Header />
      <TabWrapper>
        <PullRequest />
      </TabWrapper>
    </>
  );
}

export default PullRequestPage;
