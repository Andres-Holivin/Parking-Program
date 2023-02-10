import Layout from "components/Layout";
import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Grid, Heading, Input, Select, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import ListVehicle from "components/ListVehicle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkTicket, payCheckOut, selectAllCheck } from "redux/features/checkSlice";
import { Field, Form, Formik } from "formik";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Clock from 'react-live-clock';
import TableParking from "components/TableParking";
import { fetchParking } from "redux/features/parkingSlice";

export default function CheckOut() {
    const checkData = useSelector(selectAllCheck)
    const dispatch = useDispatch()
    const toast = useToast();
    useEffect(() => {

    });
    function changeParking() {
        if (checkData.status === "succeeded" && checkData.type !== "check") {
            {
                dispatch(fetchParking({ page: 1, take: 10 }))
                // dispatch(changeReset())
            }
        }
    }
    changeParking();
    return (
        <Layout>
            <VStack padding="4" gap="2" >
                {
                    checkData.status === "loading"
                        ? toast({
                            title: "Loading",
                            position:"bottom-right",
                            render: () => {
                                <Spinner />
                            }
                        }) :
                        (checkData.status === "succeeded") ? toast({
                            title: checkData.message||"Success",
                            position:"bottom-right",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        }) : (checkData.status === "failed") ? toast({
                            title: checkData.message||"Error",
                            position:"bottom-right",
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
                <Grid flexDirection="row" gap="8" w="full">
                    <TableParking />
                    <Box display="flex" justifyContent="center" flexDir="column" bg="ButtonFace" paddingX="56" paddingY="6" shadow="md" rounded="md" >
                        <Center>
                            <Clock
                                noSsr={true}
                                format={'dddd, MMMM Do YYYY, HH:mm:ss'}
                                ticking={true}
                                timezone={'Asia/Jakarta'} />
                        </Center>
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
                                            console.log(checkData)
                                            if (!checkData.data ||checkData.data.length===0) {
                                                toast({
                                                    position:"bottom-right",
                                                    title: "No Data",
                                                    status: "error",
                                                    duration: 9000,
                                                    isClosable: true,
                                                })
                                                return
                                            }else
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
