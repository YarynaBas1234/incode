import { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, MultiSelect } from 'components';
import Modal from '@mui/material/Modal';
import { styled } from 'styles';
import { buttonVariants, inputVariants } from 'styles/variants';
import { characterFilterOptions, getFilterTextFields } from './utils';
import { CharacterFilters, CharacterTextFieldsId } from 'types/character';
import { RootState } from 'redux/types';
import { removeFilters, applyFilters } from 'redux/slices/charactersFilterSlice';
import { useAppDispatch } from 'redux/hooks';
import { filtersHistory } from 'redux/slices/historySlice';

const FilterContainer = styled.div`
	display: flex;
	width: 100%;
	min-height: 56px;
`;

const FilterConfiguration = styled.div`
	margin-left: 160px;
	display: flex;
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

	const [filters, setFilters] = useState(inititalFilters.filters);
	const [filterOpen, setFilterOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [options] = useState(characterFilterOptions);
	const [selectedOptions, setSelectedOptions] = useState<string[]>(inititalFilters.selectedOptions);
	const [isShowSearchField, setisShowSearchField] = useState(inititalFilters.apply);

	useEffect(() => {
		setFilters(inititalFilters.filters);
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
		dispatch(applyFilters({ filters, selectedOptions }));
		dispatch(filtersHistory(filters));
		handleModalClose();
		setisShowSearchField(true);
	};

	const clearSelectedOptions = () => {
		setSelectedOptions([]);
	};

	const toggleSearchFields = () => {
		if (isShowSearchField) {
			clearSelectedOptions();
			dispatch(removeFilters());
		}
		setisShowSearchField(!isShowSearchField);
	};

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>, id: CharacterTextFieldsId) => {
		setFilters((prev) => {
			return { ...prev, [id]: event.target.value };
		});
	};

	const textFieldsConfig = useMemo(
		() => getFilterTextFields(selectedOptions as CharacterFilters[]),
		[selectedOptions, filters]
	);

	if (modalOpen) {
		return (
			<>
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
							setSelectedOptions={setSelectedOptions}
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
								<Input label='Add key words to find' variant={inputVariants.filled} value={''} onChange={() => null} />
							)}
						</FilterModalTextFields>
						<Button text='Find' variant={buttonVariants.primary} onClick={handleFind} />
					</FilterModalContainer>
				</FilterModal>
				<FilterContainer />
			</>
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
					<button onClick={handleModalOpen}>
						<MultiSelect
							id='character-filter-readonly'
							readOnly
							open={false}
							options={options}
							selectedOptions={selectedOptions}
							setSelectedOptions={setSelectedOptions}
						/>
					</button>
					<Input label='Add key words to find' variant={inputVariants.filled} value={''} onChange={() => null} />
					<Button text='Find' variant={buttonVariants.primary} onClick={() => setisShowSearchField(false)} />
				</FilterConfiguration>
			)}
		</FilterContainer>
	);
};

export default FiltersControl;
