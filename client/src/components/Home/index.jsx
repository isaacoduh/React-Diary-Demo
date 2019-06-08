import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {connect} from 'react-redux';


import {Form} from '../../components/Entry';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount(){
        const {onLoad} = this.props;

        axios('http://localhost:8000/api/entries')
            .then((res) => onLoad(res.data));
    }

    handleDelete(id){
        const {onDelete} = this.props;

        return axios.delete(`http://localhost:8000/api/entries/${id}`).then(() => onDelete(id));
    }

    handleEdit(entry){
        const {setEdit} = this.props;

        setEdit(entry);
    }
    render(){
        const {entries} = this.props;
        // console.log(entries);
        return (
            <div className="container">
                <div className="row pt-5">
                    <div className="col-12 col-lg-6 offset-lg-3">
                        <h1 className="text-center">My Diary</h1>
                    </div>
                    <Form/>
                </div>

                <div className="row pt-5">
                    <div className="col-12 col-lg-6 offset-lg-3">
                        {entries.map((entry) => {
                            return (
                                <div className="card my-3">
                                    <div className="card-header">
                                        {entry.title}
                                    </div>
                                    <div className="card-body">
                                        {entry.body}
                                    </div>
                                    <div className="card-footer">
                                        <div className="row">
                                            <button className="btn btn-primary mx-3"
                                            onClick={() => this.handleEdit(entry)}
                                            >Edit</button>
                                            <button className="btn btn-danger" onClick={() => this.handleDelete(entry._id)}>
                                                Delete
                                            </button>
                                        </div>
                                        
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    entries: state.home.entries,
});

const mapDispatchToProps = dispatch => ({
    onLoad: data => dispatch({type: 'HOME_PAGE_LOADED', data}),
    onDelete: id => dispatch({type: 'DELETE_ENTRY', id}),
    setEdit: entry => dispatch({type: 'SET_EDIT', entry}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);