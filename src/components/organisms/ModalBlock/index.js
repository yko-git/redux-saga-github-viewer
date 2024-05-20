import styled from "styled-components";
import React, { useState } from "react";
import Modal from "react-modal";
import ButtonLink from "../../atoms/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../../../redux/todoSlice";
import { closeModal } from "../../../redux/modalSlice";

Modal.setAppElement("#root");

const ModalWrapper = styled.div`
  width: 60%;
  margin: auto;
  background: rgb(255, 255, 255);
  position: absolute;
  inset: 40px;
  overflow: auto;
  border-radius: 4px;
  outline: none;
  padding: 20px;
  border: 1px solid rgb(204, 204, 204);
  @media screen and (max-width: 767px) {
    width: 80%;
  }
`;

const ModalInner = styled.div`
  max-width: 598px;
  margin: auto;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  padding: 0 8px;
`;

const InputArea = styled.div`
  padding: 32px 0px 16px;
`;

const InputBlock = styled.div`
  padding: 16px 0;
`;

const InputLavel = styled.label`
  display: block;
  padding: 8px 0;
`;

const TextField = styled.div`
  border-radius: 6px;
  border: 1px solid rgb(225, 228, 232);
`;
const TextAreaField = styled.div`
  border-radius: 6px;
  border: 1px solid rgb(225, 228, 232);
  min-height: 150px;
`;

const Input = styled.input`
  padding: 8px;
  border: none;
  outline: none;
  background: none;
  font-size: 1rem;
  width: 100%;
`;

const Textarea = styled(Input)``;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px;
`;

const CloseLink = styled(Link)`
  cursor: pointer;
  display: block;
  text-align: center;
  padding: 4px 6px;
  margin: 4px;
  min-width: 100px;
  border-radius: 6px;
  font-size: 1rem;
  text-decoration: none;
`;

const ModalBlock = () => {
  const { form } = useSelector((store) => store.modal);

  const [id, setId] = useState(form.id);
  const [title, setTitle] = useState(form.title);
  const [text, setText] = useState(form.text);
  const [status, setIssueStatus] = useState(form.status);

  const dispatch = useDispatch();

  const handleAddTodo = () => {
    const newTodo = { id, title, text, status };
    dispatch(addTodo(newTodo));
    setId("");
    setTitle("");
    setText("");
    dispatch(closeModal());
  };

  const handleUpdateTodo = () => {
    const newTodo = { id, title, text, status };
    dispatch(updateTodo(newTodo));
    dispatch(closeModal());
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };
  const handleInputTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSelectForm = (e) => {
    setIssueStatus(e.target.value);
  };

  return (
    <>
      <ModalWrapper>
        <ModalInner>
          <ModalTitle>Issueを追加</ModalTitle>
          <InputArea>
            <InputBlock>
              <InputLavel>タイトル</InputLavel>
              <TextField>
                <Input
                  placeholder="タイトルを入力してください"
                  defaultValue={form.title}
                  onChange={handleInputChange}
                ></Input>
              </TextField>
            </InputBlock>
            <InputBlock>
              <InputLavel>説明</InputLavel>
              <TextAreaField>
                <Textarea
                  placeholder="説明を入力してください"
                  defaultValue={form.text}
                  onChange={handleInputTextChange}
                ></Textarea>
              </TextAreaField>
            </InputBlock>
          </InputArea>
          {id && (
            <>
              <InputLavel>
                <div>
                  <InputLavel htmlFor="status">ステータス</InputLavel>
                </div>
                <select
                  id="status"
                  name="status"
                  defaultValue={form.status}
                  onChange={handleSelectForm}
                >
                  <option value="Open">Open</option>
                  <option value="Close">Close</option>
                </select>
              </InputLavel>
            </>
          )}
          <Buttons>
            {id ? (
              <ButtonLink
                variant="true"
                children="更新"
                handleClick={handleUpdateTodo}
              />
            ) : (
              <ButtonLink
                variant="true"
                children="作成"
                handleClick={handleAddTodo}
              />
            )}
            <CloseLink onClick={() => dispatch(closeModal())}>閉じる</CloseLink>
          </Buttons>
        </ModalInner>
      </ModalWrapper>
    </>
  );
};
export default ModalBlock;
