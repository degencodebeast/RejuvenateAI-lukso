'use client';

import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  Radio,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import DashBoardLayout from '../layout';
import { useState } from 'react';
import { convertCamelCaseToSpaceSeparated } from '@/helpers/prompt';

export default function DashBoard() {
  const [basicInfo, setBasicInfo] = useState({
    firstName: '',
    lastName: '',
  });
  return (
    <DashBoardLayout>
      <Flex direction={'column'} className='flex-1 px-4 py-2'>
        <Heading size={'lg'}>Account Setting</Heading>
        <Box bg={'white'} flex={1} className='' my={4}>
          <Box mt={4} px={4}>
            <Tabs variant={'solid-rounded'}>
              <TabList borderBottom={'2px'} pb={2} borderColor={'gray.200'}>
                <Tab rounded={'md'} _selected={{ color: 'black', bg: 'beige' }}>
                  Basic Info
                </Tab>
                <Tab rounded={'md'} _selected={{ color: 'black', bg: 'beige' }}>
                  Profile Setting
                </Tab>
                <Tab rounded={'md'} _selected={{ color: 'black', bg: 'beige' }}>
                  Misc
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Box as={'form'} maxW={700} mt={6}>
                    {Object.keys(basicInfo).map((key, i) => (
                      <Stack mb={4} key={key}>
                        <label htmlFor={'basic' + key}>
                          {convertCamelCaseToSpaceSeparated(key)}
                        </label>
                        <Input
                          h={'12'}
                          id={'basic' + key}
                          value={basicInfo[key as keyof typeof basicInfo]}
                          placeholder={convertCamelCaseToSpaceSeparated(key)}
                        />
                      </Stack>
                    ))}

                    <Button
                      bg={'#014421'}
                      border={'2px'}
                      borderColor={'transparent'}
                      _hover={{
                        color: 'black',
                        bg: 'beige',
                        borderColor: '#014421',
                      }}
                      color={'white'}
                    >
                      Update Info
                    </Button>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <Box maxW={700}>
                    <HStack spacing={4}>
                      <Switch isChecked />
                      <Text fontWeight={'medium'}>
                        Show profile in community?
                      </Text>
                    </HStack>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Flex>
    </DashBoardLayout>
  );
}
