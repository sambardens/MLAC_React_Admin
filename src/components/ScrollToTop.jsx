import { ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Box className="top-to-btm">
      {showTopBtn && (
        <Flex
          align={'center'}
          justify={'center'}
          className="icon-position icon-style"
          onClick={goToTop}
        >
          <ChevronUpIcon boxSize={'30px'}/>
        </Flex>
      )}
    </Box>
  );
};
export default ScrollToTop;
