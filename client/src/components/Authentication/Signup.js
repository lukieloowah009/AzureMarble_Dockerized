/***************************************************************************************
 *    Title: Material UI Template code
 *    Author: Material UI
 *    Date: 03/24/2020
 *    Availability: https://material-ui.com/getting-started/templates/
 *
 ***************************************************************************************/

import React, {useState, useMemo} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import EnhancedEncryptionTwoToneIcon from '@material-ui/icons/EnhancedEncryptionTwoTone';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useAuth} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom"
import Alert from '@material-ui/lab/Alert';
import Grow from '@material-ui/core/Grow';
import countryList from 'react-select-country-list'
import Select from 'react-select';
import axios from 'axios';
import Switch from "@material-ui/core/Switch";
import BgToggle from "../BgToggle";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Azure Marble
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const dropDownStyles = {
    menu: base => ({
        ...base,
        zIndex: 100
    })
};


export default function SignUp() {
    const classes = useStyles();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const options = useMemo(() => countryList().getData(), [])
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const {signup, verifyUserEmail} = useAuth();
    const [animate, setAnimate] = useState(true);
    const [bgToggle, setBgToggle] = useState(false)
    const delay = ms => new Promise(res => setTimeout(res, ms));

    async function handleSubmit(e) {
        e.preventDefault()

        //validating country selection
        if (country === "") {
            return setGeneralError("Please select a country")
        }

        //Checking email validity
        if((!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
            return setGeneralError("Email is incorrectly formatted")
        }

        //Checking password validity
        if(password.length < 6) {
            return setGeneralError("Password needs to be minimum 6 characters")
        }

        if (password !== passwordConfirm) {
            return setGeneralError("Passwords do not match")
        }

        try {
            setGeneralError("")
            setMessage("")
            setLoading(true)
            await signup(email, password)
            await delay(2000)
            await verifyUserEmail()
            setMessage("An email verfication has been sent. Redirecting...")

            axios.post('/api/user', {
                firstName: firstName,
                lastName: lastName,
                email: email.toLowerCase(),
                country: country.label.toString(),
                rank: null,
                highscore: null
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    throw error;
                });

            await delay(2000)
            history.push("/Home")

        } catch (e) {
            setMessage("")
            setGeneralError("Failed to create an account")
        }
        setLoading(false)

    }

    const countryChangeHandler = value => {
        setCountry(value)
    }

    return (
        <div>
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Grow
                        in={animate}
                        style={{transformOrigin: '0 0 0'}}
                        {...(animate ? {timeout: 1000} : {})}
                    >
                        <div className={classes.paper}>
                            <Switch
                                checked={bgToggle}
                                onChange={e => {
                                    setBgToggle(e.target.checked)
                                }}
                                name="Disable Animated Background"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                            Disable Animated Background
                            <Avatar className={classes.avatar}>
                                <EnhancedEncryptionTwoToneIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            {generalError && <Alert severity="error">{generalError}</Alert>}
                            {message && <Alert severity="info">{message}</Alert>}
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="fname"
                                            name="firstName"
                                            variant="outlined"
                                            required={true}
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                            onChange={e => setFirstName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required={true}
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="lname"
                                            onChange={e => setLastName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Select options={options} styles={dropDownStyles} value={country}
                                                onChange={countryChangeHandler}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required={true}
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required={true}
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required={true}
                                            fullWidth
                                            name="password-confirm"
                                            label="Confirm Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            onChange={e => setPasswordConfirm(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={loading}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link href="/Login" variant="body2">
                                            Already have an account? Log in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Grow>
                    <Box mt={5}>
                        <Copyright/>
                    </Box>
                </Container>
            </div>
            <BgToggle toggle={bgToggle}/>
        </div>
    );
}
