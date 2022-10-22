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

export const MilestoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
`;

export const MilestoneTitle = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

export const MainMilestoneContainer = styled.div`
  margin-top: 20px;
  background-color: #212929;
  padding: 20px;
  border-radius: 10px;
`;

export const MilestoneHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CancelButton = styled.button`
  background-color: red;
  border-style: none;
  border-radius: 5px;
  padding: 8px 10px;
`;
