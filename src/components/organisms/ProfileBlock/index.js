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
`;

const BlockInner = styled.div`
  padding: 16px;
  width: 50%;
`;

const ProfileImage = styled.img`
  max-width: 60px;
`;

export default function ProfileBlock() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getUserItems());
  }, []);
  console.log(user);
  return (
    <Wrapper>
      <h1>Profile</h1>
      <FlexBlock>
        <BlockInner>
          <h4>プロフィール</h4>
          <div>
            <ProfileImage src={user.avatar_url} alt="プロフィール" />
          </div>
        </BlockInner>
        <BlockInner>
          <div>
            <h4>ユーザ名</h4>
            <div>{user.login}</div>
          </div>
          <div>
            <h4>アカウントURL</h4>
            <div>
              <Link to={user.html_url}>{user.html_url}</Link>
            </div>
          </div>
          <div>
            <h4>フォロー数</h4>
            <div>{user.following}</div>
          </div>
          <div>
            <h4>フォロワー数</h4>
            <div>{user.followers}</div>
          </div>
          <div>
            <h4>パブリックレポジトリ数</h4>
            <div>{user.public_repos}</div>
          </div>
          <div>
            <h4>プライベートレポジトリ数</h4>
            <div>{user.totalPrivateRepos}</div>
          </div>
        </BlockInner>
      </FlexBlock>
    </Wrapper>
  );
}
