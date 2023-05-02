import React, { useEffect, useId, useState, useCallback } from 'react'
import axios from 'axios';
import { Box, Button, chakra, Divider, FormControl, HStack, Icon, SimpleGrid, Text, useBreakpointValue, useDisclosure, useToast } from '@chakra-ui/react'
import {IoMdAdd,IoMdAddCircle} from 'react-icons/io'
import { Select } from 'chakra-react-select'

import { ColorModeSwitcher } from '@source/theme';
import { FetchStatus, MovieProp } from '@source/constant';
import { api } from '@source/actions';
import { useAppDispatch, useAppSelector } from '@source/redux/hooks';
import { fetchGenres, fetchMovies, movieSelector } from '@source/redux/slices';
import { CreateMovie } from './CreateMovie';
import { Movie, MovieSkeleton } from '@source/components';

const AllMoviesScreen = () => {
	const [MoviesToDisplay, setMoviesToDisplay] = useState<Array<MovieProp>>([])
	const [MoviesToDelete, setMovieToDelete] = useState<any>({})
  const [filterTerms, setFilterTerms] = useState<Array<any>>([])

	const {
    movies,
    moviesStatus,
    moviesError,

    genres,
    genresError,
  } = useAppSelector( movieSelector )
	const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch( fetchMovies({}) )
    dispatch( fetchGenres() )
  }, [])

  const getSearchTerms = useCallback(() => {
    return filterTerms.map( term => term?.value)
  },[filterTerms])

  const parseSelectOptions = (genres: Array<any>) => genres?.map( genreName => ({
    ...genreName,
    label: genreName,
    value: genreName,
  }))

    const createBtnVariation = useBreakpointValue(
			{
				base: {
					leftIcon: undefined,
					children: <Icon w={8} h={8} as={IoMdAddCircle} />,
				},
				md: {
					leftIcon: <IoMdAdd />,
					children: 'Create',
				},
			},
    )

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { 
    isOpen: isAlertOpen, 
    onOpen: onAlertOpen, 
    onClose: onAlertClose,
  } = useDisclosure()
  const toast = useToast()

  useEffect(() => {
    if(!isAlertOpen) {
      setMovieToDelete(() => {})
    }
  },[isAlertOpen])

  return (
    <Box overflowX={'hidden'} textAlign="center" fontSize="xl">
			<HStack
        w={'100vw'}
        justifyContent={'space-between'}
        alignItems={'center'}
        p={3}
      >
        <Button
          w={{base: 8, md:'100px'}}
          // color={'white'}
          // margin={30}
          _hover={{
            bg: 'teal.500',
          }}
          colorScheme='teal'
          variant='solid'
          // fontSize={13}
          borderRadius={{base: '50%', md: 8}}
          alignSelf={'right'}
          leftIcon={createBtnVariation?.leftIcon}
          onClick={onOpen}
        >
          {createBtnVariation?.children}
        </Button>

        <HStack justifyContent={'space-between'} minW={{base: '40vh', md: 300}}>
          <FormControl>
            <Select
              name='genres'
              instanceId={useId()}
              autoFocus={false}
              placeholder={'Filter by genre'}
              colorScheme={'teal.500'}
              // closeMenuOnScroll
              isSearchable
              //isClearable
              isMulti
              value={filterTerms}
              options={parseSelectOptions(genres)}
              onChange={setFilterTerms as any}
              noOptionsMessage={() => 'No genres at the moment'}
              />
          </FormControl>

          <ColorModeSwitcher justifySelf="flex-end" />
        </HStack>
      </HStack>

      <Box mx={10}>
        <chakra.h2 my={5} fontSize={22} fontFamily={'body'}>Movie Catalog</chakra.h2>
        
        <CreateMovie
          isOpen={isOpen}
          onClose={onClose}
        />

        <SimpleGrid columns={{base: 1, md: 3}} spacingX='30px' spacingY='20px'>
          {
            moviesStatus === FetchStatus.IDLE ||
            moviesStatus === FetchStatus.PENDING ?
            <MovieSkeleton isLoaded={moviesStatus === FetchStatus.RESOLVED} /> :
            moviesStatus === FetchStatus.RESOLVED &&
            !!movies?.data?.length ?
            movies?.data?.map( (movie, index) => (
              <Movie
                key={index}
                index={index}
                isLoaded={moviesStatus === FetchStatus.RESOLVED}
                movie={movie}
                deleteMovie={() => {}}
              />
            )) :
            <Text>
              No movies in your catalog
            </Text>
          }
        </SimpleGrid>

      </Box>
		</Box>
  )
}

export {AllMoviesScreen}