import {
	Box,
	useColorModeValue,
	Heading,
	Text,
	Stack,
	Image,
	Button,
	Badge,
	Icon,
	CircularProgress,
	CircularProgressLabel,
	Skeleton,
} from '@chakra-ui/react';
import { MovieProp } from '@source/constant';
import { useRouter } from 'next/router';
import {BsStarFill} from 'react-icons/bs';
  
  const IMAGE =
	'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

interface MovieComponentProps {
	index: number
	isLoaded: boolean
	movie: MovieProp
}

const Movie = ({
	index,
	isLoaded,
	movie,
}: MovieComponentProps) => {
	const {push} = useRouter()

  return (
	<Skeleton isLoaded={isLoaded} fadeDuration={(index + 1) * 0.5}>
		<Box
			mt={10}
			role={'group'}
			p={6}
			maxW={'330px'}
			w={'full'}
			bg={useColorModeValue('white', 'gray.800')}
			boxShadow={'2xl'}
			rounded={'lg'}
			pos={'relative'}
			zIndex={1}
		>
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
					backgroundImage: `url(${IMAGE})`,
					filter: 'blur(15px)',
					zIndex: -1,
				}}
				_groupHover={{
					_after: {
						filter: 'blur(20px)',
					},
				}}>
				<Image
					rounded={'lg'}
					height={230}
					width={282}
					objectFit={'cover'}
					src={IMAGE}
					alt={movie?.title}
				/>
			</Box>
			<Stack pt={10} align={'center'}>
				<Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
					{movie?.title}
				</Heading>

				<Stack align={'center'} justify={'center'} direction={'row'} flexWrap={'wrap'} spacing={4} mt={6}>
					{
						movie?.genre.map( (genre, index) => (
							<Badge
								key={index}
								px={2}
								py={1}
								// eslint-disable-next-line react-hooks/rules-of-hooks
								bg={useColorModeValue('gray.50', 'gray.800')}
								rounded={8}
								cursor={'pointer'}
								fontWeight={'400'}>
								{genre}
							</Badge>
						))
					}
				</Stack>
				
				<Stack direction={'row'} align={'center'}>
					<CircularProgress
						value={movie?.rating * 10}
						color={movie?.rating >= 7 ? "gold" : "gray.300"}
						thickness={6}
						size="70px"
					>
						<CircularProgressLabel>
							<Text fontSize="xl" fontWeight="bold">
								{movie?.rating}
							</Text>
						</CircularProgressLabel>
					</CircularProgress>
				</Stack>
			</Stack>

			<Stack mt={8} direction={'row'} spacing={4}>
				<Button
					flex={1}
					fontSize={'sm'}
					rounded={'full'}
					bg={'red.400'}
					// color={'white'}
					boxShadow={
					'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
					}
					_hover={{
					bg: 'red.500',
					}}
					_focus={{
					bg: 'red.500',
					}}
					onClick={() => push(`/${movie?.id}`)}
				>
					Check it out
				</Button>
			</Stack>
		</Box>
	</Skeleton>
  )
}

export {Movie}