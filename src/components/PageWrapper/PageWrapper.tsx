import React from 'react';
import { styled } from 'styles';

interface PageWrapperProps {
    children: JSX.Element
}

const PageWrapperStyled = styled.div`
    max-width: 1440px;
    width: 100%;
    padding: 0 110px;
    margin: 0 auto;
`;

const PageWrapper: React.FC<PageWrapperProps> = (props) => {
    const {children} = props
	return <PageWrapperStyled>{children}</PageWrapperStyled>;
};

export default PageWrapper;
