import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
const AddTrainings = (props) => {
    const [open, setOpen] = React.useState(false);
    const [customer, SetCustomer] = useState({});

    const [training, setTraining] = useState({
        date: new Date(),
        activity: '',
        duration: '',
        customer: ''
    })

    const handleClickOpen = () => {
        // console.log(props.selectedCustomer.links[1].href)
        if (props.selectedCustomer != null) {
            fetch(props.selectedCustomer.links[1].href)
                .then(res => res.json())
                .then(data => SetCustomer(data))
            setTraining({ ...training, customer: props.selectedCustomer.links[1].href })
            console.log(training.customer)
            setOpen(true)
        }
        else
            alert("Please select a customer first !")

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        props.saveTraining(training);
        setOpen(false);
    };

    const inputChanged = (e) => {
        setTraining({ ...training, [e.target.name]: e.target.value })
    };
    const dateChanged = date => {
        date = date.toISOString();
        setTraining({ ...training, date: date });
    };
    return (
        <div>
            <Button style={{ marginTop: 20 }} variant="outlined" color="primary" onClick={handleClickOpen}>
                <FitnessCenterIcon /> <AddCircleIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new trainings</DialogTitle>
                <DialogContent>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            value={training.value}
                            onChange={(newDate) => dateChanged(newDate)
                            }
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        label="Duration"
                        value={training.duration}
                        name="duration"
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Activity"
                        value={training.activity}
                        name="activity"
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Firstname"
                        value={customer.firstname}
                        name="firstname"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Lastname"
                        value={customer.lastname}
                        name="lastname"
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
export default AddTrainings;