import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../redux/mapStateToProps';
import mapDispatchToProps from '../../redux/mapDispatchToProps';
import Filter from '../Filter';
import { filterFunc } from '../../assets/filterFunc';

import {
    Typography,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    MenuItem,
    Stack,
    Box
} from '@mui/material';


function EditRecipe(props) {

    const data = filterFunc(props);
    const emptyRecipe = {
        "id": 0,
        "category": 0,
        "name": "",
        "duration": "",
        "difficulty": 0,
        "ingredients": "",
        "cooking": "",
    };
    const DIFFICULTY_OPTIONS = ["1 von 5", "2 von 5", "3 von 5", "4 von 5", "5 von 5"];

    // Rezept speichern
    function saveRecipe(e, id) {
        const recipe = {
            "category": e.target.category.value,
            "name": e.target.name.value,
            "duration": e.target.duration.value,
            "difficulty": e.target.difficulty.value,
            "ingredients": e.target.ingredients.value,
            "cooking": e.target.cooking.value,
        };
        id == 0 ? props.addRecipe(recipe) : props.updateRecipe(id, recipe)
    }

    return (
        <>
        {
            props.editRecipe ?
                <>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ margin: '1rem 0' }}>
                        <Typography variant='h3'>
                            { props.editRecipe.id == 0 ? "Neues Rezept" : "Rezept bearbeiten" }
                        </Typography>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => props.setEditRecipe(null)}
                        >
                            Zurück
                        </Button>
                    </Stack>
                    <Box
                        component="form"
                        sx={{ width: '100' }}
                        onSubmit={(e) => { e.preventDefault(); saveRecipe(e, props.editRecipe.id) }}
                    >
                        <TextField
                            id="category"
                            label="Kategorie"
                            select
                            variant="filled"
                            size="small"
                            name="category"
                            margin="dense"
                            fullWidth
                            value={props.editRecipe.category}
                            onChange={(e) => props.changeRecipeVal(e)}
                        >
                            <MenuItem key="0" value="0">Bitte auswählen</MenuItem>
                            {
                                props.categories.map(elem => {
                                    return <MenuItem key={elem.id} value={elem.id}>{elem.name}</MenuItem>;
                                })
                            }
                        </TextField>
                        <TextField
                            id="name"
                            label="Name"
                            type="text"
                            variant="filled"
                            size='small'
                            name="name"
                            margin="dense"
                            fullWidth
                            value={props.editRecipe.name}
                            onChange={(e) => props.changeRecipeVal(e)}
                        />
                        <TextField
                            id="duration"
                            label="Dauer"
                            type="text"
                            variant="filled"
                            size='small'
                            name="duration"
                            margin="dense"
                            fullWidth
                            value={props.editRecipe.duration}
                            onChange={(e) => props.changeRecipeVal(e)}
                        />
                        <TextField
                            id="difficulty"
                            label="Schwierigkeitsgrad"
                            select
                            variant="filled"
                            size='small'
                            name="difficulty"
                            margin="dense"
                            fullWidth
                            value={props.editRecipe.difficulty}
                            onChange={(e) => props.changeRecipeVal(e)}
                        >
                            <MenuItem key="0" value="0">Bitte auswählen</MenuItem>
                            {
                                DIFFICULTY_OPTIONS.map((elem, index) => {
                                    return <MenuItem key={index} value={elem}>{elem}</MenuItem>;
                                })
                            }
                        </TextField>
                        <TextField
                            id="ingredients"
                            label="Zutaten"
                            multiline
                            rows={6}
                            variant="filled"
                            size='small'
                            name="ingredients"
                            margin="dense"
                            fullWidth
                            value={props.editRecipe.ingredients}
                            onChange={(e) => props.changeRecipeVal(e)}
                        />
                        <TextField
                            id="cooking"
                            label="Zubereitung"
                            multiline
                            rows={10}
                            variant="filled"
                            size='small'
                            name="cooking"
                            margin="dense"
                            fullWidth
                            value={props.editRecipe.cooking}
                            onChange={(e) => props.changeRecipeVal(e)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={
                                props.editRecipe.category == 0 ||
                                !props.editRecipe.name ||
                                !props.editRecipe.duration ||
                                props.editRecipe.difficulty == 0 ||
                                !props.editRecipe.ingredients ||
                                !props.editRecipe.cooking
                            }
                        >
                            { props.editRecipe.id == 0 ? "Hinzufügen" : "Bearbeiten" }
                        </Button>
                    </Box>                       
                </>
            :
                <>

                    <Filter />
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ margin: '2rem 0' }}>
                        <Typography variant='h3'>Rezepte {data.titleAddon}</Typography>
                        <Button
                            variant="contained"
                            size='small'
                            onClick={() => props.setEditRecipe(emptyRecipe)}
                        >
                            Neues Rezept hinzufügen
                        </Button>
                    </Stack>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Rezepte</TableCell>
                                    <TableCell>Optionen</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                data.recipes.map(elem => {
                                    return  (<TableRow key={elem.id}>
                                                <TableCell>{elem.id}</TableCell>
                                                <TableCell>{elem.name}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{margin: "0.125rem"}}
                                                        onClick={() => props.setEditRecipe(elem)}
                                                    >
                                                        Bearbeiten
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        color="error"
                                                        sx={{margin: "0.125rem"}}
                                                        onClick={() => props.delRecipe(elem.id)}
                                                    >
                                                        Löschen
                                                    </Button>
                                                </TableCell>
                                            </TableRow>);
                                })
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
        }
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (EditRecipe);