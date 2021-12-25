import { Button, Container, Divider, Flex, FormControl, FormErrorMessage, Input, Text, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useLoading } from "../../contexts/LoadingContext";
import { createTeamRequest } from "../../functions/requests/TeamRequests";
import { validateNewTeam } from "../../functions/validation/TeamValidator";

export function CreateTeamForm() {
    const { push } = useRouter()
    const toast = useToast()
    const { loading, startLoading, stopLoading } = useLoading()

    const { submitForm, values, handleChange, setFieldError, errors } = useFormik({
        initialValues: {
            name: '',
            adminUsername: '',
            adminPassword: '',
            adminRepeatPassword: ''
        },
        onSubmit: async (values) => {
            startLoading()

            if (values.adminPassword !== values.adminRepeatPassword) {
                setFieldError('adminPassword', "Senhas do administrador não coincidem")
                setFieldError('adminRepeatPassword', "Senhas do administrador não coincidem")
                stopLoading()
                return
            }

            const validationResult = validateNewTeam({
                name: values.name,
                admin: { username: values.adminUsername, password: values.adminPassword }
            })

            if(!validationResult.valid) {
                setFieldError(validationResult.error.field, validationResult.error.message)
                stopLoading()
                return
            }

            const result = await createTeamRequest(values.name, {
                username: values.adminUsername,
                password: values.adminPassword
            })

            stopLoading()

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
                description: "Time criado com sucesso!",
                status: "success",
                isClosable: true,
                variant: "left-accent",
                position: "top-right",
                title: "Criado"
            })
            push('/')
        }
    })




    return (
        <Container
            backgroundColor={"white"}
            borderRadius={10}
            padding={8}
            width={350}
        >
            <Flex 
                as="form"
                flexDirection={"column"}
                gap={4}
                onSubmit={(e) => {
                    e.preventDefault()
                    submitForm()
                }}
            >
                <Text
                    as="h2"
                    textAlign={"center"}
                    fontSize={"1.6em"}
                    fontWeight={"medium"}
                    color={"#283593"}
                    marginBottom={2}
                > 
                    Seu Time
                </Text>
                <FormControl id="name" isInvalid={!!errors.name}>
                    <Input
                        variant={"outline"} 
                        color={"#283593"}
                        value={values.name} 
                        name="name"
                        placeholder="Nome do Time"
                        onChange={handleChange}
                        disabled={loading} />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                
                <Divider 
                    colorScheme={"blue"}
                    margin={"4px 0 "}
                />
                
                <Text
                    as="h2"
                    textAlign={"center"}
                    fontSize={"1.6em"}
                    fontWeight={"medium"}
                    color={"#283593"}
                    marginBottom={2}
                > 
                    Seu Administrador
                </Text>
                <FormControl id="adminUsername" isInvalid={!!errors.adminUsername}>
                    <Input
                        variant={"outline"} 
                        color={"#283593"}
                        value={values.adminUsername} 
                        name="adminUsername"
                        placeholder="Nome do Administrador"
                        onChange={handleChange}
                        disabled={loading} />
                    <FormErrorMessage>{errors.adminUsername}</FormErrorMessage>
                </FormControl>
                <FormControl id="adminPassword" isInvalid={!!errors.adminPassword}>
                    <Input
                        variant={"outline"} 
                        color={"#283593"}
                        value={values.adminPassword} 
                        name="adminPassword"
                        type={"password"}
                        placeholder="Senha do Administrador"
                        onChange={handleChange}
                        disabled={loading} />
                    <FormErrorMessage>{errors.adminPassword}</FormErrorMessage>
                </FormControl>
                <FormControl id="adminRepeatPassword" isInvalid={!!errors.adminRepeatPassword}>
                    <Input
                        variant={"outline"} 
                        color={"#283593"}
                        value={values.adminRepeatPassword} 
                        name="adminRepeatPassword"
                        type={"password"}
                        placeholder="Repita a senha do Administrador"
                        onChange={handleChange}
                        disabled={loading} />
                    <FormErrorMessage>{errors.adminRepeatPassword}</FormErrorMessage>
                </FormControl>

                <Button variant={"outline"} type="submit" isLoading={loading}> CRIAR O TIME </Button>
            </Flex>
        </Container>
    )
}