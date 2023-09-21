import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { CharacterFilters, ICharacterTextFieldsId, IObjectCharacterTextFieldsId } from 'types/character';

import { ICharactersResponseNormalized } from 'redux/services/characters/types';
import { IEpisodeResponseNormalized } from 'redux/services/episode/types';
import { ILocationResponseNormalized } from 'redux/services/location/types';
import { useLazyGetAllCharactersQuery } from 'redux/services/characters/charactersApi';
import { useLazyGetLocationsQuery } from 'redux/services/location/locationApi';
import { useLazyGetEpisodesQuery } from 'redux/services/episode/episodeApi';
import { RootState } from 'redux/types';

import { getAllDublicates } from './_components/utils';
import { characterFilterTextFields } from './_components/FiltersControl';

type RequestTypes = Promise<ICharactersResponseNormalized | ILocationResponseNormalized | IEpisodeResponseNormalized>;

const INITIAL_PAGE = 1;

export const useGetAllPagesData = () => {
	const [characterIds, setCharacterIds] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { filters, apply: isFilter } = useSelector((state: RootState) => state.charactersFilterSlice);

	const [getAllCharactersHandler] = useLazyGetAllCharactersQuery();
	const [getLocationsDataHandler] = useLazyGetLocationsQuery();
	const [getEpisodesDataHandler] = useLazyGetEpisodesQuery();

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

	const saveAllPagesData = async (page: number | null, newIds: number[], request: (page: number) => RequestTypes) => {
		if (page) {
			const res = await request(page);
			newIds.push(...res.charactersIds);

			if (res.info.next) {
				const searchParams = new URLSearchParams(new URL(res.info.next).search);
				const pageValue = searchParams.get('page');
				await saveAllPagesData(Number(pageValue), newIds, request);
			}
		}
		return newIds;
	};

	const getAllPagesData = (page: number | null, request: (page: number) => RequestTypes) => {
		const newIds: number[] = [];
		return () => saveAllPagesData(page, newIds, request);
	};

	const getCharactersDataIds = async () => {
		if (isFilter) {
			const newCharacterIds: number[][] = [];
			const applyiedFilters = getFilterTypes(filters);

			try {
				setIsLoading(true);

				if (applyiedFilters[CharacterFilters.Character]) {
					const request = async (page: number) =>
						await getAllCharactersHandler({
							name: filters[ICharacterTextFieldsId.CharacterName],
							status: filters[ICharacterTextFieldsId.CharacterStatus],
							species: filters[ICharacterTextFieldsId.CharacterSpecies],
							type: filters[ICharacterTextFieldsId.CharacterType],
							gender: filters[ICharacterTextFieldsId.CharacterGender],
							page,
						}).unwrap();

					const charactersIds = await getAllPagesData(INITIAL_PAGE, request)();
					newCharacterIds.push(charactersIds);
				}
				if (applyiedFilters[CharacterFilters.Location]) {
					const request = async (page: number) =>
						await getLocationsDataHandler({
							name: filters[ICharacterTextFieldsId.LocationName],
							type: filters[ICharacterTextFieldsId.LocationType],
							dimension: filters[ICharacterTextFieldsId.LocatioDimension],
							page,
						}).unwrap();

					const charactersIds = await getAllPagesData(INITIAL_PAGE, request)();
					newCharacterIds.push(charactersIds);
				}
				if (applyiedFilters[CharacterFilters.Episodes]) {
					const request = async (page: number) =>
						await getEpisodesDataHandler({
							name: filters[ICharacterTextFieldsId.EpisodeName],
							episodes: filters[ICharacterTextFieldsId.Episodes],
							page,
						}).unwrap();

					const charactersIds = await getAllPagesData(INITIAL_PAGE, request)();
					newCharacterIds.push(charactersIds);
				}
			} catch (error) {
				setCharacterIds([]);
				return;
			} finally {
				setIsLoading(false);
			}
			setCharacterIds(getAllDublicates(newCharacterIds));
		}
	};

	useEffect(() => {
		getCharactersDataIds();
	}, [isFilter, filters]);

	return { characterIds, isLoading };
};
