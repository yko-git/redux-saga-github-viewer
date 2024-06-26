import styled from "styled-components";
import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../../atoms/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateItems, addItems } from "../../../redux/issueSlice";
import { closeModal } from "../../../redux/modalSlice";
import { toast } from "react-toastify";
import ErrorMessage from "../../atoms/ErrorMessage";
import { getFetchItems } from "../../../redux/issueSlice";

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
  const [body, setBody] = useState(form.body);
  const [status, setIssueStatus] = useState(form.state);
  const [erros, setErros] = useState("");

  const dispatch = useDispatch();

  const validate = () => {
    const errorTitle = "タイトルを入力してください";
    const errorBody = "説明を入力してください";
    if (!title) {
      return errorTitle;
    } else if (!body) {
      return errorBody;
    }
  };

  const handleAddTodo = async () => {
    const newTodo = { id, title, body, status };
    const error = validate();
    if (error) {
      return setErros(error);
    }

    try {
      await dispatch(addItems(newTodo)).unwrap();
      setId("");
      setTitle("");
      setBody("");
      dispatch(closeModal());
      toast.success("issueを作成しました");
    } catch (error) {
      toast.error("作成に失敗しました");
    }
    dispatch(getFetchItems());
  };

  const handleUpdateTodo = async () => {
    const newTodo = { id, title, body, status };
    const error = validate();
    if (error) {
      return setErros(error);
    }
    try {
      await dispatch(updateItems(newTodo)).unwrap();
      dispatch(closeModal());
      toast.success("issueを更新しました");
    } catch (error) {
      toast.error("更新に失敗しました");
    }
    dispatch(getFetchItems());
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };
  const handleInputTextChange = (e) => {
    setBody(e.target.value);
  };

  const handleSelectForm = (e) => {
    setIssueStatus(e.target.value);
  };

  const isEdit = !!id;

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
                  defaultValue={form.body}
                  onChange={handleInputTextChange}
                ></Textarea>
              </TextAreaField>
            </InputBlock>
          </InputArea>

          {erros && <ErrorMessage>{erros}</ErrorMessage>}
          {isEdit && (
            <>
              <InputLavel>
                <div>
                  <InputLavel htmlFor="status">ステータス</InputLavel>
                </div>
                <select
                  id="status"
                  name="status"
                  defaultValue={form.state}
                  onChange={handleSelectForm}
                >
                  <option value="Open">Open</option>
                  <option value="Close">Close</option>
                </select>
              </InputLavel>
            </>
          )}
          <Buttons>
            {isEdit ? (
              <Button variant="primary" handleClick={handleUpdateTodo}>
                更新
              </Button>
            ) : (
              <Button variant="primary" handleClick={handleAddTodo}>
                作成
              </Button>
            )}
            <CloseLink onClick={() => dispatch(closeModal())}>閉じる</CloseLink>
          </Buttons>
        </ModalInner>
      </ModalWrapper>
    </>
  );
};
export default ModalBlock;
