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
import { useDispatch } from 'react-redux';
import { saveUser, UserData } from '../store/userSlice';
import type { AppDispatch } from '../store/store';

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
  const toast = useToast();

  const validateForm = () => {
    const newErrors: Partial<UserData> = {};
    
    if (!userData.name) newErrors.name = 'Name is required';
    if (!userData.email) newErrors.email = 'Email is required';
    if (!userData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(userData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    if (!userData.address) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate new ID before submission
    const newId = uuidv4();
    const formData = { ...userData, id: newId };
    console.log('Submitting form data:', formData);
    
    if (!validateForm()) {
      console.log('Form validation failed:', errors);
      return;
    }

    try {
      console.log('Dispatching saveUser action...');
      const result = await dispatch(saveUser(formData)).unwrap();
      console.log('Save user result:', result);
      
      toast({
        title: 'User saved successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Reset form after successful submission
      setUserData({
        id: uuidv4(),
        name: '',
        address: '',
        email: '',
        phone: ''
      });
    } catch (error) {
      console.error('Error saving user:', error);
      toast({
        title: 'Error saving user',
        description: error instanceof Error ? error.message : 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof UserData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove all non-digits
    setUserData(prev => ({ ...prev, phone: value }));
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%" maxWidth="500px" p={4}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.phone}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="tel"
            name="phone"
            value={userData.phone}
            onChange={handlePhoneChange}
            maxLength={10}
            placeholder="Enter 10 digit phone number"
          />
          <FormErrorMessage>{errors.phone}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.address}>
          <FormLabel>Address</FormLabel>
          <Input
            name="address"
            value={userData.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
          <FormErrorMessage>{errors.address}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Save User
        </Button>
      </VStack>
    </Box>
  );
};

export default UserForm;
