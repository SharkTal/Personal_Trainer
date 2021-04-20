import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { UserAddOutlined } from '@ant-design/icons';
const AddCustomer = (props) => {
    const [open, setOpen] = React.useState(false);
    const [customer, SetCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        props.addCustomer(customer);
        setOpen(false);
    };

    const inputChanged = (e) => {
        SetCustomer({ ...customer, [e.target.name]: e.target.value })
    };

    return (
        <div>
            <Button style={{ marginTop: 20 }} variant="outlined" color="primary" onClick={handleClickOpen}>
                <UserAddOutlined style={{ color: "green"}} />
      </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Firstname"
                        value={customer.firstname}
                        name="firstname"
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Lastname"
                        value={customer.lastname}
                        name="lastname"
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Streetaddress"
                        value={customer.streetaddress}
                        name="streetaddress"
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Postcode"
                        value={customer.postcode}
                        name="postcode"
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        value={customer.city}
                        name="city"
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        value={customer.email}
                        name="email"
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Phone"
                        value={customer.phone}
                        name="phone"
                        onChange={inputChanged}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleAdd} color="primary">
                        Add
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default AddCustomer;