import { styled } from 'styles';

interface BodyProps {
  color?: string,
  fontSize?: string, 
  fontWeight?: number,
}

export const H1 = styled.h1`
  font-weight: 900;
  font-size: 101.25px;
  line-height: 110px;
  color: ${({ theme }) => theme.colors.black};
`;

export const H2 = styled.h2`
  font-weight: 700;
  font-size: 27px;
  line-height: 30px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Body = styled.p<BodyProps>`
  font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : '400'};
  font-size: ${({ fontSize }) => fontSize ? fontSize : '16px'};
  line-height: 1.5;
  color: ${({ theme, color }) => color ? color : theme.colors.white};
`;