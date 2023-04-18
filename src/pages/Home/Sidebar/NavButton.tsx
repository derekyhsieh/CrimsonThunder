import { As, Button, ButtonProps, HStack, Icon, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { changeTab } from "../../../app/sidebarSlice";

interface NavButtonProps extends ButtonProps {
	icon: As;
	label: string;
	tab: string;
}

export const NavButton = (props: NavButtonProps) => {
	const { icon, label, tab, ...buttonProps } = props;
	const dispatch = useDispatch();

	return (
		<Button
			variant="ghost-on-accent"
			justifyContent="start"
			onClick={() => {
        dispatch(changeTab(tab));
      }}
			{...buttonProps}
		>
			<HStack spacing="3">
				<Icon as={icon} boxSize="6" color="on-accent-subtle" />
				<Text color="on-accent-subtle">{label}</Text>
			</HStack>
		</Button>
	);
};
