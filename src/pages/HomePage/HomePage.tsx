import { useState } from 'react';
import PageWrapper from 'components/PageWrapper';
import { styled, theme } from 'styles';
import Characters from './_components/Characters/Characters';
import { useGetCharactersQuery } from 'redux/services/characters/charactersApi';
import FiltersControl from './_components/FiltersControl';

const HomeWrapper = styled.div`
	padding: 40px 0 10px;
	background-color: ${theme.colors.black_1};
`;

const HomePage = () => {
	const [page, setPage] = useState(1);
	const { data: charactersData, isLoading: isCharactersDataLoading } = useGetCharactersQuery({ page });


	if (isCharactersDataLoading) return <>Loading...</>;

	return (
		<HomeWrapper>
			<PageWrapper>
				<>
					<FiltersControl/>
					<Characters page={page} setPage={setPage} charactersData={charactersData}/>
				</>
			</PageWrapper>
		</HomeWrapper>
	);
};

export default HomePage;
