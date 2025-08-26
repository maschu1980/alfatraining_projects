import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import mapStateToProps from '../redux/mapStateToProps';
import mapDispatchToProps from '../redux/mapDispatchToProps';
import { filterFunc } from '../assets/filterFunc';

import {
    Typography,
    Button,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell
} from '@mui/material';

function RecipeList(props) {

    const navigate = useNavigate();
    const data = filterFunc(props);
        
    const tableHeadlines = [
        {
            id: "id",
            title: "ID"
        },
        {
            id: "name",
            title: "Rezept"
        },
        {
            id: "duration",
            title: "Dauer"
        },
        {
            id: "difficulty",
            title: "Schwierigkeitsgrad"
        }
    ];

    // Prüfung auf Duplikat beim Anpinnen
    function checkPinned(id) {
        const checkRecipe = props.pinnedRecipes.find(elem => elem == id)
        if (checkRecipe) return true;
    }

    return (
        <>
            <Typography variant="h2">Rezepte {data.titleAddon}</Typography>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                        {
                            tableHeadlines.map((elem, index) => {
                                if(props.sortRecipes && props.sortRecipes.name == elem.id && props.sortRecipes.direction == "up") {
                                    return  (<TableCell key={index} onClick={() => props.setSort({ name: elem.id, direction: ""})}>
                                                {elem.title} 
                                                {props.sortRecipes && props.sortRecipes.name == elem.id && <>↑</>}
                                            </TableCell>);
                                } else {
                                    return  (<TableCell key={index} onClick={() => props.setSort({ name: elem.id , direction: "up"})}>
                                                {elem.title}
                                                {props.sortRecipes && props.sortRecipes.name == elem.id && <>↓</>}
                                            </TableCell>);
                                }
                            })
                        }
                            <TableCell>Optionen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        data.recipes.map(elem => {
                            return  (<TableRow key={elem.id}>
                                        <TableCell>{elem.id}</TableCell>
                                        <TableCell>{elem.name}</TableCell>
                                        <TableCell>{elem.duration}</TableCell>
                                        <TableCell>{elem.difficulty}</TableCell>
                                        <TableCell>
                                        {
                                            props.category == "0" || checkPinned(elem.id) ?
                                                <Button
                                                    sx={{margin: "0.125rem"}}
                                                    variant="outlined"
                                                    size="small"
                                                    color="error"
                                                    onClick={() => { props.delPinned(elem.id)}}
                                                >
                                                    Entpinnen
                                                </Button>
                                            :
                                                <Button
                                                    sx={{margin: "0.125rem"}}
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => { props.addPinned(elem.id)}}
                                                >
                                                    Anpinnen
                                                </Button>
                                        }
                                            <Button 
                                                sx={{margin: "0.125rem"}}
                                                variant="outlined"
                                                size="small"
                                                onClick={() => { navigate(`recipe/${elem.id}/${elem.name}/`) }}
                                            >
                                                Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>);
                        })
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (RecipeList);