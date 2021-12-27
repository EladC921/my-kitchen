import styled from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;

  & > div {
    padding: 15px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: center;
  overflow-x: hidden;
`;
