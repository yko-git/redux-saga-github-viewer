import { useDispatch, useSelector } from "react-redux";
import { getUserItems } from "../../../redux/userSlice";
import styled from "styled-components";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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
  @media (max-width: 768px) {
    display: block;
  }
`;

const BlockInner = styled.div`
  padding: 16px;
  width: 50%;
`;

const ProfileImage = styled.img`
  max-width: 120px;
`;

const ProfileTitle = styled.h4`
  font-size: 14px;
  line-height: 1.5;
  font-weight: normal;
  color: rgb(88, 96, 105);
`;

const ProfileText = styled.p`
  font-size: 1rem;
`;

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getUserItems());
  }, []);
  return (
    <Wrapper>
      <h1>Profile</h1>
      <FlexBlock>
        <BlockInner>
          <ProfileTitle>プロフィール</ProfileTitle>
          <div>
            <ProfileImage src={user.avatar_url} alt="プロフィール" />
          </div>
        </BlockInner>
        <BlockInner>
          <div>
            <ProfileTitle>ユーザ名</ProfileTitle>
            <ProfileText>{user.login}</ProfileText>
          </div>
          <div>
            <ProfileTitle>アカウントURL</ProfileTitle>
            <div>
              <Link to={user.html_url}>{user.html_url}</Link>
            </div>
          </div>
          <div>
            <ProfileTitle>フォロー数</ProfileTitle>
            <ProfileText>{user.following}</ProfileText>
          </div>
          <div>
            <ProfileTitle>フォロワー数</ProfileTitle>
            <ProfileText>{user.followers}</ProfileText>
          </div>
          <div>
            <ProfileTitle>パブリックレポジトリ数</ProfileTitle>
            <ProfileText>{user.public_repos}</ProfileText>
          </div>
          <div>
            <ProfileTitle>プライベートレポジトリ数</ProfileTitle>
            <ProfileText>{user.totalPrivateRepos}</ProfileText>
          </div>
        </BlockInner>
      </FlexBlock>
    </Wrapper>
  );
}
