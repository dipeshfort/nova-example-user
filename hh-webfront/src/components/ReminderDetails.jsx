import React, { Component } from 'react';
import { dateFormat } from '../utils';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class _ReminderDetails extends Component {

    constructor(props) {
        super(props);

        const todayStr = dateFormat(new Date());
        this.state = {
            minremindDate: todayStr,
            reminder: Object.assign({}, props.reminder)
        }

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }

    save(event) {
        event.preventDefault();
        this.props.updateReminder(this.state.reminder);
        this.props.history.push('/');
    }

    handleChange(event) {
        const field = event.target.name;
        const value = event.target.value;

        this.setState((prevState) => {
            const state = prevState;
            state.reminder[field] = value;
            return state;
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
                            id="title"
                            name="title"
                            onChange={this.handleChange}
                            placeholder="Enter title"
                            required
                            type="text"
                            value={this.state.reminder.title}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="remindDate">Remind date*</label>
                        <input
                            className="form-control"
                            min={this.state.reminder.minremindDate}
                            name="remindDate"
                            onChange={this.handleChange}
                            required
                            type="date" id="remindDate"
                            value={this.state.reminder.remindDate}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Enter amount</label>
                        <input
                            className="form-control"
                            id="amount"
                            name="amount"
                            min="0"
                            onChange={this.handleChange}
                            step="0.25"
                            type="number"
                            value={this.state.reminder.amount}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Comments</label>
                        <textarea className="form-control"
                            className="form-control"
                            id="comments"
                            name="comments"
                            onChange={this.handleChange}
                            placeholder="Comments"
                            value={this.state.reminder.comments}
                        />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button type="submit" className="btn btn-success btn-block">Update</button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        updateReminder: (updatePart) => {
            dispatch({
                type: 'UPDATE_REMINDER',
                payload: updatePart
            })
        }
    }

}

export const ReminderDetails = connect(null, mapDispatchToProps)(_ReminderDetails);