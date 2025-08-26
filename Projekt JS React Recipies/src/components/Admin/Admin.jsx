import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../redux/mapStateToProps';
import mapDispatchToProps from '../../redux/mapDispatchToProps';
import Login from './Login';
import EditCat from './EditCat';
import EditRecipe from './EditRecipe';

import {
    Stack,
    Typography,
    Button,
    Box
} from '@mui/material';

function Admin(props) {
    return (
        <Box>
        {
            props.loggedin ?
                <>
                    <Typography variant='h2'>Adminbereich</Typography>
                    <Stack direction="row" spacing={0.5} sx={{ margin: '1rem 0 2rem 0' }}>
                        <Button variant="contained" onClick={() => { props.setShowEdit("categories"); props.setEditCat(null); }}>Kategorien bearbeiten</Button>
                        <Button variant="contained" onClick={() => { props.setShowEdit("recipes"); props.setEditRecipe(null); }}>Rezepte bearbeiten</Button>
                    </Stack>
                    {
                        props.showEdit && props.showEdit == "categories" && <EditCat />
                    }
                    {
                        props.showEdit && props.showEdit == "recipes" && <EditRecipe />
                    }
                </>
            :
                <Login />
        }
        </Box>
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (Admin);