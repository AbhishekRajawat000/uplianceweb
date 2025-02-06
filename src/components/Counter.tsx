import { useState, useEffect } from 'react';
import { Box, Button, VStack, Text } from '@chakra-ui/react';
import { useSpring, animated } from 'react-spring';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  const animationProps = useSpring({
    from: { height: '0%' },
    to: { height: `${Math.min(count * 5, 100)}%` },
    config: {
      tension: 170,
      friction: 26
    }
  });

  const handleIncrement = () => setCount(prev => prev + 1);
  const handleDecrement = () => setCount(prev => Math.max(0, prev - 1));
  const handleReset = () => setCount(0);

  const AnimatedBox = animated(Box);

  return (
    <Box position="relative" h="400px" w="100%" bg="gray.100" p={4}>
      <AnimatedBox
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        bg="blue.400"
        style={animationProps}
      />
      <VStack spacing={4} position="relative" zIndex={1}>
        <Text fontSize="2xl" fontWeight="bold">{count}</Text>
        <Box>
          <Button colorScheme="blue" onClick={handleIncrement} mx={2}>+</Button>
          <Button colorScheme="red" onClick={handleReset} mx={2}>Reset</Button>
          <Button colorScheme="blue" onClick={handleDecrement} mx={2}>-</Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default Counter;
