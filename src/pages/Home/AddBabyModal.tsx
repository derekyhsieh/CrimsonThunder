import {
	Button,
	useDisclosure,
	ModalBody,
	ModalOverlay,
	ModalContent,
	FormControl,
	ModalHeader,
	FormLabel,
	ModalCloseButton,
	Input,
	Modal,
	ModalFooter,
	HStack,
	Tooltip,
	Portal,
	VStack,
} from "@chakra-ui/react";
import React, { MouseEventHandler } from "react";
import { uuidv4 } from "@firebase/util";
import { IconQuestionMark } from "@tabler/icons";
import { SelectDropdown } from "../CustomSelect/SelectDropdown";

interface AddBabyModalProps {
	isOpen: boolean;
	onOpen: MouseEventHandler<HTMLButtonElement>;
	onClose: () => void;
}

const AddBabyModal = ({ isOpen, onOpen, onClose }: AddBabyModalProps) => {
	const initialRef = React.useRef(null);

	// separate id's for firestore and for id's that neonatal care providers might want to import
	const [firestoreBabyId, setFirestoreBabyId] = React.useState(uuidv4());
	const [userCreatedBabyId, setUserCreatedBabyId] = React.useState(uuidv4());

	return (
		<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add a new baby</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>Baby ID</FormLabel>
						<Input ref={initialRef} placeholder={userCreatedBabyId.substring(0, 8)} mb={5} />

						<FormLabel>Name</FormLabel>
						<Input placeholder="Aidan Bunch" mb={5} />

						<SelectDropdown
							label="Gestational Age (Weeks)"
							options={[22, 23, 24, 25, 26, 27, 28, 29, 30]}
							placeholder="22"
						/>

						<SelectDropdown
							label="Gestational Age (Days)"
							options={[0, 1, 2, 3, 4, 5, 6]}
							placeholder="2"
						/>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="teal" mr={3}>
						Save
					</Button>
					<Button onClick={onClose}>Cancel</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddBabyModal;
