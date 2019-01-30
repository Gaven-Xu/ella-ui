import styled from 'styled-components';
import style from '../styles/theme';


const Button = styled.button`
  border: none;
  border-radius: 2px;
  color: #FFFFFF; 
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  line-height: 40px;
  font-weight: 200;
  margin: 8px 0;
  outline: none;
  padding: 0 12px;
  text-transform: uppercase;
  transition: all 300ms ease;
  background: ${style.mainColor};
  &:hover {
    background: ${style.mainColorLight};
  }
  &:active {
    background: ${style.mainColorDark};
  }
`;

export default Button;