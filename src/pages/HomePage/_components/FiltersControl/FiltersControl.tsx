import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import Modal from '@mui/material/Modal';

import { ButtonBase, MultiSelect } from 'components';
import { buttonVariants, styled } from 'styles';
import { RootState } from 'redux/types';

import { removeFilters } from 'redux/slices/charactersFilterSlice';

import { characterFilterOptions } from './utils';
import { FilterForm } from './FilterForm';

const FilterContainer = styled.div`
	display: flex;
	align-items: flex-start;
	width: 100%;
	min-height: 56px;

	@media screen and (max-width: 1195px) {
		justify-content: space-between;
    }
`;
const FilterConfiguration = styled.div`
	margin-left: 160px;
	display: flex;
	align-items: flex-start;
	gap: 28px;

	@media screen and (max-width: 1195px) {
		margin-left: 0;
    }
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

const FiltersControl = () => {
	const dispatch = useAppDispatch();

	const { selectedOptions } = useSelector((state: RootState) => state.charactersFilterSlice);

	const [filterOpen, setFilterOpen] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [isShowSearchField, setisShowSearchField] = useState<boolean>(false);

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

	const toggleSearchFields = () => {
		dispatch(removeFilters());
		setisShowSearchField(!isShowSearchField);
	};

	if (modalOpen) {
		return (
			<FilterModal open={modalOpen} onClose={handleModalClose}>
				<FilterModalContainer>
					<FilterForm
						isSelect={modalOpen}
						filterOpen={filterOpen}
						handleFilterOpen={handleFilterOpen}
						handleFilterClose={handleFilterClose}
						handleModalClose={handleModalClose}
					/>
				</FilterModalContainer>
			</FilterModal>
		);
	}

	return (
		<FilterContainer>
			<ButtonBase
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
							options={characterFilterOptions}
							selectedOptions={selectedOptions}
							setSelectedOptions={() => null}
						/>
					</div>
					<FilterForm
						handleFilterOpen={handleFilterOpen}
						handleFilterClose={handleFilterClose}
						handleModalClose={handleModalClose}
					/>
				</FilterConfiguration>
			)}
		</FilterContainer>
	);
};

export default FiltersControl;
