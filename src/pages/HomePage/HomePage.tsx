import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/types';

import { styled, theme } from 'styles';
import { PageWrapper } from 'components';
import { useGetAllCharactersQuery, useGetMultipleCharactersQuery } from 'redux/services/characters/charactersApi';

import FiltersControl from './_components/FiltersControl';
import Characters from './_components/Characters';

import { useGetAllPagesData } from './hooks';

const HomeWrapper = styled.div`
	padding: 40px 0 10px;
	background-color: ${theme.colors.black_1};
`;

const HomePage = () => {
	const { apply: isFilter, searchKey } = useSelector((state: RootState) => state.charactersFilterSlice);

	const [page, setPage] = useState(1);

	const { characterIds, isLoading: isCharacterIdsLoading } = useGetAllPagesData();

	const { data: charactersData, isFetching: isAllCharactersDataFetching } = useGetAllCharactersQuery(
		{ page, name: searchKey },
		{ skip: isFilter }
	);
	const { data: multipleCharactersData, isLoading: isMultipleCharactersDataLoading } = useGetMultipleCharactersQuery(
		{ ids: characterIds },
		{ skip: !isFilter || !characterIds.length }
	);

	const data = useMemo(() => {
		if (!isFilter && charactersData) {
			return charactersData.results;
		}
		if (isFilter && characterIds.length && multipleCharactersData) {
			return multipleCharactersData;
		}
		return [];
	}, [isFilter, characterIds, charactersData, multipleCharactersData]);

	const isLoading = isMultipleCharactersDataLoading || isAllCharactersDataFetching || isCharacterIdsLoading;

	return (
		<HomeWrapper>
			<PageWrapper>
				<>
					<FiltersControl />
					<Characters
						pages={!isFilter ? charactersData?.info.pages : null}
						page={page}
						setPage={setPage}
						data={data}
						isLoading={isLoading}
					/>
				</>
			</PageWrapper>
		</HomeWrapper>
	);
};

export default HomePage;
