import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';

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

export default function ResultList({ results }) {
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
                                active={orderBy === 'timeofsubmission'}
                                direction={orderBy === 'timeofsubmission' ? order : 'asc'}
                                onClick={handleSort('timeofsubmission')}
                            >
                                Time of Submission
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedResults.map((result, index) => (
                        <TableRow key={index}>
                            <TableCell title={`Name: ${result.name}`}>{result.name}</TableCell>
                            <TableCell title={`Time of Submission: ${formatDate(result.timeofsubmission)}`}>
                                {formatDate(result.timeofsubmission)}
                            </TableCell>
                            <TableCell title={`Time: ${result.time}`}>{result.time}</TableCell>
                            <TableCell title={`Height: ${result.height}`}>{result.height}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
