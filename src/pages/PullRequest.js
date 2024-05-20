import styled from "styled-components";
import PullRequestBlock from "../components/organisms/PullRequestBlock";
import Header from "../components/organisms/Header";
const TabWrapper = styled.div`
  max-width: 896px;
  margin: 0 auto;
  padding: 32px 16px;
`;

function PullRequest() {
  return (
    <>
      <Header />
      <TabWrapper>
        <PullRequestBlock />
      </TabWrapper>
    </>
  );
}

export default PullRequest;
