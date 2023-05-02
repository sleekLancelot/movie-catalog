import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { chakra, Box, Flex, Image, Text, Button, useColorModeValue, Skeleton, SkeletonText, Stack, CircularProgress, CircularProgressLabel, Badge, Center, Hide, Show, Icon } from "@chakra-ui/react";
import { MovieProp } from '@source/constant';
import { get_a_Movie } from '@source/actions';
import { ColorModeSwitcher } from '@source/theme';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

const MovieDetailsScreen = () => {
    const [movieDetail, setMovieDetail] = useState<MovieProp>()
    const [loading, setLoading] = useState(false)

    const { query: { movie_id }, push } = useRouter()

    const fetchMovie = async (id: number) => {
        setLoading(true)
        try {
            const response = await get_a_Movie(id)
            setMovieDetail(response?.data)

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }
    useEffect(() => {
        if (movie_id) {
            fetchMovie(Number(movie_id))            
        }
    }, [movie_id])

    const IMAGE =
	'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

    // const coverImage = (title: string) => `https://source.unsplash.com/random/900x700/?${title}`

  return (
    <Flex direction="column" overflow={'hidden'}>
      <Box
        display={'flex'}
        justifyContent="center"
        alignItems="center"
        flexDirection={{base:"column", md: 'row'}}
        minH="100vh"
        bg={useColorModeValue('white', 'gray.900')}
        bgImage={IMAGE}
        // backgroundSize={'60vh'}
        bgPos="contain"
        bgSize="cover"
        position={'relative'}
        _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 0,
            left: 0,
            zIndex: 5,
            background: useColorModeValue('linear-gradient(to top, rgb(245, 245, 245), rgba(0, 0, 0, 0))', 'linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))'),
        }}
      >
        <Box
          justifySelf="flex-start"
          zIndex={10}
          position={'absolute'}
          top={5}
          left={5}
          cursor={'pointer'}
          onClick={() => push('/')}
        >
          <Icon
            boxSize={6}
            as={MdOutlineKeyboardBackspace}
          />
        </Box>

        <ColorModeSwitcher justifySelf="flex-end" zIndex={10} position={'absolute'} top={5} right={5} />

        <Box w={{base: 200, md: '40%'}} mx={10} zIndex={10} position={'relative'} top={{base: 'initial', md: 30}}>
            <Skeleton isLoaded={!loading}>
                <Image
                    src={IMAGE}
                    borderRadius="lg"
                    boxShadow="md"
                    alt={movieDetail?.title}
                />
            </Skeleton>
        </Box>
        <Box w={{base: 200, md: '60%'}} mx={10} zIndex={10} position={'relative'} top={{base: 'initial', md: 30}}>
          <SkeletonText noOfLines={1} isLoaded={!loading}>
            <chakra.h2 fontWeight="bold" fontSize="4xl" mb={5}>
                {movieDetail?.title} {movieDetail?.year}
            </chakra.h2>
          </SkeletonText>

          <Stack direction={'row'} align={'center'} mb={4}>
            <CircularProgress
              value={movieDetail?.rating * 10}
              color={movieDetail?.rating >= 7 ? "gold" : "gray.300"}
              thickness={6}
              size="70px"
            >
              <CircularProgressLabel>
                <Text fontSize="xl" fontWeight="bold">
                  {movieDetail?.rating}
                </Text>
              </CircularProgressLabel>
            </CircularProgress>

            <Hide below='md'>
              <Stack align={'center'} justify={'center'} direction={'row'} flexWrap={'wrap'} spacing={4} mt={6} display={{base: 'hidden', md: 'flex'}}>
                {
                  movieDetail?.genre?.map( (genre: string, index: number) => (
                    <Badge
                      key={index}
                      px={3}
                      py={2}
                      colorScheme="yellow"
                      rounded={8}
                      cursor={'pointer'}
                      fontWeight={'400'}>
                      {genre}
                    </Badge>
                  ))
                }
              </Stack>
            </Hide>

			    </Stack>

          <SkeletonText noOfLines={3} isLoaded={!loading}>
            <Center fontSize={14} mb={5}>
              {movieDetail?.description}
            </Center>
          </SkeletonText>

          <Show below='md'>
            <Stack align={'center'} justify={'flex-start'} direction={'row'} flexWrap={'wrap'} spacing={4} mt={6}>
              {
                movieDetail?.genre?.map( (genre: string, index: number) => (
                  <Badge
                    key={index}
                    px={3}
                    py={2}
                    colorScheme="yellow"
                    rounded={8}
                    cursor={'pointer'}
                    fontWeight={'400'}>
                    {genre}
                  </Badge>
                ))
              }
            </Stack>
          </Show>

          <Button colorScheme="yellow" size="lg" mt={5}>
            Play
          </Button>
        </Box>
      </Box>
    </Flex>
  )
}

export {MovieDetailsScreen}