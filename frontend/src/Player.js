import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Col, ButtonGroup, Button, Row } from 'reactstrap';

import song1 from './data/music/Slow dancing in the dark.mp3';
import song2 from './data/music/Test Drive.mp3';
import { setSong } from './store/actions'

import './stylesheets/Player.css'


function convertTime(time) {
  if (!isNaN(time)) {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }
}

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      track: this.props.songInfo,
      player: "stopped"
    };

    this.storeSong = newSong => this.props.dispatch(setSong(newSong))
  }

  renderPlayerTime(){
    const currentTime = convertTime(this.state.currentTime)
    const duration = convertTime(this.state.duration)
    return <> {
      this.state.player === "playing" || this.state.player === "stopped" ? (
        <span>
          {currentTime ? currentTime : "--:--"} / {duration ? duration : "--:--"}
        </span>
      ) : ""
    } </>
  }

  render() {
    const songs = [
      { id: 1, title: "Slow Dancing In The Dark" },
      { id: 2, title: "Test Drive" }
    ]
    let list = songs.map(item => {
      return (
        <ListGroupItem
          key={item.id}
          onClick={() => this.setState({ track: { title: item.title, id: item.id }})}
        >
          {item.title}
        </ListGroupItem>
      );
    });

    return (
      <>
        <Row>
          <Col md="7">
          <h2>
            { this.state.track.title ? this.state.track.title : "--" }
          </h2>
          </Col>
          <Col md="3">
            { this.renderPlayerTime() }
          </Col>
          <Col md="2">
          <ButtonGroup width="100%">
            {this.state.player === "stopped" && (
              <Button disabled={!this.state.track.id} onClick={ () => this.setState({ player: "playing" }) }>
                Play
              </Button>
            )}
            {this.state.player === "playing" && (
              <Button onClick={ () => this.setState({ player: "stopped" }) }>
                Pause
              </Button>
            )}
          </ButtonGroup>
          </Col>
        </Row>
        <ListGroup>{list}</ListGroup>
        <audio ref={ ref => this.player = ref } />
      </>
    );
  }

  playerStateHook(prevState) {
    if (this.state.player === "stopped") {
      this.player.pause()
    } else if (
      this.state.player === "playing" &&
      prevState.player === "stopped"
    ) {
      this.player.play();
    }
  }

  playerSongChangeHook() {
    let track;
    switch (this.state.track.title) {
      case "Slow Dancing In The Dark":
        track = song1
        break;
      case "Test Drive":
        track = song2
        break;
      default:
        break;
    }
    if (track) {
      this.player.src = track;
      this.player.play()
      this.setState({ player: "playing" })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.player !== prevState.player) {
      this.playerStateHook(prevState)
    }

    if (this.state.track.id !== prevState.track.id) {
      this.playerSongChangeHook()
    }
  }

  componentDidMount() {
    if (this.state.track.src) {
      this.player.src = this.state.track.src
      this.player.currentTime = this.state.track.time
    }
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
    });

  }

  componentWillUnmount() {
    this.storeSong({
      ...this.state.track,
      src: this.player.src,
      time: this.state.currentTime
    })
    this.player.removeEventListener("timeupdate", () => { });
  }
}

const mapStateToProps = function (state) {
  return {
    songInfo: state.song,
  }
}

export default connect(mapStateToProps)(Player);
