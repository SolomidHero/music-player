import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { fetchSongs, setSong } from './store/actions'

class Playlist extends React.Component {
  state = {
    track: null
  };

  render() {
    let list = this.props.playlist.map(item => {
      return (
        <ListGroupItem
          key={item.id}
          onClick={() => this.setState({ track: item })}
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

  componentDidMount() {
    this.props.fetchSongs();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.track &&
      (!prevState.track || this.state.track.id !== prevState.track.id)) {
      this.props.setSong(this.state.track)
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSongs: () => {
      dispatch(fetchSongs());
    },
    setSong: song => {
      dispatch(setSong(song))
    }
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.playlist,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
