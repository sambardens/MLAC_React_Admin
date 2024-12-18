import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

const Toast = ({ position, duration, status, message }) => {
  toast({
    position: position || 'top-right',
    duration: duration || 2500,
    status: status,
    title: `${message}`,
  });
};

export { Toast };
