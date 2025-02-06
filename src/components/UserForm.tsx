import { useState } from 'react';
import {
  Box,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Text,
  FormErrorMessage
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser, UserData } from '../store/userSlice';
import type { AppDispatch, RootState } from '../store/store';

const UserForm = () => {
  const [userData, setUserData] = useState<UserData>({
    id: uuidv4(),
    name: '',
    address: '',
    email: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState<Partial<UserData>>({});
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.user.status);
  const toast = useToast();

  const validateForm = () => {
    const newErrors: Partial<UserData> = {};
    
    if (!userData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!userData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d+$/.test(userData.phone)) {
      newErrors.phone = 'Phone number should contain only digits';
    } else if (userData.phone.length !== 10) {
      newErrors.phone = 'Phone number should be exactly 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Special handling for phone input
    if (name === 'phone') {
      // Only allow digits
      const digitsOnly = value.replace(/\D/g, '');
      // Limit to 10 digits
      const truncated = digitsOnly.slice(0, 10);
      setUserData(prev => ({ ...prev, [name]: truncated }));
    } else {
      setUserData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof UserData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await dispatch(saveUser(userData)).unwrap();
      setUserData({
        id: uuidv4(),
        name: '',
        address: '',
        email: '',
        phone: ''
      });
      toast({
        title: 'Success',
        description: 'User data saved successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save user data',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg">
      <VStack spacing={4}>
        <Text>User ID: {userData.id}</Text>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Name *</FormLabel>
          <Input 
            name="name" 
            value={userData.name} 
            onChange={handleChange}
            placeholder="Enter your name" 
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input 
            name="address" 
            value={userData.address} 
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </FormControl>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email *</FormLabel>
          <Input 
            name="email" 
            type="email" 
            value={userData.email} 
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phone}>
          <FormLabel>Phone * (10 digits)</FormLabel>
          <Input 
            name="phone" 
            value={userData.phone} 
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            maxLength={10}
            pattern="\d{10}"
          />
          <FormErrorMessage>{errors.phone}</FormErrorMessage>
        </FormControl>
        <Button 
          colorScheme="blue" 
          onClick={handleSubmit}
          isLoading={status === 'loading'}
          loadingText="Saving"
          width="100%"
        >
          Save
        </Button>
      </VStack>
    </Box>
  );
};

export default UserForm;
