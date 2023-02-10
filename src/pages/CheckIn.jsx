import Layout from "components/Layout";
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Center, color, Divider, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import ListVehicle from "components/ListVehicle";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicle, selectAllVehicle } from "redux/features/vehicleSlice";
import { Field, Form, Formik } from "formik";
import { addCheckIn, selectAllCheck } from "redux/features/checkSlice";
import { FaBackspace } from "react-icons/fa";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Clock from 'react-live-clock';
import TableParking from "components/TableParking";
import { changeReset, fetchParking, selectAllParking } from "redux/features/parkingSlice";

const SelectVehicle = ({ vehicleData, field }) => {
    let content;
    if (vehicleData.status === "loading") {
        content = <Spinner />
    } else if (vehicleData.status === "succeeded") {
        content =
            <Select {...field} placeholder='Select Type' >
                {
                    vehicleData.data.result.map((data, idx) => (
                        <option key={idx} value={data.id}>{data.name}</option>
                    ))
                }
            </Select>
    } else if (vehicleData.status === "failed") {
        content = <Text>error while get data</Text>
    }
    return content;
}
const DetailDialog = ({ data }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(() => {
        onOpen();
    }, [onOpen]);
    console.log(data)
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Ticket Detail</ModalHeader>
                <ModalCloseButton />
                <ModalBody display="flex" flexDir="column" gap="2">
                    <Text>Check In      : {data.status === "succeeded" && data.type === "CheckIn" ? new Date(data.data.check_in).toLocaleString() : "-"} </Text>
                    <Text>Ticket        : {data.status === "succeeded" && data.type === "CheckIn" ? data.data.ticket : "-"} </Text>
                    <Text>Plate         : {data.status === "succeeded" && data.type === "CheckIn" ? data.data.plate : "-"} </Text>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default function CheckIn() {
    const vehicleData = useSelector(selectAllVehicle)
    const checkData = useSelector(selectAllCheck)
    const dispatch = useDispatch()
    const toast = useToast();


    useEffect(() => {
        if (vehicleData.status === 'idle') {
            dispatch(fetchVehicle())
        }
    }, [dispatch, vehicleData.status]);
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
            <VStack padding="4" gap="2">
                {checkData.status === "succeeded" ? <DetailDialog data={checkData} /> : <></>}
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
                            title: "Success",
                            status: "success",
                            position:"bottom-right",
                            duration: 9000,
                            isClosable: true,
                        }) : (checkData.status === "failed") ? toast({
                            title: checkData.message,
                            status: "error",
                            position:"bottom-right",
                            duration: 9000,
                            isClosable: true,
                        }) : <></>
                }
                <Box display="flex" w="full">
                    <Flex w="full" alignItems="center" justifyContent="space-between">
                        <Button onClick={() => window.location.href = "/"} leftIcon={<ArrowBackIcon />} variant='link' >Back Home</Button>
                        <Heading>Check In</Heading>
                        <Box></Box>
                    </Flex>
                </Box>
                <Grid flexDirection="row" gap="8" w="full" >
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
                                type: ""
                            }}
                            onSubmit={(val, act) => {
                                if (val.plate && val.type) {
                                    dispatch(addCheckIn({ plate: val.plate, type: parseInt(val.type) }))
                                    return;
                                }
                                act.setErrors({
                                    plate: (val.plate === null || val.plate === "") ? "Vehicle Plate is Required" : false,
                                    type: (val.type === null || val.type === "") ? "Transportation Type is Required" : false,
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
                                                    <Input {...field} type='text' placeholder="Input Plate Kendaraan" />
                                                    <FormErrorMessage>{form.errors.plate}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="type" >
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.type && form.touched.type}>
                                                    <FormLabel>Transportation Type</FormLabel>
                                                    <Center>
                                                        <SelectVehicle vehicleData={vehicleData} field={field} />
                                                    </Center>
                                                    <FormErrorMessage>{form.errors.type}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Button
                                            isLoading={(checkData.status === "loading") ? true : false}
                                            type="submit" colorScheme="twitter">Submit</Button>
                                    </VStack>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Grid>
            </VStack>
        </Layout>
    )
};
