'use strict';
import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import moment from 'moment';

export default class NoteInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleContentInput = this.handleContentInput.bind(this);
    this.state = {
      content: '',
    };
  }

  handleContentInput(e) {
    this.setState({
      content: e.target.value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let content = this.state.content;
    console.log('content: ' + content);
    if (this.props.onSubmit) {
      this.props.onSubmit({
        content
      });
    }
  }

  render() {
    const items = this.props.items;
    return (
      <Grid>
        <Row className='show-grid'>
          <Col md={6}>
            <form onSubmit={this.handleFormSubmit}>
              <textarea type="text" name="content"
                value={this.state.content}
                onChange={this.handleContentInput}
                />
              <br />
              <button name="submit">Submit</button>
            </form>
          </Col>
          <Col md={6}>
            {
              items.map((item, idx) => {
                let content = item.content;
                let date = moment(item._id.slice(0, -37)).format('LLLL');
                return (
                  <div key={'item' + idx}>
                    <h4>{date}</h4>
                    <pre>{content}</pre>
                  </div>
                );
              })
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}
