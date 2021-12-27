import styled from "styled-components";

export const HomeTitle = styled.h2`
  text-align: center;
  font-size: 10vh;
  background: -webkit-linear-gradient(#7bd3bccd, #f49b64cc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 5vh;
  }
`;

export const PageTitle = styled.h2`
  color: #7bd3bccd;
  font-size: xxx-large;
  font-family: "Arial", cursive;
  text-shadow: 1px 1px 2px #1565c0;
  font-weight: normal;
`;
