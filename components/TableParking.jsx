import { Box, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import checkSlice, { selectAllCheck } from "redux/features/checkSlice";
import { changePage, fetchParking, selectAllParking } from "redux/features/parkingSlice";
const initColumn = [
    {
        name: 'Transportation',
        selector: row => row.vehicle.name,
        width: "12%"
    },
    {
        name: 'Plate',
        selector: row => row.plate.toUpperCase(),
        width: "15%"
    },
    {
        name: 'Ticket',
        selector: row => row.ticket,
    },
    {
        name: 'Check In',
        selector: row => new Date(row.check_in * 1000).toLocaleString(),
        width: "20%"
    },
    {
        name: 'Status',
        selector: row => row.parking_status.name,
        width: "12%"
    }
];

export default function TableParking() {
    const dataParking = useSelector(selectAllParking)
    const dispatch = useDispatch()
    const [perPage, setPerPage] = useState(10);
    const checkData = useSelector(selectAllCheck)

    useEffect(() => {
        dispatch(fetchParking({ page: 1, take: 10 }))
    }, []);

    const handlePerRowsChange = async (newPerPage, page) => {
        dispatch(fetchParking({ page: page, take: newPerPage }));
        setPerPage(newPerPage);
    };

    const handlePageChange = async page => {
        // await dispatch(changePage({ page: page }))
        // console.log(page + " page " + dataParking.current_page)
        dispatch(fetchParking({ page: page, take: perPage }))
    };
    console.log(checkData)
    console.log((checkData.status === "succeeded" && checkData.type !== "check") ? true : false)
    return (
        <Box>
            <DataTable
                responsive={false}
                fixedHeader
                fixedHeaderScrollHeight="60vh"
                title="Parking List"
                columns={initColumn}
                data={dataParking.data}
                progressPending={dataParking.status === "loading" ? true : false}
                pagination
                paginationServer
                paginationTotalRows={dataParking.total_data}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                progressComponent={<Box m="4"><Spinner /></Box>}
            />
        </Box>
    );
};
