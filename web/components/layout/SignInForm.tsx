import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { Field, Form, Formik, useFormik } from "formik";
import { useState } from "react";

export function SignInForm() {
    const toast = useToast()
    const { submitForm, values, handleChange } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: async (value) => {
            const response = await fetch(
                '/api/signin',
                {
                    method: 'POST',
                    body: JSON.stringify(value)
                }
            )

            if(response.status !== 200) {
                const data = await response.text()
                toast({
                    description: data,
                    status: "error",
                    isClosable: true,
                    variant: "left-accent",
                    position: "top-right",
                    title: "Erro"
                })
                return
            }

            const { token } = await response.json()

            localStorage.setItem('auth', token)
        }
    })

    const [showPassword, setShowPassword] = useState(false)

    

    return (
        <Flex 
            as={"form"} 
            flexDirection={"column"}
            gap={4}
            onSubmit={(e) => {
                e.preventDefault()
                submitForm()
            }}
            >
            <FormControl id="username">
                <FormLabel
                    color={"white"}
                >
                    Nome de Usuario
                </FormLabel>
                <Input
                    variant={"outline"} 
                    color={"white"}
                    value={values.username} 
                    name="username"
                    placeholder="Nome de Usuario"
                    onChange={handleChange} />
            </FormControl>
            <FormControl id="password">
                <FormLabel
                    color={"white"}
                >
                    Senha
                </FormLabel>
                <InputGroup>
                    <Input
                        variant={"outline"} 
                        color={"white"}
                        type={showPassword ? "text" : "password"}
                        value={values.password} 
                        name="password"
                        placeholder="Senha"
                        onChange={handleChange} />
                    <InputRightElement width='4.5rem'>
                        <Button
                            h='1.75rem'
                            size='sm'
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button 
                type="submit"
                marginTop={8}    
            >Login</Button>
        </Flex>
    )
}