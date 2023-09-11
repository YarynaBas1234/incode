import { styled } from 'styles';

interface BodyProps {
  color?: string,
  fontSize?: string, 
  fontWeight?: number,
  leading?: string,
}

export const H1 = styled.h1<BodyProps>`
  font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : '900'};
  font-size: ${({ fontSize }) => fontSize ? fontSize : '101.25px'};
  line-height: ${({leading})=> leading ? leading : '110px'};
  color: ${({ theme, color }) => color ? color : theme.colors.black};
`;

export const H2 = styled.h2<BodyProps>`
  font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : '700'};
  font-size: ${({ fontSize }) => fontSize ? fontSize : '27px'};
  line-height: ${({leading})=> leading ? leading : '30px'};
  color: ${({ theme, color }) => color ? color : theme.colors.white};
`;

export const Body = styled.p<BodyProps>`
  font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : '400'};
  font-size: ${({ fontSize }) => fontSize ? fontSize : '16px'};
  line-height: ${({leading})=> leading ? leading : '1.5'};
  color: ${({ theme, color }) => color ? color : theme.colors.white};
`;