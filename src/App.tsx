import { ChakraProvider, Container, VStack, Heading, Box, Flex, Button } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Counter from './components/Counter'
import UserForm from './components/UserForm'
import RichTextEditor from './components/RichTextEditor'

const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Box 
      width="100%" 
      py={4} 
      bg="white" 
      boxShadow="md" 
      position="sticky" 
      top={0} 
      zIndex={1000}
    >
      <Container maxW="container.lg">
        <Flex gap={4}>
          <Link to="/">
            <Button
              colorScheme={isActive('/') ? 'blue' : 'gray'}
              variant={isActive('/') ? 'solid' : 'ghost'}
            >
              Counter
            </Button>
          </Link>
          <Link to="/user-form">
            <Button
              colorScheme={isActive('/user-form') ? 'blue' : 'gray'}
              variant={isActive('/user-form') ? 'solid' : 'ghost'}
            >
              User Form
            </Button>
          </Link>
          <Link to="/editor">
            <Button
              colorScheme={isActive('/editor') ? 'blue' : 'gray'}
              variant={isActive('/editor') ? 'solid' : 'ghost'}
            >
              Rich Text Editor
            </Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Box minH="100vh" bg="gray.50">
            <Navigation />
            <Container maxW="container.lg" py={8}>
              <VStack spacing={8}>
                <Routes>
                  <Route path="/" element={
                    <>
                      <Heading size="lg" mb={6}>Counter with Animation</Heading>
                      <Counter />
                    </>
                  } />
                  <Route path="/user-form" element={
                    <>
                      <Heading size="lg" mb={6}>User Form</Heading>
                      <UserForm />
                    </>
                  } />
                  <Route path="/editor" element={
                    <>
                      <Heading size="lg" mb={6}>Rich Text Editor</Heading>
                      <RichTextEditor />
                    </>
                  } />
                </Routes>
              </VStack>
            </Container>
          </Box>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App
