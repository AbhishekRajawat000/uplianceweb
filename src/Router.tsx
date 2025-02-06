import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Container, Flex } from '@chakra-ui/react';
import Counter from './components/Counter';
import UserForm from './components/UserForm';
import RichTextEditor from './components/RichTextEditor';
import Navigation from './components/Navigation';

export default function Router() {
  return (
    <BrowserRouter>
      <Box minH="100vh" bg="gray.50">
        <Navigation />
        <Container maxW="container.xl" py={8}>
          <Routes>
            <Route path="/" element={<Counter />} />
            <Route path="/user-form" element={<UserForm />} />
            <Route path="/rich-text" element={<RichTextEditor />} />
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
}
