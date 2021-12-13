import React from 'react';

import {
    TableRow,
    IconButton,
    Collapse,
    Box,
    Grid,
    Typography,
    GridList,
    GridListTile,
    GridListTileBar,
    FormControlLabel,
    Snackbar,
    Button,
    TableCell,
    Checkbox,
    CircularProgress
} from '@material-ui/core';

import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
    ZoomOutMapOutlined as ZoomOutMapOutlinedIcon,
    Close as CloseIcon,
    TrafficRounded,
} from '@material-ui/icons';


function RowTable({
   no, 
   order,
   btnIsActive,
   handleCheckedDisabled,
   checkedAgree,
}) {

    const [open, setOpen] = React.useState(false);

    const openRow = () => {
        setOpen(!open)
        handleCheckedDisabled()
    }

    return (
        <React.Fragment key={order.order_id}>
            <TableRow>
                <TableCell className="text-sm" align="left">
                   {no + 1}
                </TableCell>
                <TableCell className="text-sm" align="left">
                    {order.order_id}
                </TableCell>
                <TableCell className="text-sm" align="left">
                   {order.consignee_name}
                </TableCell>
                <TableCell className="text-sm" align="left">
                    {order.length}
                </TableCell>
                <TableCell className="text-sm" align="left">
                    {order.width}
                </TableCell>
                <TableCell className="text-sm" align="left">
                    {order.height}
                </TableCell>
                <TableCell className="text-sm" align="left">
                    {order.weight}
                </TableCell>
                <TableCell className="text-sm" align="left">
                    {order.payment_type}
                </TableCell>
                <TableCell className="text-sm" align="left">
                    {order.consignee_province}
                </TableCell>
                <TableCell className="text-sm" align="left" colSpan={12}>
                    <IconButton aria-label="expand row" size="small" onClick={() => openRow()}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableCell
                style={{paddingBottom : 0, paddingTop: 0, backgroundColor: '#F9F9F9'}}
                colSpan={11}
            >
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <Grid
                            container
                            spacing={2}
                            justify="center"
                            alignItems="center"
                        >
                            <Grid
                                item
                                xs={6}
                                sm={6}
                            >
                                <Typography
                                    align="center"
                                    style={{
                                        fontSize: 14,
                                        fontWeigth: 500
                                    }}
                                    className="font-bold text-lg"
                                >
                                    Consignee Details :
                                </Typography>
                                <div className="flex flex-col">
                                    <table border="0">
                                        <tbody>
                                            <tr>
                                                <td className="font-semibold text-sm">Order ID:</td>
                                                <td className="text-sm">{order.order_id}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">Name:</td>
                                                <td className="text-sm">{order.consignee_name}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">Number:</td>
                                                <td className="text-sm">{order.consignee_number}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">Address:</td>
                                                <td className="text-sm">{order.consignee_address}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">Postal:</td>
                                                <td className="text-sm">{order.consignee_postal}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">Country:</td>
                                                <td className="text-sm">{order.consignee_country}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">City:</td>
                                                <td className="text-sm">{order.consignee_city}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">State:</td>
                                                <td className="text-sm">{order.consignee_state}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">Province:</td>
                                                <td className="text-sm">{order.consignee_province}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">Email:</td>
                                                <td className="text-sm">{order.consignee_email}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sm={6}
                            >
                                <Typography
                                    align="center"
                                    style={{
                                        fontSize: 14,
                                        fontWeigth: 500,
                                        fontStyle: 'bold'
                                    }}
                                >
                                    Pickup Details :
                                </Typography>
                                <div className="flex flex-col">
                                    <table border="0">
                                        <tbody>
                                            <tr>
                                                <td className="font-semibold text-sm">User ID:</td>
                                                <td className="text-sm">{order.user_id}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">Contact Name:</td>
                                                <td className="text-sm">{order.pickup_contact_name}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">Contact Number:</td>
                                                <td className="text-sm">{order.pickup_contact_number}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">Address:</td>
                                                <td className="text-sm">{order.pickup_address}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">Postal:</td>
                                                <td className="text-sm">{order.pickup_postal}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">Country:</td>
                                                <td className="text-sm">{order.pickup_country}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">City:</td>
                                                <td className="text-sm">{order.pickup_city}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">State:</td>
                                                <td className="text-sm">{order.pickup_state}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold text-sm">Province:</td>
                                                <td className="text-sm">{order.pickup_province}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Collapse>
            </TableCell>
        </React.Fragment >
    );
}

export default RowTable;