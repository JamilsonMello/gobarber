import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    background: #c53030;
    width: 160px;
    height: 35px;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;

    position: absolute;
    top: -45px;
    left: -70px;

    &:before {
      content: '';
      position: absolute;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid #c53030;
      top: 100%;
      left: calc(50% - 6px);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
