import {Component} from 'react';
import Router from 'next/router';

// component MUI
import {
    Grid,
    Typography,
    TextField,
    Snackbar,
    SnackbarContent,
    CircularProgress
} from "@material-ui/core";

// externals
import validate from 'validate.js';
import _ from 'underscore';
import md5 from 'md5';

// icon MUI
import {
    VisibilityOutlined,
    VisibilityOffOutlined
} from '@material-ui/icons';
import { InputAdornment, IconButton } from '@material-ui/core';

import schema from '../../helpers/schema';

// jwt
import jwt from 'jsonwebtoken';

// cookies
import {setCookie, parseCookie} from 'nookies';

// services
import { SignInData } from '../../services/apps/auth/login';
import asyncLocalStorage from '../../utils/asyncLocalStorage';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values : {
                username : '',
                password : ''
            },
            touched: {
                username : '',
                password : false
            },
            errors : {
                username : null,
                password : null
            },
            isValid: false,
            isLoading: false,
            submitError: null,
            showPassword: false,
            setOpenSnackbarLogin: false,
            snackbarMessage : '',
            snackbarStatus : false
        }
    }

    handleShowPassword = () => {
        const {values, showPassword} = this.state;

        this.setState({
            ...values, showPassword: !showPassword
        })
    }

    validateForm = _.debounce(() => {
        const {values} = this.state;

        const newState = {...this.state};
        const errors = validate(values, schema);

        newState.errors = errors || {};
        newState.isValid = errors ? false : true;

        this.setState(newState);
    }, 300);

    handleFieldChange = (field, value) => {
        const newState = {...this.state};

        newState.submitError = null;
        newState.touched[field] = true;
        newState.values[field] = value;

        this.setState(newState, this.validateForm);
    }

    handleSignIn = async(event, field, value) => {
        event.preventDefault();

        const {values} = this.state;

        if(values.username == "" || values.password == ""){
            const newState = {...this.state};

            newState.submitError = null;
            newState.touched[field] = true;
            newState.values[field] = value;

            this.setState(newState, this.validateForm);
        } else {
            this.setState({isLoading: true});

            var hashMyPassword = md5(values.password);

            const {data, status, statusText} = await SignInData(values.username, hashMyPassword);

            let setOpenSnackbarLogin, snackbarStatus = false
            if(status != 200) {
                setOpenSnackbarLogin = true
                snackbarStatus = false
                var snackbarMessage = statusText

                values.username = ''
                values.password = ''
                this.setState({isValid: false})
            } else {
                setOpenSnackbarLogin = true

                const {session} = data.data

                // console.log(session);

                if(data.status = 200) {
                    await asyncLocalStorage.setItem('accessToken', session);

                    setCookie(null, 'jwt', session, {
                        maxAge: 10 * 60,
                        path: '/',
                    })

                    snackbarMessage = 'Login Success';
                    snackbarStatus = true
                    Router.push('/dashboard');
                }
            }
            this.setState({
                setOpenSnackbarLogin,
                snackbarMessage,
                snackbarStatus,
                isLoading: false,
                values
            })
        }
    }

    handleCloseSnackbar = () => {
        this.setState({setOpenSnackbarLogin : false})
    }

    componentDidMount() {
        if(localStorage.getItem('accessToken')) Router.push('/dashboard');
    }

    render() {
        const {
            values, 
            touched,
            errors,
            isValid,
            isLoading,
            submitError,
            showPassword,
        } = this.state;

        const showUsernameError = errors.username;
        const showPasswordError = errors.password;
        return(
            <div className="flex flex-col min-h-screen w-full overflow-y-hidden">
                <header className="w-full py-1 px-5 hidden sm:flex flex items-center justify-center">
                    <div className="flex flex-col py-1 ml-10">

                    </div>
                </header>
            <div className="w-full flex">
                <main className="w-full px-20 py-20">
                    <Grid container justify="center"> 
                        <Grid item xs={6}>
                            <img className="mx-auto my-5" src="maledelivery.jpg"/>
                        </Grid>
                        <Grid item xs={6}>
                            <div
                            style={{
                                maxWidth: 384,
                                boxShadow: "0px 4px 12px rgba(51, 51, 51, 0.1)",
                                borderRadius: "6px"
                            }} 
                            className="mx-16 my-8 bg-white"
                            >
                                <div className="w-full p-6 flex flex-col">
                                    <div className="flex flex-row justify-between">
                                        <span className="text-lg font-medium font-semibold text-redgray leading-7">Luwjistik Log In</span>
                                    </div>
                                    <div 
                                    style={{
                                        maxWidth: 500,
                                    }}
                                    className="bg-white mt-5"
                                    >
                                        <TextField 
                                            className="w-full"
                                            label="Your email"
                                            name="username"
                                            onChange={event => {
                                                this.handleFieldChange('username', event.target.value)
                                            }}
                                            type="text"
                                            value={values.username}
                                            id="standard-basic"
                                        />
                                        {
                                            showUsernameError && (
                                                <Typography
                                                    className="text-redError mt-4"
                                                >
                                                    {errors.username[0]}
                                                </Typography>
                                            )
                                        }
                                    </div>
                                    <div 
                                    style={{
                                        maxWidth: 500,
                                    }}
                                    className="bg-white mt-5"
                                    >
                                        <TextField 
                                            className="w-full"
                                            label="Your password"
                                            name="password"
                                            id="standard-adornment-password"
                                            onChange={event => 
                                                this.handleFieldChange('password', event.target.value)
                                            }
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            onClick={this.handleShowPassword}
                                                        >
                                                            {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        {
                                            showPasswordError && (
                                                <Typography
                                                    className="text-redError mt-4"
                                                >
                                                    {errors.password[0]}
                                                </Typography>
                                            )
                                        }
                                    </div>
                                    <div className="mt-7 w-full">
                                        {
                                            isLoading ? (
                                                <CircularProgress
                                                    style={{
                                                        display: 'block',
                                                        marginTop: 10,
                                                        marginLeft: 'auto', 
                                                        marginRight: 'auto'
                                                    }}
                                                />
                                            ) : (
                                        <button onClick={this.handleSignIn} className="focus:outline-none w-full rounded-test text-putih bg-redgray h-10 flex justify-center items-center">
                                            <span>LOG IN</span>
                                        </button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </main>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                open={this.state.setOpenSnackbarLogin}
                autoHideDuration={2500}
                onClose={this.handleCloseSnackbar}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
            >
                {
                        this.state.snackbarStatus ? (
                            <SnackbarContent
                                style={{ backgroundColor: '#45B880' }}
                                onClose={this.handleCloseSnackBar}
                                message={this.state.snackbarMessage}
                            >
                            </SnackbarContent>
                        ) : (
                            <SnackbarContent
                                style={{ backgroundColor: '#ED4740' }}
                                onClose={this.handleCloseSnackBar}
                                message={this.state.snackbarMessage}
                            >
                            </SnackbarContent>
                        )
                    }
            </Snackbar>
            </div>
        )
    }
}

export default Login;