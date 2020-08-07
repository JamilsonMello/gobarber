import styled, { css } from 'styled-components/native';
import FeatherIcons from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

interface TextInputProps {
  isFilled: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 0 10px;
  border-width: 2px;
  border-color: #232129;

  ${({ isErrored }) =>
    isErrored &&
    css`
      border-color: #c53030;
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: #ff9000;
    `}

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextInput = styled.TextInput<TextInputProps>`
  flex: 1;
  font-family: 'Roboto-Regular';
  font-size: 16px;
  color: #eee;
`;

export const Icon = styled(FeatherIcons)`
  margin-right: 6px;
`;
