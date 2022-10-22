import styled from "styled-components";

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  input[type="file"] {
    display: none;
  }

  .custom-file-upload {
    border: 1px dashed #ccc;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 5px;
    padding: 100px;
    display: flex;
    text-align: center;
    margin-bottom: 10px;
  }

  .input-span {
    width: 100%;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 80px;

  .input_label {
    min-width: 100px;
  }

  .input_style {
    text-decoration: none;
    padding: 12px 10px;
    border-radius: 5px;
    border-style: none;
    width: 100%;
  }

  .input_description {
    font-size: 15px;
  }

  .input_container {
    width: 100%;
  }
`;

export const TellContainer = styled.div`
  width: 50vw;
  display: flex;
  padding: 0 20px;
  margin-bottom: 50px;
  flex-direction: column;
  gap: 10px;
`;
