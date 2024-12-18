import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import CustomButton from '../UI/buttons/CustomButton';
import CustomModal from './CustomModal';
import {
  poppins_400_16_24,
  poppins_500_18_27,
  poppins_600_32_48,
} from '@/styles/fontStyles';

const DeleteModal = ({
  closeModal,
  deleteHandler,
  title,
  text,
  description,
  isLoadingDelete = false,
  hide = false,
  isItemUserComponent = false,
  accountStatus = false,
  isWithdrawalsComponent = false,
}) => {
  return (
    <CustomModal closeModal={closeModal}>
      <Flex flexDir="column">
        <Text color={'textColor.black'} sx={poppins_600_32_48}>
          {title}
        </Text>

        <Text color={'textColor.black'} sx={poppins_500_18_27} mt={'24px'}>
          {text}
        </Text>

        <Text color={'textColor.gray'} sx={poppins_400_16_24} mt={'8px'}>
          {description}
        </Text>

        <Flex justifyContent={'end'} alignItems={'center'} mt="24px">
          <Flex>
            <CustomButton
              onClickHandler={deleteHandler}
              isSubmiting={isLoadingDelete}
            >
              {hide && accountStatus === 'ACTIVE'
                ? 'Hide'
                : hide && accountStatus === 'HIDDEN'
                ? 'Make visible'
                : isItemUserComponent && accountStatus === 'ACTIVE'
                ? 'Banned'
                : isItemUserComponent && accountStatus === 'BANNED'
                ? 'Unbanned'
                : isWithdrawalsComponent
                ? 'Confirm'
                : 'Delete'}
            </CustomButton>
            <CustomButton
              styles={'light'}
              onClickHandler={closeModal}
              ml={'16px'}
            >
              Cancel
            </CustomButton>
          </Flex>
        </Flex>
      </Flex>
    </CustomModal>
  );
};

export default DeleteModal;
