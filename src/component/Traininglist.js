import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


import Moment from "react-moment";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


export default function Trainings() {
    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(res => res.json())
            .then(data => setTrainings(data))
            .catch(err => console.log(err))
    }

    useEffect(() => fetchTrainings(), []);

    const deleteTraining = (id) => {
        console.log(id)
        if (window.confirm('Are you sure?')) {
            fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {
                method: "DELETE"
            })
                .then(response => {
                    if (response.ok) {
                        alert("Customer was deleted!")
                        fetchTrainings();

                    }

                    else { alert('Something went wrong!') }
                })
                .catch(error => console.error(error));
        }
    }

    const columns = [

        { field: 'customer.firstname' },
        { field: 'customer.lastname' },
        { field: 'customer.id' },
        {
            field: 'date',
            cellRendererFramework: params => <Moment format="DD.MM.YYYY HH:mm" date={params.data.date} />

        },
        { field: 'duration' },
        { field: 'activity' },
        {
            headName: '',
            width: 100,
            field: '',
            cellRendererFramework: params => <IconButton onClick={() => deleteTraining(params.data.id)}><DeleteIcon color="secondary" /></IconButton>
        },

    ]

    return (
        <div style={{ paddingTop: 80, height: '100%', width: '90%', margin: 'auto' }}>

            <div className="ag-theme-material" style={{ height: 700, width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellSelection={true}
                />
            </div>


        </div>
    );
}
