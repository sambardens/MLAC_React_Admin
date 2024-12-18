import { Button, Icon } from '@chakra-ui/react';
import React from 'react';

import BackArrowIcon from '@/assets/icons/modal/backArrow.svg';
import NextArrowIcon from '@/assets/icons/modal/nextArrow.svg';

const CustomButton = ({
  onClickHandler,
  children,
  minW,
  w = '150px',
  h = '56px',
  ml,
  mt,
  mr,
  mb,
  py = '16px',
  px = '16px',
  borderRadius = '10px',
  isSubmiting,
  fontSize = '16px',
  lineHeight = 1.5,
  fontWeight = 500,
  isEditable = true,
  styles,
  type = 'button',
  iconLeft = null,
  iconRight = null,
  isBackButton = false,
  isNextButton = false,
  alignSelf = undefined,
  color = null,
  bgColor = null,
  ariaLabel,
}) => {
  const isDisabled = styles === 'disabled';

  const getBg = () => {
    if (bgColor) {
      return bgColor;
    }

    if (styles === 'main') {
      return 'brand.500';
    }
    if (styles === 'transparent') {
      return 'transparent';
    }
    if (styles === 'light') {
      return 'bg.light';
    }
    if (styles === 'light-red') {
      return 'bg.light';
    }
    if (styles === 'transparent-bold' || isDisabled) {
      return 'bg.secondary';
    }
    if (styles === 'blueYonder') {
      return 'brand.blueYonder';
    }
    return 'brand.500';
  };

  const getColor = () => {
    if (color) {
      return color;
    }

    if (styles === 'transparent') {
      return 'main.black';
    }
    if (styles === 'transparent-bold' || isDisabled) {
      return 'textColor.grayDark';
    }
    if (styles === 'blueYonder') {
      return 'main.white';
    }
    if (styles === 'main') {
      return 'main.white';
    }
    if (styles === 'light') {
      return 'main.black';
    }
    if (styles === 'light-red') {
      return 'brand.500';
    }
    return 'main.white';
  };

  return (
    <Button
      onClick={onClickHandler}
      isLoading={isSubmiting}
      w={w}
      h={h}
      ml={ml}
      mt={mt}
      mr={mr}
      mb={mb}
      py={py}
      px={px}
      minW={minW}
      bgColor={getBg()}
      color={getColor()}
      borderRadius={borderRadius}
      filter={isEditable ? 'none' : 'grayscale(90%)'}
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      cursor={isEditable ? 'pointer' : 'not-allowed'}
      variant="ghost"
      type={type}
      isDisabled={isDisabled}
      _hover={{ boxShadow: '1px 1px 3px 1px Gray' }}
      _disabled={{ color: 'white', bgColor: 'stroke' }}
      pointerEvents={isDisabled ? 'none' : 'auto'}
      leftIcon={isBackButton && <BackArrowIcon />}
      rightIcon={isNextButton && <NextArrowIcon />}
      alignSelf={alignSelf}
      aria-label={ariaLabel}
    >
      {iconLeft && !isBackButton && (
        <Icon as={iconLeft} color={'white'} boxSize="24px" ml="10px" />
      )}
      {children}
      {iconRight && !isNextButton && (
        <Icon as={iconRight} boxSize="24px" ml="10px" />
      )}
    </Button>
  );
};

export default CustomButton;
