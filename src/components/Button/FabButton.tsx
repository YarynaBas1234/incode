import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { styled, theme } from 'styles';
import { CloseIcon, DownloadIcon, HistoryDialog, InfoIcon, MoreIcon } from 'components';

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
		&.Mui-disabled {
			background-color: ${theme.colors.white_1};
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
	right: 85px;
`;

export const FabButton = () => {

	const [isOpen, setIsOpen] = useState(false);
	const [open, setOpen] = useState(false);

	const handleFabClick = () => {
		setIsOpen(!isOpen);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleInfoContainer = () => {
		setOpen(true);
	};

	return (
		<FabButtonWrapper>
			{isOpen && (
				<>
					<FabMoreButtons>
						<IconButtonStyled onClick={handleInfoContainer}>
							<InfoIcon />
						</IconButtonStyled>
						<IconButtonStyled disabled>
							<DownloadIcon />
						</IconButtonStyled>
					</FabMoreButtons>
					<HistoryDialog open={open} onClose={handleClose} />
				</>
			)}
			<IconButtonWrapper>
				<IconButtonStyled onClick={handleFabClick}>{isOpen ? <CloseIcon /> : <MoreIcon />}</IconButtonStyled>
			</IconButtonWrapper>
		</FabButtonWrapper>
	);
};

export default FabButton;
