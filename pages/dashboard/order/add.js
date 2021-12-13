import React, {Component} from 'react';
import Router from 'next/router';
import Sidebar from '../../../components/sidebar';
import { addOrder } from '../../../services/apps/order';

import {parseCookies} from 'nookies';

import {
    CircularProgress,
    Snackbar,
    SnackbarContent
} from '@material-ui/core';

class Add extends Component  {
    static async getInitialProps(ctx) {
        const { jwt } = parseCookies(ctx)

        const redirectOnError = () =>
            typeof window !== "undefined"
                ? Router.push("/login")
                : ctx.res.writeHead(302, { Location: "/login" }).end();

        if (!jwt) {
            await redirectOnError();
            localStorage.removeItem('accessToken');
        }

        return { jwt }
    }
    constructor(props){
        super(props);
        this.state = {
            isLoadingBtn: false,
            error: null,
            isSnackbarShow: false,
            snackbarStatus: false,
            snackbarMessage: '',
        }
    }

    handleAddOrder = async(event) => {
        event.preventDefault();

        this.setState({isLoadingBtn: true, error: null});

        const {jwt} = this.props;

        let dataOrder = {
            consignee_name: event.target.consignee_name.value,
            consignee_number: event.target.consignee_number.value,
            consignee_address: event.target.consignee_address.value,
            consignee_postal: event.target.consignee_postal.value,
            consignee_country: event.target.consignee_country.value,
            consignee_city: event.target.consignee_city.value,
            consignee_state: event.target.consignee_state.value,
            consignee_province: event.target.consignee_province.value,
            consignee_email: event.target.consignee_email.value,
            length: event.target.length.value,
            width: event.target.width.value,
            height: event.target.height.value,
            weight: event.target.weight.value,
            payment_type: event.target.payment_type.value,
            pickup_contact_name: event.target.pickup_contact_name.value,
            pickup_contact_number: event.target.pickup_contact_number.value,
            pickup_address: event.target.pickup_address.value,
            pickup_postal: event.target.pickup_postal.value,
            pickup_country: event.target.pickup_country.value,
            pickup_city: event.target.pickup_city.value,
            pickup_state: event.target.pickup_state.value,
            pickup_province: event.target.pickup_province.value
        }
        
        const {data, status,statusText} = await addOrder(dataOrder, jwt);

        let isSnackbarShow, snackbarStatus = false

        const {snackbarMessage} = this.state;
        
        if(status !== 200){
            isSnackbarShow = true
            snackbarStatus = false
            snackbarMessage = statusText
        } else {
            isSnackbarShow = true,
            snackbarStatus = true,
            snackbarMessage = 'List Of Order Luwjistik Is Added'
        }

        this.setState({
            isSnackbarShow,
            snackbarStatus,
            snackbarMessage,
            isLoadingBtn: false
        })

        if(isSnackbarShow) {
            Router.push('/dashboard/order');
        }
    }

    handleCloseSnackbarKtp = () => {
        this.setState({
            isSnackbarShow: false,
        })
    }

