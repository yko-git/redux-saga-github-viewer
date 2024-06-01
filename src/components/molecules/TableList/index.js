import styled from "styled-components";
import { useEffect, useState } from "react";
import FilterForm from "../FilterForm";
import ButtonLink from "../../atoms/Button";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, getFetchItems } from "../../../redux/issueSlice";
import { openModal } from "../../../redux/modalSlice";

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

export default function TableList() {
  const [filterVal, setFilterVal] = useState("");
  const [allCheck, setAllCheck] = useState(false);
  const [checked, setChecked] = useState({});

  const issues = useSelector((state) => state.issues);
  const dispatch = useDispatch();

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
    dispatch(deleteTodo(checked));
    setAllCheck(false);
  };

  const allChecked = () => {
    if (allCheck) {
      setAllCheck(false);
      setChecked({});
      return;
    }
    const newTodosObj = issues.reduce((acc, value) => {
      return { ...acc, [value.id]: true };
    }, {});
    setChecked(newTodosObj);
    setAllCheck(true);
  };

  const { items } = useSelector((state) => state.issues);
  useEffect(() => {
    dispatch(getFetchItems());
  }, []);

  return (
    <>
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
              .filter((value) => value.title.indexOf(filterVal) !== -1)
              .map((value) => (
                <TableTr
                  key={value.id}
                  onClick={() => {
                    dispatch(
                      openModal({
                        id: value.id,
                        title: value.title,
                        body: value.body,
                        status: value.state,
                      })
                    );
                  }}
                >
                  <TableTd $minwidth>
                    <input
                      id={value.id}
                      value={value.title}
                      name={value.title}
                      type="checkbox"
                      checked={checked[value.id] || allCheck}
                      onClick={(e) => {
                        e.stopPropagation();
                        changeCheckbox(value.id);
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
