import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';
// import { IconContext } from 'react-icons';
import ReactPaginate from 'react-paginate';

export function PaginationProvider({
  children,
  onPageChange,
  pageCount,
}) {
  return (
    <Flex
      flexDir={'column'}
      justifyContent={'space-between'}
      alignItems={'center'}
      pb={'10px'}
      w={'100%'}
    >
      {children}
      <Box>
        <ReactPaginate
          breakLabel="..."
          onPageChange={onPageChange}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          containerClassName={'pagination'}
          previousLinkClassName={'pagination__link'}
          nextLinkClassName={'pagination__link'}
          disabledClassName={'pagination__link--disabled'}
          pageClassName={'page-item'}
          activeClassName={'active'}
          renderOnZeroPageCount={null}
          previousLabel={
            <ChevronLeftIcon boxSize={'30px'} color={'main.gray'} />
          }
          nextLabel={<ChevronRightIcon boxSize={'30px'} color={'main.gray'} />}
        />
      </Box>
    </Flex>
  );
}
