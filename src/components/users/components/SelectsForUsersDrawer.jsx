import { Box } from '@chakra-ui/react';

import {
  GetSelectedBap,
  GetSelectedRole,
  GetSortBy,
} from '../../../../store/filters/filters.selectors';
import CustomSelect from '@/components/UI/customInputs/CustomSelect';
import { useActions } from '@/hooks/useActions';

const activitySelectOptions = [
  { value: 'last_activity', label: 'By last activity' },
];

export const SelectsForUsersDrawer = ({
  bapOptions,
  rolesOptions,
  getUsersQuery,
}) => {
  const { setSortBy, setSelectedRole, setSelectedBap } = useActions();
  const sortBy = GetSortBy();
  const selectedRole = GetSelectedRole();
  const selectedBap = GetSelectedBap();

  const handleSortingByDate = e => {
    if (!e) {
      setSortBy('');
      getUsersQuery(
        '' +
          (selectedBap ? `?performers=${selectedBap}` : '') +
          (selectedRole
            ? `${!selectedBap ? '?' : '&'}role=${selectedRole}`
            : ''),
      );
      return;
    } else {
      setSortBy(e.value);
      getUsersQuery(
        `?orderBy=signIn&sortOrder=DESC${
          (selectedBap ? `&performers=${selectedBap}` : '') +
          (selectedRole ? `&role=${selectedRole}` : '')
        }`,
      );
    }
  };

  const sortUsersByBapName = e => {
    if (!e) {
      setSelectedBap(null);
      getUsersQuery(
        '' +
          (sortBy ? `?orderBy=createdAt` : '') +
          (selectedRole ? `${!sortBy ? '?' : '&'}role=${selectedRole}` : ''),
      );
      return;
    } else {
      setSelectedBap(e.value);
      getUsersQuery(
        `?performers=${e.value}` +
          (sortBy ? `&orderBy=createdAt` : '') +
          (selectedRole ? `&role=${selectedRole}` : ''),
      );
    }
  };

  const sortUsersByRole = e => {
    if (!e) {
      setSelectedRole(null);
      getUsersQuery(
        '' +
          (sortBy ? `?orderBy=createdAt` : '') +
          (selectedBap
            ? `${!sortBy ? '?' : '&'}performers=${selectedBap}`
            : ''),
      );
      return;
    } else {
      setSelectedRole(e.value);
      getUsersQuery(
        `?role=${e.value}` +
          (sortBy ? `&orderBy=createdAt` : '') +
          (selectedBap ? `&performers=${selectedBap}` : ''),
      );
    }
  };

  return (
    <>
      <Box position={'relative'}>
        <CustomSelect
          onChange={e => {
            handleSortingByDate(e);
          }}
          value={sortBy}
          options={activitySelectOptions}
          isSearchable={false}
          w="100%"
          placeholder={'Last activity'}
          label={'Sort by'}
          plValueContainer={'12px'}
          mbLabel="4px"
          mlLabel="0px"
          isClearable={true}
        />
      </Box>

      <CustomSelect
        onChange={e => {
          sortUsersByRole(e);
        }}
        value={selectedRole}
        options={rolesOptions}
        isSearchable={true}
        isClearable={true}
        w="100%"
        placeholder={'All'}
        label={'Role'}
        plValueContainer={'12px'}
        mbLabel="4px"
        mlLabel="0px"
      />
      <CustomSelect
        onChange={e => {
          sortUsersByBapName(e);
        }}
        value={selectedBap}
        options={bapOptions}
        isSearchable={true}
        isClearable={true}
        w="100%"
        placeholder={'All'}
        label={'B.A.P'}
        plValueContainer={'12px'}
        mbLabel="4px"
        mlLabel="0px"
      />
    </>
  );
};
