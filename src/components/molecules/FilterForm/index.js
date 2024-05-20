import styled from "styled-components";

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.h3`
  margin-right: 16px;
`;

const FilterInputWrapper = styled.form`
  width: 100%;
  min-width: 567px;
  @media (max-width: 768px) {
    min-width: auto;
  }
`;
const FilterInput = styled.input`
  outline: none;
  border: 1px solid rgb(225, 228, 232);
  padding: 8px 16px;
  border-radius: 6px;
  width: 100%;
`;

export default function FilterForm({ filterVal, setFilterVal }) {
  return (
    <>
      <FilterWrapper>
        <FilterTitle>Issue</FilterTitle>
        <FilterInputWrapper>
          <FilterInput
            type="text"
            placeholder="issue名で検索"
            value={filterVal}
            onChange={(e) => setFilterVal(e.target.value)}
          />
        </FilterInputWrapper>
      </FilterWrapper>
    </>
  );
}
