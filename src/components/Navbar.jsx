import { Box, Button, Flex, Heading, Image, Text, useDisclosure } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import AddBook from './AddBook'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box p={"10px"} bg={'blue.100'} boxShadow={"rgba(0, 0, 0, 0.2) 0px 4px 12px"}>
            <Flex justifyContent={"space-between"} alignItems={"center"} padding={"0 15px"} maxW={"1280px"} m={"auto"}>
                <Flex gap={"15px"} justifyContent={"center"} alignItems={"center"}>
                    <Image src='https://cdn.iconscout.com/icon/free/png-256/free-books-2923907-2446112.png?f=webp' width={"50px"} />
                    <Link to={"/"}><Heading>Book Store</Heading></Link>
                    <AddBook isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                </Flex>

                {
                    user.isAuth ?
                        <Flex gap={"15px"} justifyContent={"center"} alignItems={"center"}>
                            <Text fontSize={"1.5rem"} fontWeight={"500"}>{user.name}</Text>
                            {
                                user.role && user.role.includes("CREATER") ? <Button as='span' onClick={onOpen} colorScheme='linkedin'>Add Book</Button> : ""
                            }
                            <Button onClick={() => logout()} colorScheme='blackAlpha'>Logout</Button>
                        </Flex>
                        : <Flex gap={"15px"}>
                            <Link to={"/login"} ><Button colorScheme='blackAlpha'>Login</Button></Link>
                            <Link to={"/signup"}><Button colorScheme='blackAlpha'>Sign up</Button></Link>
                        </Flex>
                }
            </Flex>
        </Box>
    )
}

export default Navbar