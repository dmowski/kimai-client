import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../actions/postActions";

class Postform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  async onSubmit(e) {
    e.preventDefault();
    const post = {
      title: this.state.title,
      body: this.state.body
    };

    this.props.createPost(post);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <div>
        <h1>Add Post</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            Title: <br />
            <input
              type="text"
              onChange={this.onChange}
              value={this.state.title}
              name="title"
            />
          </label>
          <br />
          <label>
            Body: <br />
            <textarea
              onChange={this.onChange}
              name="body"
              value={this.state.body}
            />
          </label>
          <br />
          <button type="submit">submit</button>
        </form>
        <hr />
      </div>
    );
  }
}

Postform.propTypes = {
  createPost: PropTypes.func.isRequired
};

export default connect(null, { createPost })(Postform);
