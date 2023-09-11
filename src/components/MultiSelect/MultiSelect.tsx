import React from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { styled, theme } from 'styles';
import ListItemText from '@mui/material/ListItemText';

interface MultiSelectProps {
	label?: string;
	id: string;
	options: string[];
	selectedOptions: string[];
	setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
	open?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
	readOnly?: boolean;
}

const MultiSelectStyled = styled.div`
	width: 215px;
	text-align: start;
	.MuiInputBase-root {
		width: 100%;
		background-color: ${theme.colors.white};
		border-radius: 4px 4px 0 0;
	}
	.MuiInputLabel-root {
		color: ${theme.colors.black_1};
		font-size: 16px;
	}
	.MuiSelect-icon {
		color: ${theme.colors.black_1};
	}
	.MuiInputLabel-root.MuiInputLabel-formControl.Mui-focused {
		display: none;
	}
	.MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-shrink {
		display: none;
	}
`;

const MenuItemStyled = styled(MenuItem)`
	.MuiTypography-root {
		font-size: 16px;
		color: ${theme.colors.black_2};
	}
`;

export const MultiSelect: React.FC<MultiSelectProps> = (props) => {
	const {
		label = 'Select Item',
		onOpen,
		onClose,
		selectedOptions,
		setSelectedOptions,
		open,
		readOnly,
		options,
		id,
	} = props;

	const MenuProps = {
		PaperProps: {
			style: {
				backgroundColor: theme.colors.white,
				fontSize: '16px',
			},
		},
	};

	const handleChange = (event: SelectChangeEvent<typeof options>) => {
		const {
			target: { value },
		} = event;
		Array.isArray(value) && setSelectedOptions(value);
	};

	return (
		<MultiSelectStyled>
			<FormControl fullWidth>
				<InputLabel>{label}</InputLabel>
				<Select
					id={id}
					multiple
					value={selectedOptions}
					open={open}
					onOpen={onOpen}
					onChange={handleChange}
					onClose={onClose}
					readOnly={readOnly}
					renderValue={(selected) => selected.join(', ')}
					input={<OutlinedInput label={label} />}
					MenuProps={MenuProps}
				>
					{options.map((option) => (
						<MenuItemStyled key={option} value={option}>
							<ListItemText primary={option} />
							<Checkbox checked={selectedOptions.indexOf(option) !== -1} />
						</MenuItemStyled>
					))}
				</Select>
			</FormControl>
		</MultiSelectStyled>
	);
};
