import React, {Component} from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// cookies
import {parseCookies} from 'nookies';
import Sidebar from '../../../components/sidebar';

import {
    Skeleton
} from '@material-ui/lab'

import {
    Grid,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Button
} from '@material-ui/core';
import RowTable from '../../../components/RowTable';
import { getorderDetails } from '../../../services/apps/order';

// services


const ErrorPortlet = dynamic(
    () => import('../../../components/ErrorPortlet')
)

class Order extends Component {
    static async getInitialProps(ctx) {
        const {jwt} = parseCookies(ctx)

        const redirectOnError = () => {
            typeof window !== "undefined"
                ? Router.push("/login")
                : ctx.res.writeHead(302, {Location: "/login"}).end();
        }

        if(!jwt) {
            await redirectOnError();
            localStorage.removeItem('accessToken');
        }

        return {jwt}
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            listOrder: {},
            error: null,
            totalListOrder: 0,
            btnIsActive: false,
            checkedAgree: false
        }
    }

    async getListDataOrder() {
        try {
            this.setState({isLoading: true, error:null, errorDialog: null})

            let {data, status, statusText} = await getorderDetails();

            if(status !== 200) {
                this.setState({
                    isLoading: false,
                    error: statusText
                })
            } else {
                const listOrder = data.data;

                if(listOrder !== undefined) {
                    this.setState({
                        totalListOrder: data.data.length
                    })
                } else {
                    this.setState({
                        totalListOrder: 0
                    })
                }

                this.setState({
                    isLoading: false,
                    listOrder
                })
            }
        } catch(error) {
            this.setState({
                isLoading: false,
                error
            })
        }
    }

    handleCheckedDisabled = () => {
        this.setState({
            btnIsActive: false,
            checkedAgree: false
        })
    }

    handleAddOrder = () => {
        Router.push('/dashboard/order/add');
    }

    componentDidMount() {
        if(!localStorage.getItem('accessToken')) Router.push('/login');
        this.getListDataOrder();
    }

    renderDataListOrder() {
        const {
            isLoading, 
            listOrder,
            error,
            totalListOrder,
            btnIsActive,
            checkedAgree
        } = this.state;

        var skeletons = [];

        for(var i = 0; i < 18; i++) {
            skeletons.push(
                <Grid item xs={2}>
                    <Skeleton variant="body1" animation="wave" />
                </Grid>
            )
        }

        if(isLoading) {
            return(
                <React.Fragment>
                    <Skeleton className="mb-4 mt-4" variant="body1" width={100} animation="wave" />
                    <Grid container spacing={2}>
                        {skeletons}
                    </Grid>
                </React.Fragment>
            )
        }

        if(error || totalListOrder === 0) {
            return(
                <ErrorPortlet error={error} rowCount={totalListOrder} />
            )
        }

        return(
            <React.Fragment>
                <Table size="medium" className="mt-4 w-full flex flex-nowrap" aria-label="collapsible table">
                    <TableHead>
                        <TableRow className="bg-white items-center">
                            <TableCell className="text-base font-bold" style={{borderBottom: "unset"}} align="left">No</TableCell>
                            <TableCell className="text-base font-bold" style={{borderBottom: "unset"}} align="left">Order Id</TableCell>
                            <TableCell className="text-base font-bold" style={{borderBottom: "unset"}} align="left">Consignee Name</TableCell>
                            <TableCell className="text-base font-bold" style={{borderBottom: "unset"}} align="left">Length</TableCell>
                            <TableCell className="text-base font-bold" style={{borderBottom: "unset"}} align="left">Width</TableCell>
                            <TableCell className="text-base font-bold" style={{borderBottom: "unset"}} align="left">Height</TableCell>
                            <TableCell className="text-base font-bold" style={{borderBottom: "unset"}} align="left">Weight</TableCell>
                            <TableCell className="text-base font-bold" style={{borderBottom: "unset"}} align="left">Payment Type</TableCell>
                            <TableCell className="text-base font-bold" style={{borderBottom: "unset"}} align="left">Pickup Contact Name</TableCell>
                            <TableCell className="text-base font-bold" style={{borderBottom: "unset"}} align="left">Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            listOrder.map((listOrder, index) => (
                                <RowTable
                                    key={listOrder.order_id}
                                    order={listOrder}
                                    no={index}
                                    handleCheckedDisabled={() => this.handleCheckedDisabled()}
                                    btnIsActive={btnIsActive}
                                    checkedAgree={checkedAgree}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </React.Fragment>
        )
    }
    render() {
        return(
            <div className="flex">
                <Sidebar />
                <div className="w-full h-screen overflow-x-hidden flex flex-col">
                    <main className="w-full p-6">
                        <div
                                style={{
                                    boxShadow: " 2px 4px 12px rgba(51, 51, 51, 0.1)",
                                    borderRadius: "6px",
                                }}
                                className="w-full my-4 bg-white p-4"
                        >
                                <span className="text-redgray font-semibold font-medium">List Of Orders Luwjistik</span>
                                <div className="flex flex-row mt-4">
                                    {/* <button>
                                        Add Order
                                    </button> */}
                                    <Link
                                        href="/dashboard/order/add"
                                    >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        style={{
                                            width: 142,
                                            height: 40
                                        }}
                                    >
                                        <span>Add Order</span>
                                    </Button>
                                    </Link>
                                </div>
                                <div className="mt-6">
                                    {this.renderDataListOrder()}
                                </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
};

export default Order;