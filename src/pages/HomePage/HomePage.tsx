import { useState, useEffect } from 'react';
import { styled, theme } from 'styles';
import FiltersControl from './_components/FiltersControl';
import { Loader } from 'components';
import Characters from './_components/Characters/Characters';
import PageWrapper from 'components/PageWrapper';
import { useGetAllCharactersQuery, useGetMultipleCharactersQuery } from 'redux/services/characters/charactersApi';
import { useGetLocationsQuery } from 'redux/services/location/locationApi';
import { useGetEpisodesQuery } from 'redux/services/episode/episodeApi';

const HomeWrapper = styled.div`
	padding: 40px 0 10px;
	background-color: ${theme.colors.black_1};
`;

const HomePage = () => {
	const [page, setPage] = useState(1);
	const [characterIds, setCharacterIds] = useState<number[]>([]);
	const [isFilter] = useState(false);

	const { data: charactersData, isLoading: isCharactersDataLoading } = useGetAllCharactersQuery({ page } );
	const { data: locationsData, isLoading: isLocationsDataLoading } = useGetLocationsQuery({ page }, {skip: !isFilter});
	const { data: episodesData, isLoading: isEpisodesDataLoading } = useGetEpisodesQuery({ page }, {skip: !isFilter});
	const { data: multipleCharactersData, isLoading: isMultipleCharactersDataLoading } = useGetMultipleCharactersQuery({ ids: characterIds }, {skip: !isFilter});

	useEffect(() => {
		let newCharacterIds: number[] = [];
		if (charactersData) {
			newCharacterIds = [...newCharacterIds, ...charactersData.charactersIds];
		}
		if (locationsData) {
			newCharacterIds = [...newCharacterIds, ...locationsData.charactersIds];
		}
		if (episodesData) {
			newCharacterIds = [...newCharacterIds, ...episodesData.charactersIds];
		}
		setCharacterIds([... new Set(newCharacterIds)]);
	}, [charactersData, locationsData, episodesData]);

	const isLoading = isCharactersDataLoading || isLocationsDataLoading || isEpisodesDataLoading || isMultipleCharactersDataLoading;

	if (isLoading) return <Loader />;

	return (
		<HomeWrapper>
			<PageWrapper>
				<>
					<FiltersControl />
					<Characters pages={!isFilter ? charactersData?.info.pages : null} page={page} setPage={setPage} data={isFilter ? multipleCharactersData : charactersData?.results} />
				</>
			</PageWrapper>
		</HomeWrapper>
	);
};

export default HomePage;
