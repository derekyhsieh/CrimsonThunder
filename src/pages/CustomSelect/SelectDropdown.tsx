import {
	Box,
	Container,
	FormControl,
	FormLabel,
	HStack,
	Icon,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";
import { CustomSelect } from "./CustomSelect";
import { Option } from "./Option";

interface SelectDropdownProps {
	label: string;
	placeholder: string;
	options: Array<any>;
	value: any;
	onChange: any;
}

export const SelectDropdown = ({ label, options, placeholder, value, onChange }: SelectDropdownProps) => {
	

	return (
		<div style={{marginBottom: 5}}>
			<FormLabel>{label}</FormLabel>
			<CustomSelect
				name={label}
				colorScheme="teal"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			>
				{options.map((optionValue, index) => (
					<Option value={optionValue} key={index}>
						<HStack>
							<Text>{optionValue}</Text>
						</HStack>
					</Option>
				))}
			</CustomSelect>
		</div>
	);
};
