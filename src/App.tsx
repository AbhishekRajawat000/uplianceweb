import { ChakraProvider, Container, VStack, Heading, Box, Flex, Button } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Counter from './components/Counter'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import RichTextEditor from './components/RichTextEditor'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider, useAuth } from './contexts/AuthContext'

const Navigation = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  if (!user) return null;

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
        <Flex gap={4} justifyContent="space-between" alignItems="center">
          <Flex gap={4}>
            <Link to="/dashboard">
              <Button
                colorScheme={isActive('/dashboard') ? 'blue' : 'gray'}
                variant={isActive('/dashboard') ? 'solid' : 'ghost'}
              >
                Dashboard
              </Button>
            </Link>
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
          <Button colorScheme="red" variant="ghost" onClick={() => logout()}>
            Logout
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AuthProvider>
          <Router>
            <Box minH="100vh" bg="gray.50">
              <Navigation />
              <Container maxW="container.lg" py={8}>
                <VStack spacing={8}>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                      <ProtectedRoute>
                        <>
                          <Heading size="lg" mb={6}>Counter with Animation</Heading>
                          <Counter />
                        </>
                      </ProtectedRoute>
                    } />
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/user-form" element={
                      <ProtectedRoute>
                        <>
                          <Heading size="lg" mb={6}>User Form</Heading>
                          <UserForm />
                          <UserList />
                        </>
                      </ProtectedRoute>
                    } />
                    <Route path="/editor" element={
                      <ProtectedRoute>
                        <>
                          <Heading size="lg" mb={6}>Rich Text Editor</Heading>
                          <RichTextEditor />
                        </>
                      </ProtectedRoute>
                    } />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                  </Routes>
                </VStack>
              </Container>
            </Box>
          </Router>
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default App
