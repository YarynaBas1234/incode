import React from 'react';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

import { styled, theme } from 'styles';

interface PaginationComponentProps {
	pages?: number;
	page: number;
	onChange: (page: number) => void;
}

const PaginationComponentStyled = styled(Pagination)`
	padding: 5px;

	.MuiButtonBase-root {
		box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

		&.MuiPaginationItem-root {
			min-height: 34px;
			min-width: 34px;
			padding: 5px 12px;
			font-size: 16px;
			background-color: ${theme.colors.gray};
			color: ${theme.colors.white};
			transition: all ease 0.3s;
			margin: 0 5px;

			&.MuiPaginationItem-previousNext {
				margin: 0 10px;
			}

			&:hover {
				background-color: ${theme.colors.white};
				color: ${theme.colors.black};
			}

			&.Mui-selected {
				pointer-events: none;
				background-color: ${theme.colors.white};
				color: ${theme.colors.black};
			}
		}
	}
	.MuiPaginationItem-ellipsis {
		color: ${theme.colors.white};
	}
	.MuiPaginationItem-previousNext {
		background-color: ${theme.colors.white};
		color: ${theme.colors.black_1};

		&.Mui-disabled {
			background-color: ${theme.colors.gray_1};
			color: ${theme.colors.gray_2};
		}
	}
`;

export const PaginationComponent: React.FC<PaginationComponentProps> = (props) => {
	const { pages, page, onChange } = props;

	return (
		<Stack spacing={2}>
			<PaginationComponentStyled count={pages} shape='rounded' page={page} onChange={(e, page) => onChange(page)} />
		</Stack>
	);
};
