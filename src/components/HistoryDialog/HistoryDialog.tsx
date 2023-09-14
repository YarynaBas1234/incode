import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { styled, theme } from 'styles';
import { Body, Button } from 'components';
import { buttonVariants } from 'styles/variants';
import { HistoryType, IHistory } from 'redux/slices/historySlice/types';
import { localStorageService } from 'storage';

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

const HistoryContainer = styled.div`
	margin-top: 24px;
`;

const HistoryItem = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 16px;
`;

const DialogActionsStyled = styled(DialogActions)`
	&.MuiDialogActions-root {
		margin-right: auto;
		padding: 0;
		margin-top: 20px;
	}
`;

const CloseButton = styled(Button)`
	font-weight: 500;
`

const getHistoryLabel = (type:HistoryType) => {
	switch(type) {
		case HistoryType.View:
			return 'Page View:'
		case HistoryType.Search:
			return 'Search:'
		case HistoryType.Filter:
			return 'Filters:'
		default:
			return 'Page View:'
	}
}

export const HistoryRow = ({ historyItem }: { historyItem: IHistory }) => {
	const historyLabel = getHistoryLabel(historyItem.type);

	if (historyItem?.filters && historyItem.type === HistoryType.Filter) {
		return (
			<HistoryContainer>
				<HistoryItem>
					<Body fontWeight={400} fontSize='18px' leading='28px' color={theme.colors.gray_4}>
						{historyLabel}
					</Body>
					{historyItem.type === HistoryType.Filter &&
						historyItem?.filters.map((item, i) => (
							<Body key={`history-${i}`} fontWeight={400} fontSize='14px' leading='22px' color={theme.colors.black_2}>
								{`${item.label}: ${item.value}`}
							</Body>
						))}
				</HistoryItem>
			</HistoryContainer>
		);
	}


	return (
		<HistoryContainer>
			<HistoryItem>
				<Body fontWeight={400} fontSize='18px' leading='28px' color={theme.colors.gray_4}>
					{historyLabel}
				</Body>
				<Body fontWeight={400} fontSize='14px' leading='22px' color={theme.colors.black_2}>
					{historyItem.value}
				</Body>
			</HistoryItem>
		</HistoryContainer>
	);

	return null;
};

export const HistoryDialog = (props: SimpleDialogProps) => {
	const { onClose, open } = props;

	const history = JSON.parse(localStorageService.getFromLocalStorage('history')) as IHistory[];

	const handleClose = () => {
		onClose();
	};

	return (
		<DialogStyled onClose={handleClose} open={open} scroll='paper'>
			<div>
				<Body fontWeight={500} fontSize='20px' leading='32px' color={theme.colors.black_2}>
					History
				</Body>
				{history ? (
					history.map((historyItem, key) => <HistoryRow key={key} historyItem={historyItem} />)
				) : (
					<HistoryItem>
						<Body fontWeight={500} fontSize='18px' leading='22px' color={theme.colors.red}>
							Oops! There is nothing here yet...
						</Body>
					</HistoryItem>
				)}
			</div>
			<DialogActionsStyled>
				<CloseButton onClick={handleClose} text='Close' variant={buttonVariants.text} />
			</DialogActionsStyled>
		</DialogStyled>
	);
};
