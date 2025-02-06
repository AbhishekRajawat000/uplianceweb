import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useSpring, animated } from 'react-spring';
import { getUsers } from '../store/userSlice';
import { useAuth } from '../contexts/AuthContext';
import type { AppDispatch, RootState } from '../store/store';

const AnimatedBox = animated(Box);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.user);
  const { user } = useAuth();
  
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 }
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Mock data for user activity
  const activityData = [
    { name: 'Mon', value: 4 },
    { name: 'Tue', value: 3 },
    { name: 'Wed', value: 7 },
    { name: 'Thu', value: 5 },
    { name: 'Fri', value: 8 },
    { name: 'Sat', value: 6 },
    { name: 'Sun', value: 4 },
  ];

  const userStats = [
    { name: 'Active Users', value: users.length },
    { name: 'New Today', value: 2 },
    { name: 'Total Sessions', value: 15 },
    { name: 'Avg. Time', value: '12m' },
  ];

  return (
    <AnimatedBox style={fadeIn} p={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>Welcome, {user?.displayName}</Heading>
          <Text color="gray.600">Here's your dashboard overview</Text>
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
          {userStats.map((stat, index) => (
            <Box
              key={index}
              bg={useColorModeValue('white', 'gray.700')}
              p={6}
              borderRadius="lg"
              boxShadow="sm"
            >
              <Stat>
                <StatLabel>{stat.name}</StatLabel>
                <StatNumber>{stat.value}</StatNumber>
                <StatHelpText>Updated now</StatHelpText>
              </Stat>
            </Box>
          ))}
        </Grid>

        <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={8}>
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            borderRadius="lg"
            boxShadow="sm"
            height="400px"
          >
            <Heading size="md" mb={4}>User Activity</Heading>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            borderRadius="lg"
            boxShadow="sm"
            height="400px"
          >
            <Heading size="md" mb={4}>User Distribution</Heading>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userStats}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {userStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </VStack>
    </AnimatedBox>
  );
};
