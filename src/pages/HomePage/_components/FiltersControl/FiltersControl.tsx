import { useMemo, useState } from 'react';
import { Button, Input, MultiSelect } from 'components';
import Modal from '@mui/material/Modal';
import { styled } from 'styles';
import { buttonVariants, inputVariants } from 'styles/variants';
import { characterFilterOptions, getFilterTextFields } from './utils';
import { CharacterFilters } from 'types/character';

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
	const [filterOpen, setFilterOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [options] = useState(characterFilterOptions);
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [isShowSearchField, setisShowSearchField] = useState(false);

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

	const clearSelectedOptions = () => {
		setSelectedOptions([]);
	};

	const toggleSearchFields = () => {
		setisShowSearchField(!isShowSearchField);
		isShowSearchField && clearSelectedOptions();
	};

	// eslint-disable-next-line
	const textFieldsConfig = useMemo(() => getFilterTextFields(selectedOptions as CharacterFilters[]), [selectedOptions]);

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
							<Input variant='filled' label='Add Name' />
							<Input variant='filled' label='Add Name' />
							<Input variant='filled' label='Add Name' />
						</FilterModalTextFields>
						<Button text='Find' variant={buttonVariants.primary} onClick={handleModalClose} />
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
					<Input label='Add key words to find' variant={inputVariants.filled} />
					<Button text='Find' variant={buttonVariants.primary} onClick={() => setisShowSearchField(false)} />
				</FilterConfiguration>
			)}
		</FilterContainer>
	);
};

export default FiltersControl;
