import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../redux/mapStateToProps';
import mapDispatchToProps from '../../redux/mapDispatchToProps';

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
    Stack,
    Box
} from '@mui/material';

function EditCat(props) {

    // Kategorie speichern
    function saveCat(e, id) {
        const cat = { "name": e.target.name.value };
        id ? props.updateCat(id, cat) : props.addCat(cat);
    }
    // Prüfe vor dem löschen, ob in Kategorie noch Rezepte vorhanden sind
    function checkDelCat(id) {
        const checkRecipeCat = props.recipes.find(elem => elem.category == id);
        if (checkRecipeCat) alert("Löschen nicht möglich! In dieser Kategorie sind noch Rezepte vorhanden.");
        else props.delCat(id);
    }

    return (
        <div>
            <Typography variant='h3'>
            {
                props.editCat && props.editCat.id ?
                    `Kategorie bearbeiten`
                :
                    "Neue Kategorie hinzufügen"
            }
            </Typography>
            <Box
                component="form"
                sx={{ width: '100' }}
                onSubmit={(e) => { e.preventDefault(); saveCat(e, props.editCat.id) }}
            >
                <Stack direction="row" spacing={1}>
                <TextField
                        id="name"
                        label="Kategorie"
                        variant="filled"
                        size='small'
                        name="name"
                        margin="normal"
                        fullWidth
                        value={props.editCat ? props.editCat.name : "" }
                        onChange={(e) => props.changeCatVal(e)}
                    />
                    <Button
                        variant="contained"
                        size="small"
                        type='submit'
                        disabled={
                            !props.editCat ||
                            !props.editCat.name
                        }
                    >
                        { props.editCat && props.editCat.id ? "Bearbeiten" : "Hinzufügen" }
                    </Button>
                </Stack>
            </Box>
            <br />
            <Typography variant='h3'>Bestehende Kategorien</Typography>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Kategorien</TableCell>
                            <TableCell>Optionen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        props.categories.map(elem => {
                            return  (<TableRow key={elem.id}>
                                        <TableCell>{elem.id}</TableCell>
                                        <TableCell>{elem.name}</TableCell>
                                        <TableCell>
                                        {
                                            props.editCat && elem.id == props.editCat.id ?
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="error"
                                                    sx={{margin: "0.125rem"}}
                                                    onClick={() => props.setEditCat(null)}
                                                >
                                                    "Bearbeiten" deaktivieren
                                                </Button>
                                            :
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{margin: "0.125rem"}}
                                                    onClick={() => props.setEditCat(elem)}
                                                >
                                                    Bearbeiten
                                                </Button>
                                        }
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="error"
                                                sx={{margin: "0.125rem"}}
                                                onClick={() => checkDelCat(elem.id)}
                                            >
                                                Löschen
                                            </Button>
                                        </TableCell>
                                    </TableRow>)
                        })
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (EditCat);