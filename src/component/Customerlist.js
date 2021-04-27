import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { Maximize } from '@material-ui/icons';


const Customerlist = () => {

    const [customerslist, setCustomerlist] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState()

    const openSnackbar = () => {
        setOpen(true);
    };
    const closeSnackbar = () => {
        setOpen(false);
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(res => res.json())
            .then(data => setCustomerlist(data.content))
            .catch(err => console.log(err))
    };

    useEffect(() => fetchCustomers(), []);


    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => {
                if (res.ok){
                    setMessage("Customer was added");
                    fetchCustomers();
                    openSnackbar();
                }  
                else
                    alert('Failed to add new customer!')
            })
    }

    const deleteCustomer = (url) => {
        //console.log(data.links[0].href)
        if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'DELETE' })
            .then(response => {
                    if (response.ok) {
                        setMessage("Customer was deleted!")
                        fetchCustomers();
                        openSnackbar();
                    }

                    else { alert('Something went wrong!') }
                })
                .catch(err => console.error(err))
        }
    }

    const editCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updatedCustomer),
            headers: { 'Content-type': 'application/json' }
        })
        .then(res => {
            if (res.ok){
                setMessage("Customer was edited!")
                fetchCustomers();
                openSnackbar();
            }
            else
                alert('Editing is wrong')
            })
        .catch(err => console.log(err))
    }

    const columns = [
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true },
        { field: 'city', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true },
        {
            headName: '',
            width: 100,
            field: '',
            cellRendererFramework: params => <EditCustomer link={params.data.links[0].href} customer={params.data} editCustomer={editCustomer}  />
        },
        {
            headName: '',
            width: 100,
            field: '',
            cellRendererFramework: params => <IconButton onClick={() => deleteCustomer(params.data.links[0].href)}><DeleteIcon color="secondary" /></IconButton>
        },
        
    ]

return (
    <div  style={{ height: '90%', width: '100%', margin: 'auto' }}>
       
        <AddCustomer style={{ marginTop:20 }} addCustomer={addCustomer} />
        <div className="ag-theme-material" style={{ height: 800, width: '85%', margin: 'auto' }}>
            <AgGridReact
                rowData={customerslist}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={15}
                suppressCellSelection={true}
            />
        </div>
        <Snackbar
            open={open}
            autoHideDuration={3000}
            message={message}
            onClose={closeSnackbar}
        />
    </div>
)

}

export default Customerlist;