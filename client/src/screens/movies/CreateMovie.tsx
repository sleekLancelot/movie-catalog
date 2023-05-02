import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    useToast,
    Flex,
    Spacer,
    AspectRatio,
    FormHelperText,
		Textarea,
  } from '@chakra-ui/react'
import { CreatableSelect } from 'chakra-react-select'

import { MovieProp } from '@source/constant'
import { movieSelector, setMoviesData } from '@source/redux/slices'
import { useAppDispatch, useAppSelector } from '@source/redux/hooks'
import { createMovie } from '@source/actions'
  
interface CreateMovieProps {
    isOpen: boolean
    onClose: any
}

const CreateMovie = ({
	isOpen,
	onClose,
}: CreateMovieProps) => {
  const defaultValues = useMemo(() => ({
		title: '',
		rating: undefined as unknown as number,
		description: '',
		director: '',
		year: undefined as unknown as number,
		genre: [],
	}), [])

	const [movieDto, setMovieDto] = useState<Omit<MovieProp, 'id'>>(defaultValues)
	const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

	const initialRef = useRef(null)
	const finalRef = useRef(null)
	const toast = useToast()

	const {movies} = useAppSelector( movieSelector )
  const dispatch = useAppDispatch()

	const parseSelectOptions = (genres: Array<any>) => genres?.map( genreName => ({
    ...genreName,
    label: genreName,
    value: genreName,
  }))

	const onChange = (e: any) => {
		if (!!error) {
			setError('')
		}

		setMovieDto( movieData => ({
			...movieData,
			[e.target.name] : e.target.value,
		}))
	}

	const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await createMovie(movieDto);

      const moviesLeft  = response.data;
      dispatch(setMoviesData([moviesLeft, ...movies.data ]));
      setLoading(false)
      
      onClose()
      setMovieDto(defaultValues);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
	}

  return (
    <Modal
			initialFocusRef={initialRef}
			finalFocusRef={finalRef}
			size={'full'}
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add a movie</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
				<FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              ref={initialRef}
							name='title'
							type='text'
              placeholder="Enter title"
              value={movieDto.title}
              onChange={onChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Rating</FormLabel>
            <Input
              placeholder="Enter rating e.g 7.7"
							name='rating'
							type='number'
              step={0.1}
              minLength={1}
              maxLength={10}
              inputMode='numeric'
              value={movieDto.rating}
              onChange={e => setMovieDto((movieDto) => ({
                ...movieDto,
                [e.target.name]: parseFloat(e.target.value)
              }))}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Enter description"
							name='description'
              value={movieDto.description}
              onChange={onChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Director</FormLabel>
            <Input
              placeholder="Enter director"
							name='director'
							type='text'
              value={movieDto.director}
              onChange={onChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Year</FormLabel>
            <Input
              placeholder="Enter year e.g 1968"
							name='year'
							type='number'
              value={movieDto.year}
              onChange={e => setMovieDto((movieDto) => ({
                ...movieDto,
                [e.target.name]: Number(e.target.value)
              }))}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Genre</FormLabel>
            {/* <CreatableSelect
              isMulti
              options={parseSelectOptions(genres)}
							name='genre'
              value={movieDto.genre}
              onChange={(e: any) => setMovieDto((movieDto) => ({
                ...movieDto,
                genre: [...movieDto.genre, {
                  label: e[0]?.label,
                  value: e[0]?.value,
                } ]
              }))}
              isInvalid={!!genresError}
              noOptionsMessage={() => 'No genres at the moment'}
            /> */}

            <Input
              placeholder="Enter a comma separated list of genres like so: Drama,Comedy,Action e.t.c"
							name='genre'
							type='text'
              value={movieDto.genre?.join(',')}
              onChange={e => setMovieDto((movieDto) => ({
                ...movieDto,
                [e.target.name]: e.target.value.split(',')
              }))}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={loading}>
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
			</ModalContent>
  	</Modal>
  )
}

export {CreateMovie}