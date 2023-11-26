'use client';

import Icon from '@/components/Icon';
import Header from '@/components/header';
import {
  useToast,
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import BoringAvatar from 'boring-avatars';
//@ts-ignore
import DatePicker from 'react-datepicker';
import { Community } from '@/types/state';

const communities = [
  {
    name: 'All for good',
    id: 1,
    slug: 'all-for-good-erd4',
    membersCount: 20,
    members: [{}],
    cover: '',
    description:
      'Join a movement that goes beyond personal well-being. In the "All for Good" nutrition community, we believe in the power of nutrition to create positive change. Share your journey towards a healthier you, engage in impactful discussions about sustainable eating, and explore how good nutrition can contribute to a better world. Every meal counts, and together, we\'re making choices that are "All for Good."',
  },
  {
    name: 'Live life to fullness',
    id: 2,
    slug: 'live-life-to-fullness-fed3',
    membersCount: 10,
    members: [{}],
    cover: '',
    description:
      'Experience a community that encourages you to savor every bite and live life to the fullest through mindful nutrition. In "Live Life to Fullness," we embrace a holistic approach to well-being, celebrating the pleasures of nourishing both body and soul. Discover a wealth of resources, connect with fellow members on a journey to vitality, and learn how to make every aspect of your life more fulfilling through balanced and joyful nutrition.',
  },
  {
    name: 'Meet your faves',
    id: 3,
    slug: 'meet-your-faves-acd2',
    membersCount: 45,
    members: [{}],
    cover: '',
    description:
      'Discover a vibrant community where nutrition enthusiasts unite to share their favorite recipes, wellness tips, and success stories. Connect with like-minded individuals, learn from nutrition experts, and celebrate the joy of nourishing your body. In "Meet Your Faves," we believe that building a supportive network is key to embracing a healthier lifestyle together.',
  },
];
const sectionTimes = [30, 45, 60, 90, 120];
export default function NutritionistPage() {
  const toast = useToast({
    duration: 3000,
    position: 'top',
    status: 'success',
    title: 'Your appointment was booked successfully',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null
  );

  const handleJoin = (community: Community) => {
    setSelectedCommunity(community);
  };

  return (
    <Box
      className='bg-primaryYellowTrans'
      // h={'100vh'}
      px={6}
      overflowY={'auto'}
      pb={12}
    >
      <Header bg='white' />
      <Box maxW={'1300'} mx={'auto'}>
        <Heading size={'lg'} my={4} bg={'white'} py={4} px={3} rounded={'md'}>
          Find people with similar interest
        </Heading>
        <Flex gap={6} wrap={'wrap'}>
          {communities.map((c, i) => {
            return (
              <Box
                maxW={{ lg: '50%' }}
                key={'nutri' + i}
                bg={'white'}
                rounded={'md'}
                px={4}
                py={5}
                flex={1}
                minW={500}
              >
                <Flex align={'start'} gap={4} mb={5}>
                  {c.cover && <Avatar size={'lg'} src={c.cover} />}
                  {!c.cover && (
                    <BoringAvatar
                      variant='sunset'
                      colors={[
                        '#92A1C6',
                        '#146A7C',
                        '#F0AB3D',
                        '#C271B4',
                        '#C20D90',
                      ]}
                    />
                  )}
                  <Box>
                    <Heading
                      className='text-primaryGreen'
                      as={'h3'}
                      mb={2}
                      size={'md'}
                    >
                      {c.name}
                    </Heading>
                    <Text
                      as={Flex}
                      gap={1}
                      alignItems={'center'}
                      fontWeight={'medium'}
                      className='text-secondaryGray'
                    >
                      <Icon name='group' size={20} /> {c.membersCount} members
                    </Text>
                  </Box>
                  <Button
                    onClick={() => handleJoin(c)}
                    ml={'auto'}
                    className='bg-primaryYellow text-primaryGreen'
                    gap={2}
                    rounded={'full'}
                    size={'md'}
                  >
                    <Icon size={24} name='group_add' /> Join Community
                  </Button>
                </Flex>
                {c.description && (
                  <Box>
                    <Heading
                      mb={3}
                      as={'h4'}
                      size={'md'}
                      className='text-primaryGreen'
                    >
                      Description
                    </Heading>
                    <Text pb={4} className='text-primaryGray'>
                      {c.description}
                    </Text>
                  </Box>
                )}
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}
