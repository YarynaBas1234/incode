import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { Form, Formik, useFormikContext } from 'formik';

import { Button, Input, MultiSelect } from 'components';
import { buttonVariants, inputVariants, styled } from 'styles';
import { CharacterFilters, IObjectCharacterTextFieldsId } from 'types/character';

import { RootState } from 'redux/types';
import { filtersHistory, searchHistory } from 'redux/slices/historySlice';
import { applyFilters, applySearch } from 'redux/slices/charactersFilterSlice';

import { ICharacterFilterTextFieldItem } from './types';
import { characterFilterOptions, characterFilterTextFields, getFilterTextFields } from './utils';

interface IFilterFormProps {
	isSelect?: boolean;
	filterOpen?: boolean;
	handleFilterOpen: () => void;
	handleFilterClose: () => void;
	handleModalClose: () => void;
}

const FilterModalTextFields = styled.div`
	display: flex;
	flex-direction: column;
`;
const FormContainer = styled(Form)`
	display: flex;
	align-items: flex-start;
	gap: 28px;
`;

export const FilterForm: React.FC<IFilterFormProps> = (props) => {
	const { isSelect, filterOpen, handleFilterOpen, handleFilterClose, handleModalClose } = props;
	const dispatch = useAppDispatch();

	const {
		filters,
		searchKey,
		selectedOptions: initialOptions,
	} = useSelector((state: RootState) => state.charactersFilterSlice);
	const [selectedOptions, setSelectedOptions] = useState<string[]>(initialOptions);

	useEffect(() => {
		setSelectedOptions(initialOptions);
	}, [initialOptions]);

	const handleUpdateFilterOptions = (value: string[]) => {
		setSelectedOptions(value);
	};

	const ClearUnselectedFilters  = () => {
		const { values, setFieldValue } = useFormikContext<{filters: IObjectCharacterTextFieldsId, search: string}>();

		useEffect(() => {
			const selectedFilters = selectedOptions.reduce<ICharacterFilterTextFieldItem[]>((acc, filterId) => {
				acc.push(...characterFilterTextFields[filterId as CharacterFilters]);
				return acc;
			}, []);
			Object.entries(values.filters).forEach(([key, value]) => {
				const isFilter = selectedFilters.find((selectedFilter) => selectedFilter.id === key);
				!isFilter && setFieldValue(`filters.${key}`, '')
				
			});
		}, [selectedOptions]);

		return null;
	}

	const textFieldsConfig = useMemo(
		() => getFilterTextFields(selectedOptions as CharacterFilters[]),
		[selectedOptions, filters]
	);

	const handleSubmit = ({filters, search}: {filters: IObjectCharacterTextFieldsId, search: string}) => {
		if (selectedOptions.length) {
			dispatch(applyFilters({ filters, selectedOptions }));
			dispatch(filtersHistory(filters));
		} else {
			dispatch(applySearch(search));
			dispatch(searchHistory(search));
			setSelectedOptions([]);
		}
		handleModalClose();
	}

	return (
		<Formik
			initialValues={{ filters, search: searchKey }}
			onSubmit={handleSubmit}
		>
			{({ handleSubmit, values, handleChange }) => (
				<FormContainer>
					{isSelect && (
						<MultiSelect
							label='Select Item'
							id='character-filter'
							open={filterOpen}
							onOpen={handleFilterOpen}
							onClose={handleFilterClose}
							options={characterFilterOptions}
							selectedOptions={selectedOptions}
							setSelectedOptions={handleUpdateFilterOptions}
						/>
					)}
					<FilterModalTextFields>
						{textFieldsConfig.length ? (
							textFieldsConfig.map((item) => (
								<Input
									variant={inputVariants.filled}
									key={item.id}
									label={item.label}
									name={`filters.${item.id}`}
									value={values.filters[item.id]}
									onChange={handleChange}
								/>
							))
						) : (
							<Input
								label='Add key words to find'
								name='search'
								variant={inputVariants.filled}
								value={values.search}
								onChange={handleChange}
							/>
						)}
					</FilterModalTextFields>
					<Button text='Find' type='submit' variant={buttonVariants.primary} onClick={handleSubmit} />
					<ClearUnselectedFilters />
				</FormContainer>
			)}
		</Formik>
	);
};
