import styled from 'styled-components';
import { AppBar } from '@material-ui/core';

export const StyledAppBar = styled(AppBar)`
  && {
    background-color: ${({ theme }) => theme.palette.primary.dark};
    & div {
      display: flex;
      flex-direction: row;
      color: ${({ theme }) => theme.palette.secondary.contrastText};
    }
  }
`;

export const StyledTitle = styled.h1`
  margin-left: 4rem;
`;