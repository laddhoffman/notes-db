import React from 'react';
import ReactDOM from 'react-dom';
import PouchDB from 'pouchdb';
import moment from 'moment';
import uuid from 'uuid';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import NoteInput from './notes';

var dbUrl = 'https://db.laddhoffman.com/notes';

class Page extends React.Component {
  constructor() {
    super();
    this.handleContentSubmit = this.handleContentSubmit.bind(this);
    this.getItems = this.getItems.bind(this);
    this.db = new PouchDB(dbUrl);
    this.state = {
      items: [],
    };
    this.getItems();
  }

  getItems() {
    this.db.allDocs({
      'include_docs': true,
    }).then(r => {
      this.setState({
        items: r.rows.map(row => {
          return row.doc;
        }).sort((a, b) => {
          let date1 = moment(a._id.slice(0, -37));
          let date2 = moment(b._id.slice(0, -37));
          if (date1.isBefore(date2)) {
            return -1;
          } else if (date1.isAfter(date2)) {
            return 1;
          } else {
            return 0;
          }
        }).reverse(),
      });
			console.log('items returned, result:', this.state.items);
    });
  }

  handleContentSubmit(data) {
    console.log('data.content:' + data.content);
    let date = moment().toISOString();
    let docId = date + '-' + uuid();
    let doc = {
      _id: docId,
      content: data.content
    };
    console.log('doc:', doc);
    this.db.put(doc).then(res => {
      console.log('res:', res);
    })
    .catch(err => {
      console.log('error:', err);
    })
    .then(() => {
      return this.getItems();
    });
  }

  render() {
    const items = this.state.items;
    return (
      <div>
        Hi.
        <NoteInput items={items} onSubmit={this.handleContentSubmit}/>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);


