import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../redux/mapStateToProps';
import mapDispatchToProps from '../redux/mapDispatchToProps';

import {
    Stack,
    Button,
    Box,
    TextField
} from '@mui/material';

function Filter(props) {

    // Anzeige der Anzahl der Rezepte pro Kategorie
    function countRecipes(cat) {
        if (cat != "-1") return props.recipes.filter(elem => elem.category == cat).length;
        else return props.recipes.length;
    }

    return (
        <Box component="nav" sx={{ width: '100' }}>
            <Box 
                component="form"
                sx={{ width: '100' }}
                onSubmit={(e) => e.preventDefault()}
            >
                <TextField
                    id="search"
                    label="Suche nach..."
                    type="search"
                    variant="filled"
                    size='small'
                    name="search"
                    margin="normal"
                    fullWidth
                    value={props.searchStr}
                    onChange={(e) => props.searchRecipes(e.target.value)} 
                />
            </Box>
            <Stack direction="row" spacing={0.5}>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{margin: "0.125rem"}}
                    key="-1"
                    onClick={() => { props.showCat("-1"); props.setSort(null); }}
                >
                    Alle Rezepte ({countRecipes("-1")})
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{margin: "0.125rem"}}
                    key="0"
                    onClick={() => { props.showCat(0); props.setSort(null); }}
                >
                    Angepinnt ({props.pinnedRecipes.length})
                </Button>
                {
                    props.categories.map(elem => {
                        return  (<Button
                                    variant="outlined"
                                    size="small"
                                    sx={{margin: "0.125rem"}}
                                    key={elem.id}
                                    onClick={() => { props.showCat(elem.id); props.setSort(null); }}
                                >
                                    {elem.name} ({countRecipes(elem.id)})
                                </Button>);
                    })
                }
            </Stack>            
        </Box>
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (Filter);