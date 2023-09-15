import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/types';

import { styled, theme } from 'styles';
import { PageWrapper } from 'components';
import { CharacterFilters, ICharacterTextFieldsId, IObjectCharacterTextFieldsId } from 'types/character';
import {
	useGetAllCharactersQuery,
	useLazyGetAllCharactersQuery,
	useGetMultipleCharactersQuery,
} from 'redux/services/characters/charactersApi';
import { useLazyGetLocationsQuery } from 'redux/services/location/locationApi';
import { useLazyGetEpisodesQuery } from 'redux/services/episode/episodeApi';
import { ICharactersResponseNormalized } from 'redux/services/characters/types';
import { ILocationResponseNormalized } from 'redux/services/location/types';
import { IEpisodeResponseNormalized } from 'redux/services/episode/types';

import FiltersControl from './_components/FiltersControl';
import Characters from './_components/Characters';
import { getAllDublicates } from './_components/utils';
import { characterFilterTextFields } from './_components/FiltersControl/utils';

const HomeWrapper = styled.div`
	padding: 40px 0 10px;
	background-color: ${theme.colors.black_1};
`;

const HomePage = () => {
	const { filters, apply: isFilter, searchKey } = useSelector((state: RootState) => state.charactersFilterSlice);

	const [page, setPage] = useState(1);
	const [characterIds, setCharacterIds] = useState<number[]>([]);

	const [getAllCharactersHandler, { isLoading: isCharactersDataLoading }] = useLazyGetAllCharactersQuery();
	const [getLocationsDataHandler, { isLoading: isLocationsDataLoading }] = useLazyGetLocationsQuery();
	const [getEpisodesDataHandler, { isLoading: isEpisodesDataLoading }] = useLazyGetEpisodesQuery();

	const {
		data: charactersData,
		isError: isAllCharactersDataError,
		isFetching: isAllCharactersDataFetching,
	} = useGetAllCharactersQuery({ page, name: searchKey }, { skip: isFilter });
	const { data: multipleCharactersData, isLoading: isMultipleCharactersDataLoading } = useGetMultipleCharactersQuery(
		{ ids: characterIds },
		{ skip: !isFilter || !characterIds.length }
	);

	const getFilterTypes = (filters: IObjectCharacterTextFieldsId) => {
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

	const saveCharacterIdsReponse = (
		newCharacterIds: number[][],
		data?: ICharactersResponseNormalized | ILocationResponseNormalized | IEpisodeResponseNormalized
	) => {
		if (data && Array.isArray(data.results)) {
			return [...newCharacterIds, data?.charactersIds];
		} else {
			throw 'error';
		}
	};

	const getCharactersDataIds = async () => {
		if (isFilter) {
			let newCharacterIds: number[][] = [];
			const applyiedFilters = getFilterTypes(filters);

			try {
				if (applyiedFilters[CharacterFilters.Character]) {
					const res = await getAllCharactersHandler({
						name: filters[ICharacterTextFieldsId.CharacterName],
						status: filters[ICharacterTextFieldsId.CharacterStatus],
						species: filters[ICharacterTextFieldsId.CharacterSpecies],
						type: filters[ICharacterTextFieldsId.CharacterType],
						gender: filters[ICharacterTextFieldsId.CharacterGender],
					});
					newCharacterIds = saveCharacterIdsReponse(newCharacterIds, res.data);
				}
				if (applyiedFilters[CharacterFilters.Location]) {
					const res = await getLocationsDataHandler({
						name: filters[ICharacterTextFieldsId.LocationName],
						type: filters[ICharacterTextFieldsId.LocationType],
						dimension: filters[ICharacterTextFieldsId.LocatioDimension],
					});
					newCharacterIds = saveCharacterIdsReponse(newCharacterIds, res.data);
				}
				if (applyiedFilters[CharacterFilters.Episodes]) {
					const res = await getEpisodesDataHandler({
						name: filters[ICharacterTextFieldsId.EpisodeName],
						episodes: filters[ICharacterTextFieldsId.Episodes],
					});
					newCharacterIds = saveCharacterIdsReponse(newCharacterIds, res.data);
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
		isAllCharactersDataFetching;

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
						isError={isAllCharactersDataError}
						isLoading={isLoading}
					/>
				</>
			</PageWrapper>
		</HomeWrapper>
	);
};

export default HomePage;
