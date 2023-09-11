import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from 'styles';

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Loader = () => {
	return (
		<LoaderWrapper>
			<CircularProgress />
		</LoaderWrapper>
	);
};
