import React, { Component } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    IconButton
} from '@mui/material';
import Box from './Box';

class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: null,
            show: false,
            data: [],
            obj: {
                id: '',
                name: '',
                designation: '',
                experience: null,
            },
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.fetchData();
        }
    }

    fetchData() {
        axios
            .get('/api/add/read')
            .then((response) => {
                this.setState({
                    data: response.data,
                    isLoading: false,
                    error: null,
                });
            })
            .catch((error) => {
                this.setState({
                    data: [],
                    isLoading: false,
                    error: error.message,
                });
            });
    }

    delete = (id, name) => {
        var check = window.confirm("Are you sure you want to delete this data with name: " + name);
        if (check === true) {
            axios
                .delete('/api/add/delete', {
                    data: id,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(() => {
                    this.fetchData();
                    toast.success("Deleted Data with name " + name);
                })
                .catch((error) => {
                    console.error('Delete error:', error.message);
                    if (error.response.status === 404) {
                        console.log('Data not found');
                    } else {
                        throw error;
                    }
                });
        }
    };

    update = (item) => {
        if (this.state.show === true) {
            this.setState({
                show: false,
                obj: { id: '', name: '', designation: '', experience: null },
            });
        } else {
            this.setState({
                show: true,
                obj: {
                    id: item.id,
                    name: item.name,
                    designation: item.designation,
                    experience: item.experience,
                },
            });
        }
    };

    handleSubmit = (name, designation, experience) => {
        console.log('Name:', name);
        console.log('Designation:', designation);
        console.log('Experience:', experience);

        this.setState({ show: false });
        this.fetchData();
    };

    finaltry = () => {
        this.setState({ show: false });
    };

    render() {
        const { data, isLoading, error, show } = this.state;

        if (isLoading) {
            return <div className="load">Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Designation</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Experience</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Update</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.designation}</TableCell>
                                <TableCell>{item.experience}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => this.update(item)} disabled={show}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => this.delete(item.id, item.name)} aria-label="delete" disabled={show}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {show && (
                    <Box obj={this.state.obj} onSubmit={this.handleSubmit} onClose={this.fetchData} onButtonClick={this.finaltry} />
                )}
            </div>
        );
    }
}

export default Data;
