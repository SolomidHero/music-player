import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

class Playlist extends React.Component {
  state = {
    selectedTrack: null
  };

  render() {
    const list = [
      { id: 1, title: "Slow Dancing In The Dark" },
      { id: 2, title: "Test Drive" }
    ].map(item => {
      return (
        <ListGroupItem
          key={item.id}
          onClick={() => this.setState({ selectedTrack: item.title })}
          action
        >
          {item.title}
        </ListGroupItem>
      );
    });

    return (
      <>
        <ListGroup>
          {list}
        </ListGroup>
      </>
    );
  }
}