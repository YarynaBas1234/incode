import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { MoreIcon, CloseIcon, DownloadIcon, InfoIcon } from 'components/Icons';
import { styled, theme } from 'styles';

const IconButtonStyled = styled(IconButton)`
	&.MuiIconButton-root {
		background-color: ${theme.colors.white_1};
		width: 56px;
		height: 56px;
		margin-top: 16px;

		&:hover {
			background-color: ${theme.colors.gray_3};
			transition: all ease 0.3;
		}
	}
`;

const IconButtonWrapper = styled.div`
	margin-top: 8px;
`;

const FabMoreButtons = styled.div`
	display: flex;
	flex-direction: column;
`;

const FabButtonWrapper = styled.div`
	position: fixed;
	bottom: 100px;
	right: 200px;
`;

export const FabButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleFabClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<FabButtonWrapper>
			{isOpen && (
				<FabMoreButtons>
					<IconButtonStyled>
						<InfoIcon />
					</IconButtonStyled>
					<IconButtonStyled>
						<DownloadIcon />
					</IconButtonStyled>
				</FabMoreButtons>
			)}
			<IconButtonWrapper>
				<IconButtonStyled onClick={handleFabClick}>{isOpen ? <CloseIcon /> : <MoreIcon />}</IconButtonStyled>
			</IconButtonWrapper>
		</FabButtonWrapper>
	);
};

export default FabButton;
