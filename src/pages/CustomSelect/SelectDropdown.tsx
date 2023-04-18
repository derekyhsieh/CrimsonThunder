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
}

export const SelectDropdown = ({ label, options, placeholder }: SelectDropdownProps) => {
	const [colorMode, setColorMode] = useState<string | null | undefined>();

	return (
		<div style={{marginBottom: 5}}>
			<FormLabel>{label}</FormLabel>
			<CustomSelect
				name="ColorMode"
				colorScheme="teal"
				value={colorMode}
				onChange={setColorMode}
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
