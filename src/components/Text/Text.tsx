import { styled } from 'styles';

interface BodyProps {
  color?: string,
  fontSize?: string, 
  fontWeight?: number,
  lineHeight?: string,
}

export const H1 = styled.h1<BodyProps>`
  font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : '900'};
  font-size: ${({ fontSize }) => fontSize ? fontSize : '101.25px'};
  line-height: ${({lineHeight})=> lineHeight ? lineHeight : '110px'};
  color: ${({ theme, color }) => color ? color : theme.colors.black};
`;

export const H2 = styled.h2<BodyProps>`
  font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : '700'};
  font-size: ${({ fontSize }) => fontSize ? fontSize : '27px'};
  line-height: ${({lineHeight})=> lineHeight ? lineHeight : '30px'};
  color: ${({ theme, color }) => color ? color : theme.colors.white};
`;

export const Body = styled.p<BodyProps>`
  font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : '400'};
  font-size: ${({ fontSize }) => fontSize ? fontSize : '16px'};
  line-height: ${({lineHeight})=> lineHeight ? lineHeight : '1.5'};
  color: ${({ theme, color }) => color ? color : theme.colors.white};
`;