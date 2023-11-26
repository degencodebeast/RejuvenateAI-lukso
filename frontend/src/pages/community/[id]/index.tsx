'use client';
import Icon from '@/components/Icon';
import { Community } from '@/types/state';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import BoringAvatars from 'boring-avatars';
import { KeyboardEvent, useState } from 'react';
import { MdChat, MdEvent, MdViewAgenda } from 'react-icons/md';
import { formatChatTimestamp, maskHexAddress } from '@/helpers/prompt';
import { useAccount } from 'wagmi';
// import { randomUUID } from 'crypto';

type ChatMessages = {
  id: string;
  content: string;
  userAddress: string;
  fullname: string;
  timestamp: Date | number;
};
export default function CommunityViewPage() {
  const [messageToSend, setMessageToSend] = useState('');
  const { address } = useAccount();
  const community: Community & { messages: Array<ChatMessages> } = {
    name: 'All for good',
    id: 1,
    slug: 'all-for-good-erd4',
    membersCount: 20,
    messages: [
      {
        id: '1',
        content: 'Hello there!',
        userAddress: '0x456****8bc45',
        fullname: 'John Doe',
        timestamp: 1700825400000,
      },
      {
        id: '2',
        content: "Hey, how's it going?",
        userAddress: '0x456****8bc45',
        fullname: 'Jane Smith',
        timestamp: 1700825400000,
      },
      {
        id: '3',
        content: "I'm doing well, thanks!",
        userAddress: '0x456****8bc45',
        fullname: 'John Doe',
        timestamp: 1700922600000,
      },
      {
        id: '4',
        content: 'What about you?',
        userAddress: '0x456****8bc45',
        fullname: 'Jane Smith',
        timestamp: 1700922601750,
      },
      {
        id: '5',
        content: 'Just relaxing at home.',
        userAddress: '0x456****8bc45',
        fullname: 'John Doe',
        timestamp: 1700922623000,
      },
      {
        id: '6',
        content: 'Nice! Anything exciting happening?',
        userAddress: '0x456****8bc45',
        fullname: 'Jane Smith',
        timestamp: 1700994295507,
      },
      {
        id: '7',
        content: 'Not much, just enjoying the day.',
        userAddress: '0x456****8bc45',
        fullname: 'John Doe',
        timestamp: 1700991000000,
      },
      {
        id: '8',
        content: 'Sounds nice! Have a great day!',
        userAddress: '0x456****8bc45',
        fullname: 'Jane Smith',
        timestamp: 1700991000000,
      },
    ],

    members: [{}],
    cover: '',
    description:
      'Join a movement that goes beyond personal well-being. In the "All for Good" nutrition community, we believe in the power of nutrition to create positive change. Share your journey towards a healthier you, engage in impactful discussions about sustainable eating, and explore how good nutrition can contribute to a better world. Every meal counts, and together, we\'re making choices that are "All for Good."',
  };
  const [chats, setChats] = useState<Array<ChatMessages>>(community?.messages);
  const randomID = () => Math.random().toString(32).substring(2);

  function handleInputKeyUp(evt: KeyboardEvent) {
    if (evt.key == 'Enter' && messageToSend !== '') {
      sendMessage();
    }
  }
  function sendMessage() {
    setChats((prev) => [
      ...prev,
      {
        timestamp: new Date().getTime(),
        content: messageToSend,
        userAddress: maskHexAddress(address as string),
        id: randomID(),
        fullname: 'Lucky Victory',
      },
    ]);
    setMessageToSend('');
  }
  return (
    <Box className='h-screen' minH={'620px'} bg={'secondaryColor.50'}>
      <Box bg={'white'} maxW={1250} mx={'auto'}>
        <Box h={'120px'} bg={'primaryColor.800'}></Box>
        <Flex gap={4}>
          <Box
            rounded={'full'}
            w={'80px'}
            h={'80px'}
            border={'2px'}
            borderColor={'white'}
            mt={'-6'}
            ml={6}
          >
            <Box
              as={community?.cover ? Avatar : BoringAvatars}
              variant='sunset'
              w={'full'}
              h={'full'}
              size={'auto'}
              {...{ src: community?.cover, alt: '' }}
            ></Box>
          </Box>
          <Flex>
            <Heading size={'md'} pt={1} fontSize={{ lg: '24px' }}>
              {community?.name}
            </Heading>
          </Flex>
        </Flex>
        <HStack alignItems={'start'} gap={6} my={6} px={6}>
          <Tabs flex={1} variant={'soft-rounded'} colorScheme='primaryColor'>
            <TabList>
              <Tab>
                <HStack spacing={3} alignItems={'center'}>
                  <MdChat />
                  <span>Chats</span>
                </HStack>
              </Tab>
              <Tab>
                <HStack spacing={3} alignItems={'center'}>
                  <MdEvent />
                  <span>Events</span>
                </HStack>
              </Tab>
              <Tab>
                <HStack spacing={3} alignItems={'center'}>
                  <MdViewAgenda />
                  <span>Challenges</span>
                </HStack>
              </Tab>
            </TabList>
            <TabPanels h={'full'} py={3}>
              <TabPanel pl={0} minH={'400px'} pos={'relative'}>
                <Box maxH={'350px'} overflowY={'auto'}>
                  <Stack
                    divider={<StackDivider />}
                    py={4}
                    px={2}
                    rounded={'md'}
                    // bg={'gray.100'}
                  >
                    {chats?.map((message, i) => (
                      <HStack
                        key={message?.id}
                        align={'flex-start'}
                        gap={3}
                        bg={'white'}
                        p={3}
                        rounded={'md'}
                      >
                        <Box as={BoringAvatars} variant='beam'></Box>

                        <Stack>
                          <HStack>
                            <Heading size={'sm'} color={'primaryColor.800'}>
                              {message?.userAddress || '0x456****8bc45'}{' '}
                            </Heading>
                            <Text
                              as={'span'}
                              color={'gray'}
                              fontSize={'sm'}
                              fontWeight={'medium'}
                            >
                              {formatChatTimestamp(message?.timestamp)}
                            </Text>
                          </HStack>

                          <Text>{message?.content}</Text>
                        </Stack>
                      </HStack>
                    ))}
                  </Stack>
                </Box>
                <HStack
                  pos={'sticky'}
                  bg={'white'}
                  py={3}
                  bottom={0}
                  w={'full'}
                  left={0}
                >
                  <Input
                    value={messageToSend}
                    onChange={(e) => setMessageToSend(e.target.value)}
                    colorScheme='primaryColor'
                    placeholder='Type a message...'
                    onKeyUp={handleInputKeyUp}
                  />
                  <Button
                    variant={'solid'}
                    onClick={() => sendMessage()}
                    // colorScheme='primaryColor'
                    // colorScheme='blue'
                    isDisabled={messageToSend === ''}
                  >
                    Send
                  </Button>
                </HStack>
              </TabPanel>
              <TabPanel>
                <Flex
                  minH={'200px'}
                  align={'center'}
                  justify={'center'}
                  bg={'gray.100'}
                  fontWeight={'bold'}
                  fontSize={'lg'}
                  color={'gray.500'}
                >
                  No Events Available
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex
                  minH={'200px'}
                  align={'center'}
                  justify={'center'}
                  bg={'gray.100'}
                  fontWeight={'bold'}
                  fontSize={'lg'}
                  color={'gray.500'}
                >
                  No Challenges Available
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Stack bg={'white'} maxW={'350px'} pb={6}>
            <Box
              borderBottom={'1px'}
              borderBottomColor={'gray.300'}
              py={3}
              px={5}
            >
              <Heading size={'md'} as={'h3'}>
                About {community?.name}
              </Heading>
              <Text fontSize={'sm'} mt={2}>
                {community?.description}
              </Text>
            </Box>
          </Stack>
        </HStack>
      </Box>
    </Box>
  );
}
