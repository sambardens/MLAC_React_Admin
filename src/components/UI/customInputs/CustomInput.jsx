import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';

import CloseIcon from '@/assets/icons/base/close.svg';

const CustomInput = ({
  name,
  placeholder,
  type = 'text',
  onBlur,
  onChange,
  onClose,
  showCloseIcon,
  value,
  errors,
  label,
  ml,
  mb,
  mr,
  mt,
  w = '100%',
  maxW,
  px = '12px',
  py,
  h = '56px',
  readOnly = false,
  borderRadius = '10px',
  icon,
  iconRight,
  iconColor = 'main.lightGray',
  iconRightColor = 'brand.200',
  bgColor = 'main.white',
  isInvalid = false,
  mlError = false,
  mlLabel = '12px',
  textRight,
  isErrorsAbsolute = false,
  border = '1px solid',
  onKeyDown = false,
}) => {
  return (
    <FormControl
      pos="relative"
      ml={ml}
      mb={mb}
      mt={mt}
      mr={mr}
      w={w}
      maxW={maxW}
      isInvalid={isInvalid}
    >
      {label && (
        <FormLabel
          htmlFor={name}
          mb="4px"
          ml={mlLabel}
          fontSize="16px"
          fontWeight="400"
          color="main.black"
        >
          {label}
        </FormLabel>
      )}
      <Flex
        position={'relative'}
        alignItems="center"
        border={border}
        borderRadius={borderRadius}
        borderColor={isInvalid ? 'brand.red' : 'main.lightGray'}
        px={px}
        h={h}
        bgColor={bgColor}
      >
        {icon && (
          <Icon as={icon} mr="12px" w="24px" h="24px" fill={iconColor} />
        )}
        <Input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...(onKeyDown && (onKeyDown = { onKeyDown }))}
          placeholder={placeholder}
          w={w}
          _placeholder={{ color: 'main.lightGray' }}
          isReadOnly={readOnly}
          variant="unstyled"
          color="main.black"
          cursor={readOnly ? 'inherit' : 'text'}
        />
        {iconRight && (
          <Icon
            as={iconRight}
            ml="12px"
            w="24px"
            h="24px"
            color={iconRightColor}
          />
        )}
        {textRight && (
          <Text fontSize="16px" fontWeight="400" color="main.black">
            {textRight}
          </Text>
        )}
        {onClose && showCloseIcon && (
          <IconButton
            size="sm"
            ml="4px"
            mr="3px"
            h="56px"
            aria-label="Clear search result"
            icon={<CloseIcon />}
            color="main.lightGray"
            _hover={{ color: 'brand.200' }}
            transition="0.3s linear"
            onClick={onClose}
          />
        )}
      </Flex>

      {errors && (
        <FormErrorMessage
          position={isErrorsAbsolute ? 'absolute' : 'static'}
          {...(mlError && { ml: mlError, mt: '5px' })}
        >
          {errors}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default CustomInput;
