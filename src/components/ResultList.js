import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';

import CellActions from './CellActions';

function formatDate(dateString) {
    let date = new Date(dateString);
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = date.getFullYear();
    var hh = String(date.getHours()).padStart(2, "0");
    var min = String(date.getMinutes()).padStart(2, "0");
    var sec = String(date.getSeconds()).padStart(2, "0");

    return dd + "." + mm + "." + yyyy + " " + hh + ":" + min + ":" + sec;
}


export default function ResultList({ results, onDelete, onEdit, onSave, editId, setResults }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('timeofsubmission');

    const handleSort = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedResults = results.sort((a, b) => {
        if (order === 'asc') {
            return a[orderBy] < b[orderBy] ? -1 : 1;
        } else {
            return a[orderBy] > b[orderBy] ? -1 : 1;
        }
    });

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'name'}
                                direction={orderBy === 'name' ? order : 'asc'}
                                onClick={handleSort('name')}
                            >
                                Name
                            </TableSortLabel>
                        </TableCell>
                       
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'time'}
                                direction={orderBy === 'time' ? order : 'asc'}
                                onClick={handleSort('time')}
                            >
                                Time (s)
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'height'}
                                direction={orderBy === 'height' ? order : 'asc'}
                                onClick={handleSort('height')}
                            >
                                Height (m)
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'timeofsubmission'}
                                direction={orderBy === 'timeofsubmission' ? order : 'asc'}
                                onClick={handleSort('timeofsubmission')}
                            >
                                Time of Submission
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedResults.map((result, index) => (
                        <TableRow key={index}>
                            {(editId !== result.timeofsubmission) ? (    
                            <>        
                            <TableCell title={`Name: ${result.name}`}>{result.name}</TableCell>
                            
                            <TableCell title={`Time: ${result.time.toFixed(2)}`}>{result.time.toFixed(2)}</TableCell>
                            <TableCell title={`Height: ${result.height.toFixed(2)}`}>{result.height.toFixed(2)}</TableCell>
                            <TableCell title={`Time of Submission: ${formatDate(result.timeofsubmission)}`}>
                                {formatDate(result.timeofsubmission)}
                            </TableCell>
                            {(onDelete || onEdit || onSave) && (
                            <CellActions
                                result={result}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                onSave={onSave}
                            />
                            )}
                            </>
                            ):
                            (<>
                            <TableCell title={`Name: ${result.name}`}>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Enter name for recording..."
                                    value={result.name}
                                    onChange={(e) => {
                                        const newResults = [...results];    
                                        newResults[index].name = e.target.value;
                                        setResults(newResults);
                                    }}
                                />
                            </TableCell>

                            <TableCell title={`Time: ${result.time.toFixed(2)}`}>
                                <input
                                    type="number"
                                    className="form-control mt-1"
                                    placeholder="Enter time for recording..."
                                    value={result.time}
                                    onChange={(e) => {
                                        const newResults = [...results];
                                        newResults[index].time = e.target.value;
                                        setResults(newResults);
                                    }}
                                />
                            </TableCell>

                            <TableCell title={`Height: ${result.height.toFixed(2)}`}>
                                <input
                                    type="number"
                                    className="form-control mt-1"
                                    placeholder="Enter height for recording..."
                                    value={result.height}
                                    onChange={(e) => {
                                        const newResults = [...results];
                                        newResults[index].height = e.target.value;
                                        setResults(newResults);
                                    }}
                                />
                            </TableCell>

                            <TableCell title={`Time of Submission: ${formatDate(result.timeofsubmission)}`}>
                                {formatDate(result.timeofsubmission)}
                            </TableCell>

                            <CellActions 
                                result={result}
                                onDiscard={onDelete}
                                onSave={onSave}
                                
                            />
                            </>
                            )}






                            
                            

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
