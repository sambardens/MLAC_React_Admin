import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
} from '@chakra-ui/react';
import { Select, chakraComponents } from 'chakra-react-select';
import { useEffect, useRef, useState } from 'react';

import CloseIcon from '@/assets/icons/base/close.svg';
import ArrowDownIcon from '@/assets/icons/base/down.svg';

const CustomSelect = ({
  options = [],
  name,
  onBlur,
  onChange,
  placeholder,
  w = '100%',
  minW,
  maxW,
  minHeight = '56px',
  label,
  ml,
  mr,
  mt,
  mb,
  isMulti = false,
  value,
  selectedOptions,
  isInvalid = false,
  id = false,
  errors = false,
  mlError = false,
  borderSelect = '1px solid',
  dropdownIconColor = 'main.lightGray',
  pxDropdownIcon = '16px',
  borderRadiusControl = '10px',
  hControl = '56px',
  plValueContainer = '12px',
  bgColor = 'bg.main',
  phColor = 'main.lightGray',
  isInput = true,
  textAlign = 'left',
  isTop = false,
  menuListTopHeight = '- 5',
  isSearchable = true,
  isErrorsAbsolute = false,
  alignSelf = null,
  mbLabel = '8px',
  mlLabel = '12px',
  isClearable = false,
}) => {
  const selectorRef = useRef(null);
  const [selectorHeight, setSelectorHeight] = useState(null);

  useEffect(() => {
    if (selectorRef?.current?.offsetHeight) {
      const height = selectorRef?.current?.offsetHeight;
      setSelectorHeight(height);
    }
  }, []);

  const components = {
    ClearIndicator: props => (
      <chakraComponents.ClearIndicator {...props}>
        <Icon as={CloseIcon} boxSize="24px" color={dropdownIconColor} />
      </chakraComponents.ClearIndicator>
    ),
    DropdownIndicator: props => (
      <chakraComponents.DropdownIndicator {...props}>
        <Icon as={ArrowDownIcon} boxSize="24px" color={dropdownIconColor} />
      </chakraComponents.DropdownIndicator>
    ),
  };

  const getSelectedOptions = () => {
    if (value === '') {
      return '';
    }

    if (isMulti && selectedOptions) {
      return selectedOptions;
    }

    return options.find(option => option?.value === value);
  };

  return (
    <FormControl
      ref={selectorRef}
      ml={ml}
      mb={mb}
      mt={mt}
      mr={mr}
      w={w}
      maxW={maxW}
      isInvalid={isInvalid}
      {...(id && { id })}
      textAlign={textAlign}
      alignSelf={alignSelf}
    >
      {label && (
        <FormLabel
          htmlFor={name}
          mb={mbLabel}
          ml={mlLabel}
          fontSize="16px"
          fontWeight="400"
          color="main.black"
        >
          {label}
        </FormLabel>
      )}
      <Select
        id={name}
        variant="unstyled"
        value={getSelectedOptions()}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        classNamePrefix="chakra-react-select"
        options={options}
        placeholder={placeholder}
        selectedOptionStyle="color"
        components={components}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={isSearchable}
        chakraStyles={{
          dropdownIndicator: (provided, { selectProps }) => ({
            ...provided,
            px: pxDropdownIcon,
            '> svg': {
              transform: `rotate(${selectProps.menuIsOpen ? -180 : 0}deg)`,
              color: 'main.textGray',
            },
          }),
          clearIndicator: provided => ({
            ...provided,
            display: isClearable ? 'flex' : 'none',
            mr: '16px',
          }),
          indicatorSeparator: provided => ({
            ...provided,
            display: 'none',
          }),
          container: provided => ({
            ...provided,
          }),
          control: (provided, state) => ({
            ...provided,
            bg: bgColor,
            border: borderSelect,
            borderRadius: borderRadiusControl,
            borderColor: isInvalid ? 'brand.500' : 'main.lightGray',
            height: hControl,
            minHeight,
            size: 'lg',
            cursor: state.isFocused ? 'text' : 'pointer',
            w,
            minW,
          }),
          input: provided => ({
            ...provided,
            pl: '0',
          }),
          singleValue: provided => ({
            ...provided,
            pl: 0,
          }),
          multiValue: provided => ({
            ...provided,
            p: '8px',
            borderRadius: '10px',
            bgColor: 'main.textGray',
          }),
          multiValueLabel: provided => ({
            ...provided,
            color: 'main.white',
            fontWeight: 400,
            fontSize: '16px',
          }),
          multiValueRemove: (provided, state) => ({
            ...provided,
            ml: '4px',
            color: 'main.white',
            opacity: 1,
            _hover: { opacity: 1 },
          }),
          valueContainer: provided => ({
            ...provided,
            pl: plValueContainer,
            color: 'main.black',
          }),
          menuList: provided => ({
            ...provided,
            position: 'absolute',
            top: isTop && `calc(-${selectorHeight}px ${menuListTopHeight}px)`,
            transform: isTop && 'translateY(-100%)',

            border: '1px',
            borderColor: 'main.lightGray',
            borderRadius: '10px',
            maxH: '226px',
            p: 0,
          }),
          option: (provided, state) => ({
            ...provided,
            height: '56px',
            color: 'main.black',
            m: 0,
            bgColor: state.isSelected && 'main.lightGray',
          }),
          menu: (provided, state) => ({
            ...provided,
            mt: '5px',
            bgColor: state.isSelected && 'main.lightGray',
          }),
          placeholder: provided => ({
            ...provided,
            color: phColor,
          }),
        }}
      />
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

export default CustomSelect;
