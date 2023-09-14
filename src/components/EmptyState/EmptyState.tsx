import { Body } from 'components';
import { styled, theme } from 'styles';

const EmptyStateContainer = styled.div`
	width: 100%;
	min-height: 400px;
	padding: 50px 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const EmptyState = () => {
	return (
		<EmptyStateContainer>
			<Body fontSize='40px' leading='60px' color={theme.colors.white}>
				No matches with your criteria.
			</Body>
		</EmptyStateContainer>
	);
};
