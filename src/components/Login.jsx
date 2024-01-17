import { Box, Button, Center, Flex, Grid, Heading, Input, Text, flexbox } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../../configs'
import { AuthContext } from '../context/AuthContext'
import { useToast } from '@chakra-ui/react'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const { user, login: Login } = useContext(AuthContext)

    const toast = useToast()
    const login = async (url, obj) => {
        try {
            const res = await axios.post(url + "/api/login", obj, {
                withCredentials: true
            })

            Login(res.data.userData)
            toast({
                position: 'top',
                title: res.data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
            })
            navigate("/")
        } catch (error) {
            if (error.response?.data) {
                toast({
                    position: 'top',
                    title: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            }
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        login(serverUrl, { email, password })
    }
    return (

        <Flex justifyContent={"center"} alignItems={"center"} h={"90vh"}>
            <Grid gridTemplateColumns={"1fr 1fr"} maxW={"1200px"} margin={"auto"} boxShadow={"rgba(0, 0, 0, 0.24) 0px 0px 10px"} borderRadius={"10px"}>
                <Box>
                    <img src="https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-photographs-of-unmanned-bookstores-in-the-library-image_785535.jpg" alt="" width={"90%"} />
                </Box>
                <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDir={"column"}
                >
                    <Heading fontSize={"2rem"} p={3} textAlign={"center"} color={"blackAlpha.700"}>Login Page</Heading>

                    <Flex flexDir={"column"} gap={"10px"} padding={5} w={"100%"} >
                        <form onSubmit={handleLogin}>
                            <Flex flexDir={"column"} gap={"10px"} padding={5} w={"100%"} >
                                <Input placeholder='Email' size='md' type='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Input placeholder='Password' size='md' type='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Text color={"gray.600"} pl={1}>Forget Password?</Text>
                                <Button type='submit'>Login</Button>
                                <Text color={"gray.600"} pl={1}>Not a Member? <b color={"gray.900"}
                                    fontWeight={500} display={"inline"} onClick={() => navigate("/signup")} _hover={{ color: "red.400", cursor: "pointer" }}>Signup Now</b></Text>
                            </Flex>
                        </form>
                    </Flex>
                </Flex>
            </Grid>
        </Flex>
    )
}

export default Login