import React from 'react'
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';

const MovieSkeleton = ({
    isLoaded,
}: {
    isLoaded: boolean
}) => {
  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `grey`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
            <Skeleton
                isLoaded={isLoaded}
                height='100%'
            >
                <Box
                    rounded={'lg'}
                    height={230}
                    width={282}
                    objectFit={'cover'}
                ></Box>
            </Skeleton>
        </Box>
        <Stack pt={10} align={'center'}>
            <SkeletonText noOfLines={1} isLoaded={isLoaded} height='10px'>
                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                </Text>                
            </SkeletonText>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <SkeletonText noOfLines={1} isLoaded={isLoaded} height='10px'>
                <Text fontWeight={800} fontSize={'xl'}>
                </Text>
            </SkeletonText>
            <SkeletonText noOfLines={1} isLoaded={isLoaded} height='10px'>
                <Text textDecoration={'line-through'} color={'gray.600'}>
                </Text>
            </SkeletonText>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}

export {MovieSkeleton}