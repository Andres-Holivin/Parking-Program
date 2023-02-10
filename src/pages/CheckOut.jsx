import Layout from "components/Layout";
import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Grid, Heading, Input, Select, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import ListVehicle from "components/ListVehicle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkTicket, payCheckOut, selectAllCheck } from "redux/features/checkSlice";
import { Field, Form, Formik } from "formik";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Clock from 'react-live-clock';

export default function CheckOut() {
    const checkData = useSelector(selectAllCheck)
    const dispatch = useDispatch()
    const toast = useToast();
    useEffect(() => {

    });
    return (
        <Layout>
            <VStack padding="4" gap="2" >
                {
                    checkData.status === "loading"
                        ? toast({
                            title: "Loading",
                            render: () => {
                                <Spinner />
                            }
                        }) :
                        (checkData.status === "succeeded") ? toast({
                            title: checkData.message,
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        }) : (checkData.status === "failed") ? toast({
                            title: checkData.message,
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                        }) : <></>
                }
                <Box display="flex" w="full">
                    <Flex w="full" alignItems="center" justifyContent="space-between">
                        <Button onClick={() => window.location.href = "/"} leftIcon={<ArrowBackIcon />} variant='link' >Back Home</Button>
                        <Heading textAlign="center" >Check Out</Heading>
                        <Box></Box>
                    </Flex>
                </Box>
                <Grid templateColumns="6fr 4fr" flexDirection="row" gap="8" >
                    <Box overflow="scroll">
                        <ListVehicle />
                    </Box>
                    <Box>
                        <Clock
                            noSsr={true}
                            format={'dddd, MMMM Do YYYY, HH:mm:ss'}
                            ticking={true}
                            timezone={'Asia/Jakarta'} />
                        <Box m="4"></Box>
                        <Formik
                            initialValues={{
                                plate: "",
                                ticket: ""
                            }}
                            onSubmit={(val, act) => {
                                if (val.plate && val.ticket) {
                                    dispatch(checkTicket({ plate: val.plate, ticket: val.ticket }))
                                    return;
                                }
                                if (checkData.status === "succeeded" || checkData.status === "failed") {
                                    act.setSubmitting(false)
                                }
                                act.setErrors({
                                    plate: (val.plate === null || val.plate === "") ? "Vehicle Plate is Required" : false,
                                    ticket: (val.ticket === null || val.ticket === "") ? "Ticket Number is Required" : false,
                                })

                            }}
                        >
                            {(props) => (
                                <Form >
                                    <VStack gap="4" >
                                        <Field name="plate" >
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.plate && form.touched.plate}>
                                                    <FormLabel>Vehicle Plate</FormLabel>
                                                    <Input {...field} type='text' placeholder="Input Vehicle Plate" />
                                                    <FormErrorMessage>{form.errors.plate}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="ticket" >
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.ticket && form.touched.ticket}>
                                                    <FormLabel>Ticket</FormLabel>
                                                    <Input {...field} type='text' placeholder="Input Ticket" />
                                                    <FormErrorMessage>{form.errors.ticket}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Button
                                            isLoading={(checkData.status === "loading") ? true : false}
                                            type="submit" colorScheme="yellow">Check</Button>
                                    </VStack>
                                </Form>
                            )}
                        </Formik>
                        <VStack gap="4">
                            <Flex flexDir="column" w="full" gap="2">
                                <Text>Check In  : {checkData.status === "succeeded" && checkData.type !== "pay" ? new Date(checkData.data.check_in * 1000).toLocaleString() : "-"} </Text>
                                <Text>Check Out : {checkData.status === "succeeded" && checkData.type !== "pay" ? new Date(checkData.data.check_out * 1000).toLocaleString() : "-"} </Text>
                                <Text>Duration  : {checkData.status === "succeeded" && checkData.type !== "pay" ? checkData.data.duration : "-"} </Text>
                                <Text>Ticket    : {checkData.status === "succeeded" && checkData.type !== "pay" ? checkData.data.ticket : "-"} </Text>
                                <Text>Type      : {checkData.status === "succeeded" && checkData.type !== "pay" ? checkData.data.vehicle.name : "-"} </Text>
                                <Text>Price     : {checkData.status === "succeeded" && checkData.type !== "pay" ? checkData.data.price : "-"} </Text>
                                <Box textAlign="center">
                                    <Button
                                        isLoading={checkData.status === 'loading' ? true : false}
                                        w="52" colorScheme="twitter"
                                        onClick={() => {
                                            dispatch(payCheckOut({ id: checkData.data.id, check_out: checkData.data.check_out }))
                                        }}>Pay</Button>
                                </Box>
                            </Flex>
                        </VStack>
                    </Box>
                </Grid>
            </VStack>
        </Layout>
    )
};
