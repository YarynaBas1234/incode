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
	}
	.MuiInputLabel-root.MuiInputLabel-formControl.Mui-focused {
		display: none;
	}
`;

export const MultiSelect: React.FC<MultiSelectProps> = (props) => {
	const { label = 'Select Item', onOpen, onClose, selectedOptions, setSelectedOptions, open, readOnly, options, id } = props;

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
				>
					{options.map((option) => (
						<MenuItem key={option} value={option}>
							<ListItemText primary={option} />
							<Checkbox checked={selectedOptions.indexOf(option) !== -1} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</MultiSelectStyled>
	);
};
