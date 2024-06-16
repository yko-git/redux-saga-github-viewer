import styled from "styled-components";
import { useEffect, useState } from "react";
import FilterForm from "../../molecules/FilterForm";
import ButtonLink from "../../atoms/Button";
import { useSelector, useDispatch } from "react-redux";
import { closeItems, getFetchItems } from "../../../redux/issueSlice";
import { openModal } from "../../../redux/modalSlice";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

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
  const [val, onChange] = useState("");
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
  const deleteChecked = async () => {
    if (Object.keys(checked).length !== 0) {
      try {
        await dispatch(closeItems(checked)).unwrap();
        setAllCheck(false);
        setChecked({});
        toast.success("issueを削除しました");
      } catch (error) {
        toast.error("削除に失敗しました");
      }
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
      <ToastContainer
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
        <FilterForm val={val} onChange={onChange} />
        <ButtonLinks>
          <ButtonLink
            variant="primary"
            handleClick={() => {
              dispatch(openModal({}));
            }}
          >
            New
          </ButtonLink>
          <ButtonLink variant="secondary" handleClick={deleteChecked}>
            Delete
          </ButtonLink>
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
                  value.title.indexOf(val) !== -1 && value.state !== "closed"
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
                  <TableTd $width>
                    <Link
                      onClick={(e) => {
                        window.open(value.html_url, "_blank");
                        e.stopPropagation();
                      }}
                    >
                      {value.title}
                    </Link>
                  </TableTd>
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
