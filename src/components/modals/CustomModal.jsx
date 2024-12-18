import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

const CustomModal = ({
  children,
  closeModal,
  w,
  h,
  p = '40px',
  px,
  maxH = '772px',
  minH,
  maxW = '692px',
  isCentered = true,
  size,
  bgImage,
  isCloseable = true,
  isCloseCross = true,
  closeOnOverlayClick = true,
}) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Modal
      isCloseable={isCloseable}
      isCentered={isCentered}
      onClose={closeModal}
      closeOnOverlayClick={closeOnOverlayClick}
      isOpen={true}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent
        position={'absolute'}
        p={p}
        px={px}
        borderRadius={'10px'}
        h={h}
        w={w}
        maxH={maxH}
        minH={minH}
        maxW={`${maxW}`}
        bgImage={{ base: 'none', lg: `${bgImage}` }}
        bgSize={'455px 100%'}
        bgRepeat={'no-repeat'}
        backgroundPosition={'right'}
        m="0"
      >
        {isCloseCross && <ModalCloseButton />}
        <ModalBody p="0">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
