import React, { Component } from 'react';
import Router from 'next/router';
import ActiveLink from "./ActiveLink";
import {
    DescriptionOutlined
} from '@material-ui/icons';

import { destroyCookie } from 'nookies';

class Sidebar extends Component {

    handleLogout = async(event) => {
        event.preventdefault;

        await destroyCookie(null, 'jwt');

        localStorage.removeItem('accessToken');
        Router.push('/login');
    }

    render() {
        return (
            <div>
                <aside
                    className="relative h-screen sm:block shadow-xl text-redgray"
                    style={{
                        minWidth: "230px",
                    }}
                >
                    <div className="flex flex-col text-center py-3">
                        <img style={{height: 100}}className="mx-auto w-full" src="/luwjistik.jpg" />
                    </div>
                    <nav className="text-base">
                        <ActiveLink
                            Link
                            as="/dashboard/order"
                            href="/dashboard/order"
                        >
                            <a className="flex items-center py-3 pl-5">
                                <DescriptionOutlined className="mr-3" style={{ fontSize: 27 }} />
                                    Order
                            </a>
                        </ActiveLink>
                            <button onClick={this.handleLogout} className="focus:outline-none w-full rounded-test text-putih bg-redgray h-10 mt-10 flex justify-center items-center">
                                    LOG OUT
                            </button>
                    </nav>
                </aside>
            </div>
        );
    }
}

export default Sidebar;