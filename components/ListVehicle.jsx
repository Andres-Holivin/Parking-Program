import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";

export default function ListVehicle(params) {
    return (
        <TableContainer minH="full">
            <Table variant='simple'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead >
                    <Tr>
                        <Th>No</Th>
                        <Th>Transportation Type</Th>
                        <Th>Plate</Th>
                        <Th>Ticket</Th>
                        <Th>Time</Th>
                        <Th>Price</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                        <Td>feet</Td>
                        <Td>centimetres (cm)</Td>
                        <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td isNumeric>0.91444</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
};
