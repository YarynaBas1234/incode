import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { styled, theme } from 'styles';
import { Body, Button } from 'components';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/types';
import { buttonVariants } from 'styles/variants';

interface SimpleDialogProps {
	open: boolean;
	onClose: () => void;
}

const DialogStyled = styled(Dialog)`
	.MuiPaper-root {
		padding: 16px;
		height: 570px;
		width: 420px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
        border-radius: 9px, 0px, 0px, 9px;
        position: absolute;
        right: -32px;
	}
`;

const HistoryRow = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 16px;
`;

const DialogActionsStyled = styled(DialogActions)`
	&.MuiDialogActions-root {
		margin-right: auto;
	}
`;

export const HistoryDialog = (props: SimpleDialogProps) => {
	const { onClose, open } = props;

	const isViewProfilePage = useSelector((state: RootState) => state.historySlice);

	const handleClose = () => {
		onClose();
	};

	return (
		<DialogStyled onClose={handleClose} open={open} scroll='paper'>
			<div>
				<Body fontWeight={500} fontSize='20px' leading='32px' color={theme.colors.black_2}>
					History
				</Body>
				{isViewProfilePage.profileViews.length !== 0 ? (
					isViewProfilePage.profileViews.map((item, key) => {
						return (
							<HistoryRow key={key}>
								<Body fontWeight={400} fontSize='14px' leading='22px' color={theme.colors.black_2}>
									{item}
								</Body>
							</HistoryRow>
						);
					})
				) : (
					<HistoryRow>
						<Body fontWeight={500} fontSize='18px' leading='22px' color={theme.colors.red}>
							Oops! There is nothing here yet...
						</Body>
					</HistoryRow>
				)}
			</div>
			<DialogActionsStyled>
				<Button onClick={handleClose} text='Cancel' variant={buttonVariants.text}>
					Cancel
				</Button>
			</DialogActionsStyled>
		</DialogStyled>
	);
};
