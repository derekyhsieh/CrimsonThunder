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
import React from "react";
import { uuidv4 } from "@firebase/util";
import { IconQuestionMark } from "@tabler/icons";

const Test = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const initialRef = React.useRef(null);

	// separate id's for firestore and for id's that neonatal care providers might want to import
	const [firestoreBabyId, setFirestoreBabyId] = React.useState(uuidv4());
	const [userCreatedBabyId, setUserCreatedBabyId] = React.useState(uuidv4());

	return (
		<>
			<Button onClick={onOpen}>Open Modal</Button>

			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create your account</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Baby ID</FormLabel>
							<Input ref={initialRef} placeholder={userCreatedBabyId} mb={5} />

							<FormLabel>Name</FormLabel>
							<Input placeholder="Aidan Bunch" mb={5} />

							<FormLabel>Gestational Age (Weeks)</FormLabel>
							<Input placeholder="24" mb={5} />

							<FormLabel>Gestational Age (Days)</FormLabel>
							<Input placeholder="4" mb={5} />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3}>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Test;
