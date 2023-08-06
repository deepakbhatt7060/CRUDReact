import React, { Component } from 'react';
import { TextField, Button, FormControl, InputLabel, Input, Select, MenuItem, Grid, Container } from '@mui/material';
import axios from 'axios';
import Designation from '../Designation.json';
import { toast } from 'react-toastify';
import '../CRUDReact.css';

class Box extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.obj.id,
            name: this.props.obj.name,
            designation: this.props.obj.designation,
            experience: this.props.obj.experience,
            isLoading: true,
            error: null,
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const apiUrl = '/api/add/update';
        const { id, name, designation, experience } = this.state;

        const headers = {
            'Content-Type': 'application/json',
        };

        const requestData = {
            Id: id,
            Name: name,
            Designation: designation,
            Experience: experience,
        };

        axios
            .put(apiUrl, requestData, { headers })
            .then((response) => {
                console.log('Update successful', response.data);
                this.props.onSubmit(name, designation, experience);
                toast.success('Updated Data Successfully');
            })
            .catch((error) => {
                console.error('Update error:', error.message);
            });
    };

    gotSelected = (e) => {
        this.setState({ designation: e.target.value });
    };

    tryfinal = () => {
        this.props.onButtonClick();
    };

    render() {
        const { name, designation, experience } = this.state;

        return (
            <Container maxWidth="sm" style={{
                backgroundColor: 'lightgray', position: 'fixed', boxShadow: '2px 2px 2px 2px darkgrey', zIndex: 10, height: 'auto', top: 6,
                left: '50%',
                transform: 'translateX(-50%)',
        borderRadius: '4px 4px 4px 4px'}}><br/>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="name-input">Name</InputLabel>
                                <Input id="name-input" type="text" name="name" value={name} onChange={this.handleChange} required />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <Select
                                    id="designation-select"
                                    value={designation}
                                    onChange={this.handleChange}
                                    name="designation"
                                    className="bx"
                                >
                                    <MenuItem value={designation}>{designation}</MenuItem>
                                    {Designation.map((designation) => (
                                        <MenuItem key={designation.name} value={designation.name}>
                                            {designation.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    id="experience-input"
                                    label="Experience"
                                    type="text"
                                    name="experience"
                                    value={experience}
                                    onChange={this.handleChange}
                                    required
                                    className="bx"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" className="update-button" style={{
                                color: 'black',
                                backgroundColor: 'white', border: '1px solid brown', borderRadius: '2px 2px 2px 2px', boxShadow:'2px 2px 2px 2px darkgrey'
                            }} >
                                Update
                            </Button>
                            <Button type="button" onClick={this.tryfinal} variant="contained" className="cancel-button" style={{
                                color: 'black', marginLeft:'20px',
                                backgroundColor: 'white', border: '1px solid brown', borderRadius: '2px 2px 2px 2px', boxShadow: '2px 2px 2px 2px darkgrey'
                            }} >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form><br /><br />
            </Container>
        );
    }
}

export default Box;
