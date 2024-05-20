import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 896px;
  margin: 0px auto;
  padding: 32px 16px;
`;

const FlexBlock = styled.div`
  margin: 32px 0px;
  display: flex;
  border-radius: 6px;
  border: 1px solid rgb(225, 228, 232);
`;

const BlockInner = styled.div`
  padding: 16px;
  width: 50%;
`;

const ProfileImage = styled.img`
  max-width: 60px;
`;

export default function ProfileBlock() {
  const profile = useSelector((state) => state.profile);
  return (
    <Wrapper>
      <h1>Profile</h1>
      <FlexBlock>
        <BlockInner>
          <h4>プロフィール</h4>
          <div>
            <ProfileImage src={profile.imageUrl} alt="プロフィール" />
          </div>
        </BlockInner>
        <BlockInner>
          <div>
            <h4>ユーザ名</h4>
            <div>{profile.name}</div>
          </div>
          <div>
            <h4>メールアドレス</h4>
            <div>{profile.email}</div>
          </div>
        </BlockInner>
      </FlexBlock>
    </Wrapper>
  );
}
