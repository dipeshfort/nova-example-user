import React, { Component } from 'react';
import { dateFormat } from '../utils';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReminderService } from "../services/reminder.service";

class _ReminderDetails extends Component {

    constructor(props) {
        super(props);
        const todayStr = dateFormat(new Date());
        this.state = {
            disabled: true,
            minremindDate: todayStr,
            id: null,
            title: '',
            remindDate: '',
            amount: 0,
            comments: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }

    fillReminder(reminder) {
        this.setState({
            disabled: false,
            id: reminder.id,
            title: reminder.title,
            remindDate: reminder.remindDate,
            amount: reminder.amount,
            comments: reminder.comments
        });
    }

    componentDidMount() {
        if (this.props.reminder) {
            this.fillReminder(this.props.reminder);
        }
    }
    componentWillReceiveProps(props) {
        if (props.reminder) {
            this.fillReminder(props.reminder);
        }
    } 
    
    save(event) {
        event.preventDefault();
        ReminderService.update(this.state.id, {
            title: this.state.title,
            remindDate: this.state.remindDate,
            amount: this.state.amount,
            comments: this.state.comments
        }).then((reminder) => {
            this.props.updateReminder(reminder);
            this.props.history.push('/');
        }).catch((error) => {
            console.error(error);
            this.state.set({
                error
            })
        });
    }

    handleChange(event) {
        const field = event.target.name;
        const value = event.target.value;

        this.setState({
            [field]: value
        });
    }

    render() {
        return (
            <section className="container">
                <form onSubmit={this.save}>
                    <div className="form-group">
                        <label htmlFor="title">Title*</label>
                        <input
                            className="form-control"
                            disabled={this.state.disabled}
                            id="title"
                            name="title"
                            onChange={this.handleChange}
                            placeholder="Enter title"
                            required
                            type="text"
                            value={this.state.title}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="remindDate">Remind date*</label>
                        <input
                            className="form-control"
                            disabled={this.state.disabled}
                            min={this.state.minremindDate}
                            name="remindDate"
                            onChange={this.handleChange}
                            required
                            type="date" id="remindDate"
                            value={this.state.remindDate}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Enter amount</label>
                        <input
                            className="form-control"
                            disabled={this.state.disabled}
                            id="amount"
                            name="amount"
                            min="0"
                            onChange={this.handleChange}
                            step="0.25"
                            type="number"
                            value={this.state.amount}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Comments</label>
                        <textarea className="form-control"
                            className="form-control"
                            disabled={this.state.disabled}
                            id="comments"
                            name="comments"
                            onChange={this.handleChange}
                            placeholder="Comments"
                            value={this.state.comments}
                        />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button disabled={this.state.disabled} type="submit" className="btn btn-success btn-block">Update</button>
                        </div>
                        <div className="col-6">
                            <Link to="/" className="btn btn-outline-secondary btn-block">Back</Link>
                        </div>
                    </div>
                </form>
            </section>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        reminder: state.reminders.find(r => r.id === +props.match.params.id)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateReminder: (reminder) => {
            dispatch({
                type: 'UPDATE_REMINDER',
                payload: reminder
            })
        }
    }
}


export const ReminderDetails = connect(mapStateToProps, mapDispatchToProps)(_ReminderDetails);