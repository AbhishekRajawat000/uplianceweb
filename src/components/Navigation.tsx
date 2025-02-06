import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flex, Button } from '@chakra-ui/react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Flex gap={4} p={4} bg="gray.100" mb={4}>
      <Link to="/">
        <Button colorScheme={isActive('/') ? 'blue' : 'gray'}>Counter</Button>
      </Link>
      <Link to="/user-form">
        <Button colorScheme={isActive('/user-form') ? 'blue' : 'gray'}>User Form</Button>
      </Link>
      <Link to="/rich-text">
        <Button colorScheme={isActive('/rich-text') ? 'blue' : 'gray'}>Rich Text Editor</Button>
      </Link>
    </Flex>
  );
};

export default Navigation;
