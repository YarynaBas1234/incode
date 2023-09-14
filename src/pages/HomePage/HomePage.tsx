import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/types';
import { styled, theme } from 'styles';

import FiltersControl from './_components/FiltersControl';
import { Loader } from 'components';
import Characters from './_components/Characters/Characters';
import { getAllDublicates } from './_components/utils';
import PageWrapper from 'components/PageWrapper';

import {
	useGetAllCharactersQuery,
	useLazyGetAllCharactersQuery,
	useGetMultipleCharactersQuery,
} from 'redux/services/characters/charactersApi';
import { useLazyGetLocationsQuery } from 'redux/services/location/locationApi';
import { useLazyGetEpisodesQuery } from 'redux/services/episode/episodeApi';
import { CharacterFilters, CharacterTextFieldsId } from 'types/character';
import { characterFilterTextFields } from './_components/FiltersControl/utils';
import { ICharactersResponseNormalized } from 'redux/services/characters/types';
import { ILocationResponseNormalized } from 'redux/services/location/types';
import { IEpisodeResponseNormalized } from 'redux/services/episode/types';

const HomeWrapper = styled.div`
	padding: 40px 0 10px;
	background-color: ${theme.colors.black_1};
`;

const HomePage = () => {
	const { filters, apply: isFilter } = useSelector((state: RootState) => state.charactersFilterSlice);
	const [page, setPage] = useState(1);
	const [characterIds, setCharacterIds] = useState<number[]>([]);

	const [getAllCharactersHandler, { isLoading: isCharactersDataLoading }] = useLazyGetAllCharactersQuery();
	const [getLocationsDataHandler, { isLoading: isLocationsDataLoading }] = useLazyGetLocationsQuery();
	const [getEpisodesDataHandler, { isLoading: isEpisodesDataLoading }] = useLazyGetEpisodesQuery();

	const { data: charactersData, isLoading: isAllCharactersDataLoading } = useGetAllCharactersQuery(
		{ page },
		{ skip: isFilter }
	);
	const { data: multipleCharactersData, isLoading: isMultipleCharactersDataLoading } = useGetMultipleCharactersQuery(
		{ ids: characterIds },
		{ skip: !isFilter || !characterIds.length }
	);

	const getFilterTypes = (filters: Record<CharacterTextFieldsId, string>) => {
		const applyiedFilters = {
			[CharacterFilters.Character]: false,
			[CharacterFilters.Location]: false,
			[CharacterFilters.Episodes]: false,
		};

		Object.entries(characterFilterTextFields).forEach(([key, filterFields]) => {
			filterFields.forEach((item) => {
				if (filters[item.id]) {
					applyiedFilters[key as CharacterFilters] = true;
				}
			});
		});

		return applyiedFilters;
	};

	const saveCharactersIdsReponse = (newCharacterIds: number[][], data?: ICharactersResponseNormalized | ILocationResponseNormalized | IEpisodeResponseNormalized  ) => {
		if (data && Array.isArray(data.results)) {
			return [...newCharacterIds, data?.charactersIds];
		} else {
			throw 'error';
		}
	}

	const getCharactersDataIds = async () => {
		if (isFilter) {
			let newCharacterIds: number[][] = [];
			const applyiedFilters = getFilterTypes(filters);
			
			try {
				if (applyiedFilters[CharacterFilters.Character]) {
					const res = await getAllCharactersHandler({ name: filters[CharacterTextFieldsId.CharacterName], status: filters[CharacterTextFieldsId.CharacterStatus], species: filters[CharacterTextFieldsId.CharacterSpecies], type: filters[CharacterTextFieldsId.CharacterType], gender: filters[CharacterTextFieldsId.CharacterGender] });
					newCharacterIds = saveCharactersIdsReponse(newCharacterIds, res.data)
				}
				if (applyiedFilters[CharacterFilters.Location]) {
					const res = await getLocationsDataHandler({ name: filters[CharacterTextFieldsId.LocationName], type: filters[CharacterTextFieldsId.LocationType], dimension: filters[CharacterTextFieldsId.LocatioDimension] });
					newCharacterIds = saveCharactersIdsReponse(newCharacterIds, res.data)
				}
				if (applyiedFilters[CharacterFilters.Episodes]) {
					const res = await getEpisodesDataHandler({ name: filters[CharacterTextFieldsId.EpisodeName], episodes: filters[CharacterTextFieldsId.Episodes] });
					newCharacterIds = saveCharactersIdsReponse(newCharacterIds, res.data)
				}
			} catch (error) {
				setCharacterIds([]);
				return;
			}
			setCharacterIds(getAllDublicates(newCharacterIds));
		}
	};

	useEffect(() => {
		getCharactersDataIds();
	}, [isFilter, filters]);

	const isLoading =
		isCharactersDataLoading ||
		isLocationsDataLoading ||
		isEpisodesDataLoading ||
		isMultipleCharactersDataLoading ||
		isAllCharactersDataLoading;

	if (isLoading) return <Loader />;

	return (
		<HomeWrapper>
			<PageWrapper>
				<>
					<FiltersControl />
					<Characters
						pages={!isFilter ? charactersData?.info.pages : null}
						page={page}
						setPage={setPage}
						data={isFilter ? multipleCharactersData : charactersData?.results}
					/>
				</>
			</PageWrapper>
		</HomeWrapper>
	);
};

export default HomePage;
