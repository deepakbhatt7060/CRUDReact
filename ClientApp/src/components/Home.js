import React, { Component } from 'react';
import '../CRUDReact.css';
import axios from 'axios';
import Data from './Data';
import Designation from '../Designation.json';
import { FormControl, MenuItem, Input, Select, Grid,InputLabel, Button } from '@mui/material';
import { toast } from 'react-toastify';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        // default states creation and initialization
        this.state = {
            name: '',
            designation: 'Choose Designation', 
            experience: '',
            errors: {},
            data: 1
        };
    }

    // function to initialize states onchange of inputs having type="text"
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // form validation
    validateForm = () => {
        const { name, designation, experience } = this.state;
        let errors = {};
        let isValid = true;

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            isValid = false;
            errors.name = 'Enter Correct Name';
        }

        if (designation =="Choose Designation") {
            isValid = false;
            errors.designation = 'Enter Correct Designation';
        }

        if (!/^\d{1,2}$/.test(experience) || parseInt(experience) > 40) {
            isValid = false;
            errors.experience = 'Invalid Experience Entered';
        }

        this.setState({ errors });
        return isValid;
    }


    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            const { name, designation, experience } = this.state;



            // Create a data object to send to the server
            const data = {
                name: name,
                designation: designation,
                experience: experience
            };



            // Make the API call using Axios
            axios.post('/api/add/create', data)
                .then(response => {
                    console.log('API response:', response.data);
                    this.setState({ name: '', designation: 'Choose Designation', experience: '', data: this.state.data + 1 });
                    toast.success("Data added with name " + name);


                })
                .catch(error => {
                    console.log('API error:', error);

                });
        } else {
            console.log('Form validation failed');
        }
    }
    // Validation
   
    gotSelected = (e) => {
        this.setState({ designation: e.target.value });



    }
   

    // ...

    render() {
        const { name, experience, errors, designation } = this.state;

        return (
            <div>
                <h1>ADD EMPLOYEE DETAILS</h1><br /><br />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input id="name" type="text" name="name" value={name} onChange={this.handleChange} required />
                        </FormControl>
                        {errors.name && <div className="error">{errors.name}</div>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="exp">Experience</InputLabel>
                            <Input id="exp" type="text" name="experience" value={experience} onChange={this.handleChange} required />
                        </FormControl>
                        {errors.experience && <div className="error">{errors.experience}</div>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            
                            <Select
                                labelId="desig-label"
                                value={designation}
                                onChange={(e) => this.gotSelected(e)}
                            >
                                <MenuItem value="Choose Designation">Choose Designation</MenuItem>
                                {Designation.map((designation, index) => (
                                    <MenuItem key={index} value={designation.name}>
                                        {designation.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {errors.designation && <div className="error">{errors.designation}</div>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button type="submit" variant="contained">Add</Button>
                    </Grid>
                </Grid>
                <br /><br />
                <Data data={this.state.data} />
            </div>
        );
    }
}
