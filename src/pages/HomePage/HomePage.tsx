import { useState } from 'react';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import PageWrapper from 'components/PageWrapper';
import { styled, theme } from 'styles';
import { buttonVariants, inputVariants } from 'styles/variants';
import Characters from './_components/Characters/Characters';

const HomeWrapper = styled.div`
	padding: 24px 0;
	background-color: ${theme.colors.black_1};
`;

const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const FilterConfiguration = styled.div`
	width: 70%;
	display: flex;
	justify-content: space-between;
`;

const StyledButton = styled(Button)``;

const HomePage = () => {
	const [isShowSearchField, setisShowSearchField] = useState(false);

	return (
		<HomeWrapper>
			<PageWrapper>
				<>
					<FilterContainer>
						<StyledButton
							text={isShowSearchField ? 'remove filter' : 'Filter'}
							variant={buttonVariants.primary}
							onClick={() => setisShowSearchField(!isShowSearchField)}
						/>
						{isShowSearchField && (
							<FilterConfiguration>
								<Input label='Add key words to find' variant={inputVariants.filled} />
								<StyledButton
									text='Find'
									variant={buttonVariants.primary}
									onClick={() => setisShowSearchField(false)}
								/>
							</FilterConfiguration>
						)}
					</FilterContainer>
					<Characters />
				</>
			</PageWrapper>
		</HomeWrapper>
	);
};

export default HomePage;
