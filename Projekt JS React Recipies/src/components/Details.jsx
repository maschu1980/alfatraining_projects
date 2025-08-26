import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import mapStateToProps from '../redux/mapStateToProps';
import mapDispatchToProps from '../redux/mapDispatchToProps';

import {
    Typography,
    Button,
    Box
} from '@mui/material';


function Details(props) {

    const navigate = useNavigate();
    const params = useParams();

    const recipe = props.recipes.find(elem => elem.id == params.id && elem.name == params.name);

    const HEADLINES = [
        {
            id: "duration",
            title: "Dauer"
        },
        {
            id: "difficulty",
            title: "Schwierigkeitsgrad"
        },
        {
            id: "ingredients",
            title: "Zutaten"
        },
        {
            id: "cooking",
            title: "Zubereitung"
        }
    ];

    return (
        <Box>
        {
            recipe &&
            <>  
                <Typography variant='h2'>Rezept-Details: {recipe.name}</Typography>
                <Button variant="contained" size='small' onClick={() => navigate(-1)}>Zurück zur Übersicht</Button> 
                {
                    HEADLINES.map(elem => {
                        return  (<Box sx={{ width: '100' }} key={elem.id}>
                                    <Typography variant='h3'>{elem.title}:</Typography>
                                    <Typography variant='body2' >{recipe[elem.id]}</Typography>
                                </Box>);
                    })
                }
            </>
        }
        </Box>
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (Details);