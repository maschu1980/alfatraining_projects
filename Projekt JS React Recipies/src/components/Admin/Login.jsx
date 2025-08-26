import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../redux/mapStateToProps';
import mapDispatchToProps from '../../redux/mapDispatchToProps';

import {
    Box,
    Typography,
    Button,
    TextField
} from '@mui/material';

function Login(props) {

    // Prüfung der Login-Daten
    function checkLogin(e) {
        e.preventDefault();

        const user = props.users.find(elem => {
           return elem.username == e.target.username.value && elem.password == e.target.password.value;
        });

        if (user) props.login(user);
        else alert("Benutzer oder Passwort falsch!");
    }

    return (
        <Box sx={{ width: '50%', margin: "0 auto", p: "1rem 3rem 3rem", border: "1px solid lightgrey" }}>
            <Typography variant='h2'>Bitte anmelden!</Typography>
            <Box component="form" onSubmit={(e) => checkLogin(e)}>
                <TextField
                    id="username"
                    label="Benutzer"
                    type="text"
                    variant="filled"
                    size='small'
                    margin="dense"
                    fullWidth
                    name="username"
                />
                <TextField
                    id="password"
                    label="Passwort"
                    type="password"
                    variant="filled"
                    size='small'
                    margin="dense"
                    fullWidth
                    name="password"
                />
                <Button
                variant="contained"
                margin="dense"
                fullWidth
                type='submit'
                >
                    Anmelden
                </Button>
            </Box>
        </Box>
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (Login);