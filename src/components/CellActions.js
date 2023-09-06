import React from 'react';
import { TableCell } from '@mui/material';



export default function CellActions({ result, onDelete, onEdit, onSave }) {
    return (<>
        {(onDelete || onEdit || onSave) && (
    <TableCell title={`actions`}>
        {onDelete && (
        <input 
            type="button"
            value ="Delete"
            id={result.timeofsubmission}
            onClick={onDelete} 
            className='btn btn-danger'
        />
        )}
        {onEdit && (
        <input
            type="button"
            value="Edit"
            id={result.timeofsubmission}
            onClick={onEdit}
            className='btn btn-primary'
        />
        )}
        {onSave && (
            <input
                type="button"
                value="Save"
                id={result.timeofsubmission}
                onClick={onSave}
                className='btn btn-success'
            />
        )}

    </TableCell>
    )}
    </>
    )
}