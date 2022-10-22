import styled from "styled-components";

export const Image = styled.img`
  width: 40px;
  cursor: pointer;
`;

export const InactiveImage = styled.img`
  width: 40px;
  opacity: 30%;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;
