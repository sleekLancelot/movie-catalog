import React, { useEffect, useId, useState } from 'react'
import axios from 'axios';
import { Box, Button, chakra, Divider, FormControl, HStack, Icon, SimpleGrid, useBreakpointValue, useDisclosure, useToast } from '@chakra-ui/react'
import {IoMdAdd,IoMdAddCircle} from 'react-icons/io'
import { Select } from 'chakra-react-select'

import { ColorModeSwitcher } from '@source/theme';
import { MovieProp } from '@source/constant';
import { api } from '@source/actions';
import { useAppDispatch, useAppSelector } from '@source/redux/hooks';
import { fetchGenres, fetchMovies, movieSelector } from '@source/redux/slices';

const AllMoviesScreen = () => {
	const [MoviesToDisplay, setMoviesToDisplay] = useState<Array<MovieProp>>([])
  const [filterTerms, setFilterTerms] = useState<Array<string>>([])

	const {
    movies,
    genres,
  } = useAppSelector( movieSelector )
	const dispatch = useAppDispatch()

    useEffect(() => {
			dispatch( fetchMovies() )
			dispatch( fetchGenres() )
    }, [])

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

  return (
    <Box overflowX={'hidden'}>
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
          onClick={() => {
          }}
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
              options={[]}
              onChange={setFilterTerms as any}
              noOptionsMessage={() => 'No genres at the moment'}
              />
          </FormControl>

          <ColorModeSwitcher justifySelf="flex-end" />
        </HStack>
      </HStack>

		</Box>
  )
}

export {AllMoviesScreen}