    render() {
        const {isLoadingBtn, snackbarMessage, isSnackbarShow, snackbarStatus} = this.state;
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
                           <span className="text-redgray font-semibold font-medium">Add List Orders Luwjistik</span>
                           <div className="mt-6">
                            <form onSubmit={this.handleAddOrder}>
                                <div className="flex grid-cols-2 space-x-4">
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Consignee Name
                                    </span>
                                    <input type="text" id="consignee_name" name="consignee_name" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your name" required/>
                                    </label>
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Consignee Number
                                    </span>
                                    <input type="number" id="consignee_number" name="consignee_number" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your number" required/>
                                    </label>
                                </div>
                                <label class="block">
                                <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                    Consignee Address
                                </span>
                                <input type="text" id="consignee_address" name="consignee_address" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your address" required/>
                                </label>
                                <div className="flex grid-cols-3 space-x-4">
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Consignee Postal
                                    </span>
                                    <input type="number" id="consignee_postal" name="consignee_postal" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your postal code" required/>
                                    </label>
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Consignee Country
                                    </span>
                                    <input type="text" id="consignee_country" name="consignee_country" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your country name" required/>
                                    </label>
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Consignee City
                                    </span>
                                    <input type="text" id="consignee_city" name="consignee_city" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your city name" required/>
                                    </label>
                                </div>
                                <div className="flex grid-cols-3 space-x-4">
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Consignee State
                                    </span>
                                    <input type="text" id="consignee_state" name="consignee_state" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your state" required/>
                                    </label>
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Consignee Province
                                    </span>
                                    <input type="text" id="consignee_province" name="consignee_province" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your province" required/>
                                    </label>
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Consignee Email
                                    </span>
                                    <input type="email" id="consignee_email" name="consignee_email" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your email" required/>
                                    </label>
                                </div>
                                <div className="flex grid-cols-2 space-x-8">
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Length
                                    </span>
                                    <input type="number" id="length" name="length" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Lenght number" required/>
                                    </label>
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Width
                                    </span>
                                    <input type="number" id="width" name="width" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Width number" required/>
                                    </label>
                                </div>
                                <div className="flex grid-cols-2 space-x-8">
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Height
                                    </span>
                                    <input type="number" id="height" name="height" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Height number" required/>
                                    </label>
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Weight
                                    </span>
                                    <input type="number" id="weight" name="weight" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Weight number" required/>
                                    </label>
                                </div>
                                <label class="block">
                                <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                    Payment Type
                                </span>
                                <input type="text" id="payment_type" name="payment_type" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Payment type" required/>
                                </label>
                                <div className="flex grid-cols-2 space-x-4">
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Pickup Name
                                    </span>
                                    <input type="text" id="pickup_contact_name" name="pickup_contact_name" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your name" required/>
                                    </label>
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Pickup Number
                                    </span>
                                    <input type="number" id="pickup_contact_number" name="pickup_contact_number" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your number" required/>
                                    </label>
                                </div>
                                <label class="block">
                                <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                    Pickup Address
                                </span>
                                <input type="text" id="pickup_address" name="pickup_address" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your address" required/>
                                </label>
                                <div className="flex grid-cols-3 space-x-4">
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Pickup Postal
                                    </span>
                                    <input type="number" id="pickup_postal" name="pickup_postal" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your postal code" required/>
                                    </label>
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Pickup Country
                                    </span>
                                    <input type="text" id="pickup_country" name="pickup_country" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your country name" required/>
                                    </label>
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Pickup City
                                    </span>
                                    <input type="text" id="pickup_city" name="pickup_city" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your city name" required/>
                                    </label>
                                </div>
                                <div className="flex grid-cols-2 space-x-4">
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Pickup State
                                    </span>
                                    <input type="text" id="pickup_state" name="pickup_state" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your state" required/>
                                    </label>
                                    <label class="block">
                                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                        Pickup Province
                                    </span>
                                    <input type="text" id="pickup_province" name="pickup_province" class="mt-1 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Your province" required/>
                                    </label>
                                </div>
                                {
                                    isLoadingBtn ? (
                                        <CircularProgress />
                                    ) : (
                                        <button type='submit' className='px-4 py-2 mt-4 w-full font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700'>Submit</button>
                                    )
                                }
                            </form>
                            <Snackbar
                                        open={isSnackbarShow}
                                        autoHideDuration={2500}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right'
                                        }}
                                        onClose={() => this.handleCloseSnackbarKtp()}
                                        ContentProps={{
                                            'aria-describedby': 'message-id'
                                        }}
                                    >
                                        {snackbarStatus ? (
                                            <SnackbarContent
                                                style={{ backgroundColor: '#45B880' }}
                                                onClose={() => this.handleCloseSnackbarKtp()}
                                                message={snackbarMessage}
                                            >
                                            </SnackbarContent>
                                        ) : (
                                            <SnackbarContent
                                                style={{ backgroundColor: '#ED4740' }}
                                                onClose={() => this.handleCloseSnackbarKtp()}
                                                message={snackbarMessage}
                                            >
                                            </SnackbarContent>
                                        )}
                                    </Snackbar>
                            </div>
                      </div>
                   </main>
                </div>
            </div>
        )
    }
}

export default Add;