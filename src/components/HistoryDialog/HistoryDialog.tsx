import Drawer from '@mui/material/Drawer';
import DialogActions from '@mui/material/DialogActions';

import { buttonVariants, styled, theme } from 'styles';
import { Body, ButtonBase } from 'components';
import { localStorageService } from 'storage';

import { HistoryType, IHistory } from 'redux/slices/historySlice/types';

interface SimpleDialogProps {
	open: boolean;
	onClose: () => void;
}

const DialogStyled = styled(Drawer)`
.MuiPaper-root {
	padding: 16px;
	height: 570px;
	max-width: 420px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 9px 0px 0px 9px;
	position: static;
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
const CloseButton = styled(ButtonBase)`
	font-weight: 500;
`;

const getHistoryLabel = (type: HistoryType) => {
	switch (type) {
		case HistoryType.View:
			return 'Page View:';
		case HistoryType.Search:
			return 'Search:';
		case HistoryType.Filter:
			return 'Filters:';
		default:
			return 'Page View:';
	}
};

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
};

export const HistoryDialog = (props: SimpleDialogProps) => {
	const { onClose, open } = props;

	const history = JSON.parse(localStorageService.getFromLocalStorage('history')) as IHistory[];

	return (
		<DialogStyled
			anchor='right'
			open={open}
			onClose={onClose}
			sx={{
				'&.MuiDrawer-root': { display: 'flex', alignItems: 'center', justifyContent: 'end' },
			}}
		>
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
				<CloseButton onClick={onClose} text='Close' variant={buttonVariants.text} />
			</DialogActionsStyled>
		</DialogStyled>
	);
};
