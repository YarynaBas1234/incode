import { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, MultiSelect } from 'components';
import Modal from '@mui/material/Modal';
import { styled } from 'styles';
import { buttonVariants, inputVariants } from 'styles/variants';
import { characterFilterOptions, characterFilterTextFields, getFilterTextFields } from './utils';
import { CharacterFilters, CharacterTextFieldsId } from 'types/character';
import { RootState } from 'redux/types';
import { removeFilters, applyFilters, applySearch } from 'redux/slices/charactersFilterSlice';
import { useAppDispatch } from 'redux/hooks';
import { filtersHistory, searchHistory } from 'redux/slices/historySlice';
import { ICharacterFilterTextFieldItem } from './types';

const FilterContainer = styled.div`
	display: flex;
	align-items: flex-start;
	width: 100%;
	min-height: 56px;
`;

const FilterConfiguration = styled.div`
	margin-left: 160px;
	display: flex;
	align-items: flex-start;
	gap: 28px;
`;

const FilterModal = styled(Modal)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const FilterModalContainer = styled.div`
	display: flex;
	align-items: flex-start;
	column-gap: 28px;
`;

const FilterModalTextFields = styled.div`
	display: flex;
	flex-direction: column;
`;

const FiltersControl = () => {
	const dispatch = useAppDispatch();

	const inititalFilters = useSelector((state: RootState) => state.charactersFilterSlice);

	const [filters, setFilters] = useState<Record<CharacterTextFieldsId, string>>(inititalFilters.filters);
	const [searchValue, setSearchValue] = useState(inititalFilters.searchKey);
	const [filterOpen, setFilterOpen] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [options] = useState(characterFilterOptions);
	const [selectedOptions, setSelectedOptions] = useState<string[]>(inititalFilters.selectedOptions);
	const [isShowSearchField, setisShowSearchField] = useState<boolean>(inititalFilters.apply);

	useEffect(() => {
		setFilters(inititalFilters.filters);
		setSearchValue(inititalFilters.searchKey);
		setSelectedOptions(inititalFilters.selectedOptions);
	}, [inititalFilters]);

	const handleFilterOpen = () => {
		setFilterOpen(true);
	};

	const handleFilterClose = () => {
		setFilterOpen(false);
	};

	const handleModalOpen = () => {
		setModalOpen(true);
		handleFilterOpen();
	};

	const handleModalClose = () => {
		handleFilterClose();
		setModalOpen(false);
	};

	const handleFind = () => {
		if(selectedOptions.length) {
			dispatch(applyFilters({ filters, selectedOptions }));
			dispatch(filtersHistory(filters));
		} else {
			dispatch(applySearch(searchValue));
			dispatch(searchHistory(searchValue));
			setSelectedOptions([]);
		}
		handleModalClose();
	};

	const clearSelectedOptions = () => {
		setSelectedOptions([]);
	};

	const toggleSearchFields = () => {
		if (isShowSearchField) {
			clearSelectedOptions();
			dispatch(removeFilters());
		}
		dispatch(removeFilters());
		setisShowSearchField(!isShowSearchField);
	};

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>, id: CharacterTextFieldsId) => {
		setFilters((prev) => {
			return { ...prev, [id]: event.target.value };
		});
	};

	const handleSearchChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const handleUpdateFilterOptions = (value: string[]) => {
		setSelectedOptions(value);
	};

	const clearUnselectedFilters = () => {
		const selectedFilters = selectedOptions.reduce<ICharacterFilterTextFieldItem[]>((acc, filterId) => {
			acc.push(...characterFilterTextFields[filterId as CharacterFilters]);
			return acc;
		}, []);
		const newFilters = Object.entries(filters).reduce<Record<CharacterTextFieldsId, string>>((acc, [key, value]) => {
			const isFilter = selectedFilters.find((selectedFilter) => selectedFilter.id === key);
			if (isFilter) {
				return { ...acc, [key as CharacterTextFieldsId]: value };
			}
			return { ...acc, [key as CharacterTextFieldsId]: '' };
		}, filters);
		setFilters(newFilters);
	};

	useEffect(() => {
		clearUnselectedFilters();
	}, [selectedOptions]);

	const textFieldsConfig = useMemo(
		() => getFilterTextFields(selectedOptions as CharacterFilters[]),
		[selectedOptions, filters]
	);

	if (modalOpen) {
		return (
			<FilterModal open={modalOpen} onClose={handleModalClose}>
				<FilterModalContainer>
					<MultiSelect
						label='Select Item'
						id='character-filter'
						open={filterOpen}
						onOpen={handleFilterOpen}
						onClose={handleFilterClose}
						options={options}
						selectedOptions={selectedOptions}
						setSelectedOptions={handleUpdateFilterOptions}
					/>
					<FilterModalTextFields>
						{textFieldsConfig.length ? (
							textFieldsConfig.map((item) => (
								<Input
									variant='filled'
									key={item.id}
									label={item.label}
									id={item.id}
									value={filters[item.id] || ''}
									onChange={(event) => handleFilterChange(event, item.id)}
								/>
							))
						) : (
							<Input
								label='Add key words to find'
								variant={inputVariants.filled}
								value={searchValue}
								onChange={handleSearchChange}
							/>
						)}
					</FilterModalTextFields>
					<Button text='Find' type='submit' variant={buttonVariants.primary} onClick={handleFind} />
				</FilterModalContainer>
			</FilterModal>
		);
	}

	return (
		<FilterContainer>
			<Button
				text={isShowSearchField ? 'remove filter' : 'Filter'}
				variant={buttonVariants.primary}
				onClick={toggleSearchFields}
			/>
			{isShowSearchField && (
				<FilterConfiguration>
					<div onClick={handleModalOpen}>
						<MultiSelect
							id='character-filter-readonly'
							readOnly
							open={false}
							options={options}
							selectedOptions={selectedOptions}
							setSelectedOptions={setSelectedOptions}
						/>
					</div>
					<FilterModalTextFields>
						{textFieldsConfig.length ? (
							textFieldsConfig.map((item) => (
								<Input
									variant='filled'
									key={item.id}
									label={item.label}
									id={item.id}
									value={filters[item.id] || ''}
									onChange={(event) => handleFilterChange(event, item.id)}
								/>
							))
						) : (
							<Input
								label='Add key words to find'
								variant={inputVariants.filled}
								value={searchValue}
								onChange={handleSearchChange}
							/>
						)}
					</FilterModalTextFields>
					<Button text='Find' type='submit' variant={buttonVariants.primary} onClick={handleFind} />
				</FilterConfiguration>
			)}
		</FilterContainer>
	);
};

export default FiltersControl;
