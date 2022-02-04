import React, {useState} from 'react';
import _ from 'lodash';
import * as mathjs from 'mathjs';
import Datasheet from 'react-datasheet';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createGraph } from '../lib/util/grid-functions';

export default function Spreadsheet(){
    const [rows, cols] = [10, 10];

    let graph = createGraph(rows, cols);

    const [ state, setState ] = useState(graph);

    const generateGrid = () => {
        const colNames = ['', ..."abcdefghijklmnopqrstuvwxyz".substr(0,cols).toUpperCase().split('')];
        return [...Array(rows).keys()].map((row, i) =>
            colNames.map((col, j) => {
                if(i === 0 && j === 0) {
                    return {readOnly: true, value: ''}
                }
                if(row === 0) {
                    return {readOnly: true, value: col}
                }
                if(j === 0) {
                    return {readOnly: true, value: row}
                }
                const key = col+row;

                return state[key];
            })
        )
    }

    const validateExp = (trailKeys, expr) => {
        let valid = true;
        const matches = expr.match(/[A-Z][1-9]+/g) || [];
        matches.map(match => {
            if(trailKeys.indexOf(match) > -1) {
                valid = false
            } else {
                valid = validateExp([...trailKeys, match], state[match].expr)
            }
        })
        return valid
    }

    const computeExpr = (key, expr, scope) => {
        let value = null;
        if(expr.charAt(0) !== '=') {
            return {className: '', value: expr, expr: expr};
        } else {
            try {
                value = mathjs.evaluate(expr.substring(1), scope)
            } catch(e) {
                value = null
            }

            if(value !== null && validateExp([key], expr)) {
                return {className: 'equation', value, expr}
            } else {
                return {className: 'error', value: 'error', expr: ''}
            }
        }
    }

    const cellUpdate = (state, changeCell, expr) => {
        const scope = _.mapValues(state, (val) => isNaN(val.value) ? 0 : parseFloat(val.value))
        state[changeCell.key] = _.assign({}, changeCell, computeExpr(changeCell.key, expr, scope))

        _.each(state, (cell, key) => {
            if(cell.expr.charAt(0) === '=' && cell.expr.indexOf(changeCell.key) > -1 && key !== changeCell.key) {
                state = cellUpdate(state, cell, cell.expr)
            }
        })
        return state
    }

    const onCellsChanged = (changes) => {
        const newState = { ...state };
        changes.forEach(({cell, value}) => {
            cellUpdate(newState, cell, value)
        })
        setState(newState);
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    fontFamily="DejaVu Sans Mono, monospace"
                >
                    <Grid item xs={9} className='sheet-container'>
                        <Datasheet
                            data={generateGrid()}
                            valueRenderer={(cell) => cell.value}
                            dataRenderer={(cell) => cell.expr}
                            onCellsChanged={onCellsChanged}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )

}