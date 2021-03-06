import { Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";

import { useLoading } from "../../contexts/LoadingContext";
import { useUser } from "../../contexts/UserContext";

export function SignInForm() {
    const toast = useToast()
    const { login } = useUser()
    const { loading } = useLoading()

    const { submitForm, values, handleChange } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: async (value) => {
            const result = await login(value.username, value.password)

            if(!result.success) {
                toast({
                    description: result?.error,
                    status: "error",
                    isClosable: true,
                    variant: "left-accent",
                    position: "top-right",
                    title: "Erro"
                })
                return
            }

            toast({
                description: "Login feito com sucesso",
                status: "success",
                isClosable: true,
                variant: "left-accent",
                position: "top-right",
                title: "Sucesso"
            })
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
                <Input
                    variant={"outline"} 
                    color={"white"}
                    value={values.username} 
                    name="username"
                    placeholder="Nome de Usuario"
                    onChange={handleChange}
                    disabled={loading} />
            </FormControl>
            <FormControl id="password">
                <InputGroup>
                    <Input
                        variant={"outline"} 
                        color={"white"}
                        type={showPassword ? "text" : "password"}
                        value={values.password} 
                        name="password"
                        placeholder="Senha"
                        onChange={handleChange}
                        disabled={loading} />
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
            >LOGIN</Button>
        </Flex>
    )
}