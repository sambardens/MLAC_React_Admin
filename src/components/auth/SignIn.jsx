import { useRouter } from 'next/router';

import { Flex, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

import { useAuthLoginMutation } from '../../../store/auth/auth.api';
import { Error } from '../../../store/errors/errors.selectors';
import CustomButton from '../UI/buttons/CustomButton';
import FormikField from './FormikField';
import { useActions } from '@/hooks/useActions';

export const SignIn = ({ accentColor, btnTextColor }) => {
  const [login, result] = useAuthLoginMutation();
  const router = useRouter();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [errorMsg, setErrorMsg] = useState('');
  const [isShowPass, setIsShowPass] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string().email('Enter correct email').required('Required'),
    password: yup
      .string()
      .typeError('Password should be a string')
      .required('Required'),
  });

  const handleSubmit = async values => {
    login(values);
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => {
          handleSubmit(values);
        }}
        validateOnBlur
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form style={{ position: 'relative' }}>
            <Flex gap="8px" flexDir="column" mb="40px">
              <FormikField
                label="Email"
                name="email"
                placeholder="Your email"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                errors={errors.email}
                touched={touched.email}
              />
              <FormikField
                label="Password"
                name="password"
                placeholder="Your password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                errors={errors.password}
                touched={touched.password}
                isShowPass={isShowPass}
                setIsShowPass={setIsShowPass}
                // isShowForgotPass={!isWebPage}
              />
            </Flex>
            <CustomButton
              type="submit"
              w="100%"
              color={btnTextColor}
              bgColor={accentColor}
              isSubmiting={result.isLoading}
            >
              Sign In
            </CustomButton>
            {!errorMsg && (
              <Text
                pos="absolute"
                color={accentColor || 'accent'}
                left="50%"
                bottom="-5px"
                transform={'translate(-50%,100%)'}
                fontWeight="400"
                fontSize="16px"
              >
                {errorMsg}
              </Text>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignIn;
