import styled from "styled-components";
import { useState } from "react";
import IssueBlock from "../IssueBlock";
import PullRequestBlock from "../PullRequestBlock";

const TabWrapper = styled.div`
  max-width: 896px;
  margin: 0 auto;
  padding: 32px 16px;
`;

const TabLinks = styled.ul`
  display: flex;
  padding: 0;
`;

const TabLinkItem = styled.li`
  display: inline-block;
  text-align: center;
  text-decoration: none;
  padding: 16px;
  cursor: pointer;
  width: 100%;
  border-bottom: ${(props) =>
    props.activetab ? "none" : "1px solid rgb(225, 228, 232)"};
  border-top: ${(props) =>
    props.activetab ? "1px solid rgb(225, 228, 232)" : "none"};
  border-right: ${(props) =>
    props.activetab ? "1px solid rgb(225, 228, 232)" : "none"};
  border-left: ${(props) =>
    props.activetab ? "1px solid rgb(225, 228, 232)" : "none"};
  border-radius: ${(props) => (props.activetab ? "6px 6px 0px 0px" : "none")};
`;

const tabs = ["Issue", "Pull Request"];

export default function TabBlock() {
  const [activetab, setActivetab] = useState(tabs[0]);

  return (
    <TabWrapper>
      <TabLinks>
        {tabs.map((tab) => (
          <TabLinkItem
            key={tab}
            onClick={() => setActivetab(tab)}
            activetab={activetab === tab}
          >
            {tab}
          </TabLinkItem>
        ))}
      </TabLinks>
      <div>{activetab === tabs[0] ? <IssueBlock /> : <PullRequestBlock />}</div>
    </TabWrapper>
  );
}
