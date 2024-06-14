import styled from "styled-components";
import PullRequest from "../components/organisms/PullRequest";
import Layout from "../Layout";
const TabWrapper = styled.div`
  max-width: 896px;
  margin: 0 auto;
  padding: 32px 16px;
`;

function PullRequestPage() {
  return (
    <Layout>
      <TabWrapper>
        <PullRequest />
      </TabWrapper>
    </Layout>
  );
}

export default PullRequestPage;
