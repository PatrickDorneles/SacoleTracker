import { Button, Container, Divider, Flex, FormControl, Input, Text, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import { createTeamRequest } from "../../functions/requests/TeamRequests";

export function CreateTeamForm() {
    const { push } = useRouter()
    const toast = useToast()
    const { submitForm, values, handleChange } = useFormik({
        initialValues: {
            name: '',
            adminUsername: '',
            adminPassword: '',
            adminRepeatPassword: ''
        },
        onSubmit: async (values) => {
            const result = await createTeamRequest(values.name, {
                username: values.adminUsername,
                password: values.adminPassword
            })

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
            width={400}
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
                <FormControl id="name">
                    <Input
                        variant={"outline"} 
                        color={"#283593"}
                        value={values.name} 
                        name="name"
                        placeholder="Nome do Time"
                        onChange={handleChange} />
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
                <FormControl id="adminUsername">
                    <Input
                        variant={"outline"} 
                        color={"#283593"}
                        value={values.adminUsername} 
                        name="adminUsername"
                        placeholder="Nome do Administrador"
                        onChange={handleChange} />
                </FormControl>
                <FormControl id="adminPassword">
                    <Input
                        variant={"outline"} 
                        color={"#283593"}
                        value={values.adminPassword} 
                        name="adminPassword"
                        type={"password"}
                        placeholder="Senha do Administrador"
                        onChange={handleChange} />
                </FormControl>
                <FormControl id="adminRepeatPassword">
                    <Input
                        variant={"outline"} 
                        color={"#283593"}
                        value={values.adminRepeatPassword} 
                        name="adminRepeatPassword"
                        type={"password"}
                        placeholder="Repita a senha do Administrador"
                        onChange={handleChange} />
                </FormControl>

                <Button type="submit"> CRIAR O TIME </Button>

            </Flex>
        </Container>
    )
}