import React from 'react';
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export function Home() {
  const { user, loading } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <Container centerContent py={10}>
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container centerContent py={10}>
      <VStack spacing={6}>
        <Heading size="lg">Welcome to Upliance</Heading>
        
        {user ? (
          <Box textAlign="center">
            <Text mb={4}>Welcome {user.email}!</Text>
            <Button colorScheme="red" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Box>
        ) : (
          <Box textAlign="center">
            <Text mb={4}>Please sign in to continue</Text>
            <Button colorScheme="blue" onClick={handleSignIn}>
              Sign in with Google
            </Button>
          </Box>
        )}
      </VStack>
    </Container>
  );
}
