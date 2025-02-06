import { useNavigate } from 'react-router-dom';
import { Box, VStack, Heading, Text, useToast } from '@chakra-ui/react';
import GoogleButton from 'react-google-button';
import { useAuth } from '../contexts/AuthContext';
import { useSpring, animated } from 'react-spring';

const AnimatedBox = animated(Box);

export const Login = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 }
  });

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: 'Success!',
        description: 'Successfully signed in with Google',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign in with Google',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <AnimatedBox style={fadeIn} minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={8} p={8} bg="white" borderRadius="lg" boxShadow="xl" width="100%" maxW="400px">
        <Heading size="xl">Welcome</Heading>
        <Text fontSize="lg" color="gray.600">Sign in to access your dashboard</Text>
        <GoogleButton onClick={handleGoogleSignIn} />
      </VStack>
    </AnimatedBox>
  );
};
