import styled from "styled-components";
import { useEffect, useState } from "react";
import FilterForm from "../FilterForm";
import ButtonLink from "../../atoms/Button";
import { useSelector, useDispatch } from "react-redux";
import { closeItems, getFetchItems } from "../../../redux/issueSlice";
import { openModal } from "../../../redux/modalSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FilterBlocks = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonLinks = styled.div`
  display: flex;
  align-items: center;
`;

const TableWrapper = styled.div`
  @media (max-width: 768px) {
    overflow: scroll;
  }
`;
const Table = styled.table`
  border: 1px solid rgb(225, 228, 232);
  border-radius: 6px;
`;

const TableTh = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid rgb(225, 228, 232);
  min-width: ${(props) => (props.$minwidth ? "auto" : "10rem")};
`;

const TableTd = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid rgb(225, 228, 232);
  min-width: ${(props) => (props.$minwidth ? "auto" : "10rem")};
  width: ${(props) => (props.$width ? "140rem" : "auto")};
  ${(props) => `width: ${props.width}`};
`;
const TableTr = styled.tr`
  cursor: pointer;
  &:hover {
    background: rgba(198, 218, 230, 0.25);
  }
`;

const StyledContainer = styled(ToastContainer)`
  .Toastify__toast {
    color: #ffffff;
    border-radius: 0;
  }
  .Toastify__toast--success {
    background-color: rgb(66, 195, 96);
  }
  .Toastify__toast--error {
    background-color: rgb(215, 58, 73);
  }
  .Toastify__close-button {
    color: #ffffff;
  }
`;

export default function TableList() {
  const [filterVal, setFilterVal] = useState("");
  const [allCheck, setAllCheck] = useState(false);
  const [checked, setChecked] = useState({});

  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.issues);

  const changeCheckbox = (id) => {
    // checkboxの解除の処理
    if (checked[id]) {
      const newChecked = JSON.parse(JSON.stringify(checked));
      delete newChecked[id];
      setChecked(newChecked);
      return;
    }
    setChecked({ ...checked, [id]: true });
  };
  const deleteChecked = () => {
    if (Object.keys(checked).length !== 0) {
      dispatch(closeItems(checked));
      setAllCheck(false);
      setChecked({});
      dispatch(getFetchItems());
    }
  };

  const allChecked = () => {
    if (allCheck) {
      setAllCheck(false);
      setChecked({});
      return;
    }
    const newTodosObj = items.reduce((acc, value) => {
      return { ...acc, [value.number]: true };
    }, {});
    setChecked(newTodosObj);
    setAllCheck(true);
  };

  useEffect(() => {
    dispatch(getFetchItems());
  }, []);

  return (
    <>
      <StyledContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        icon={false}
      />
      <FilterBlocks>
        <FilterForm filterVal={filterVal} setFilterVal={setFilterVal} />
        <ButtonLinks>
          <ButtonLink
            children="New"
            variant="true"
            handleClick={() => {
              dispatch(openModal({}));
            }}
          />
          <ButtonLink children="Delete" handleClick={deleteChecked} />
        </ButtonLinks>
      </FilterBlocks>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <TableTh $minwidth>
                <input
                  type="checkbox"
                  checked={allCheck}
                  onClick={allChecked}
                  readOnly
                ></input>
              </TableTh>
              <TableTh></TableTh>
              <TableTh>ステータス</TableTh>
              <TableTh>作成者</TableTh>
              <TableTh>作成日付</TableTh>
              <TableTh>更新日付</TableTh>
            </tr>
          </thead>
          <tbody>
            {items
              .filter(
                (value) =>
                  value.title.indexOf(filterVal) !== -1 &&
                  value.state !== "closed"
              )
              .map((value) => (
                <TableTr
                  key={value.number}
                  onClick={() => {
                    dispatch(
                      openModal({
                        id: value.number,
                        title: value.title,
                        body: value.body,
                        status: value.state,
                      })
                    );
                  }}
                >
                  <TableTd $minwidth>
                    <input
                      id={value.number}
                      value={value.title}
                      name={value.title}
                      type="checkbox"
                      checked={checked[value.number] || allCheck}
                      onClick={(e) => {
                        e.stopPropagation();
                        changeCheckbox(value.number);
                      }}
                      readOnly
                    />
                  </TableTd>
                  <TableTd $width>{value.title}</TableTd>
                  <TableTd>{value.state}</TableTd>
                  <TableTd>{value.user.login}</TableTd>
                  <TableTd>{value.created_at}</TableTd>
                  <TableTd>{value.updated_at}</TableTd>
                </TableTr>
              ))}
          </tbody>
        </Table>
      </TableWrapper>
    </>
  );
}
