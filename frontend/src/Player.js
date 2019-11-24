import React from 'react';
import song1 from './data/music/Slow dancing in the dark.mp3';
import song2 from './data/music/Test Drive.mp3';
import { ListGroup, ListGroupItem, Col, ButtonGroup, Button, Row } from 'reactstrap';
// import Math from Math;
import './stylesheets/Player.css'


function convertTime(time) {
  if (!isNaN(time)) {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }
}

class Player extends React.Component {
  state = {
    selectedTrack: null,
    player: "stopped"
  };

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
          onClick={() => this.setState({ selectedTrack: item.title })}
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
            { this.state.selectedTrack ? this.state.selectedTrack : "--" }
          </h2>
          </Col>
          <Col md="3">
            { this.renderPlayerTime() }
          </Col>
          <Col md="2">
          <ButtonGroup width="100%">
            {this.state.player === "stopped" && (
              <Button disabled={!this.state.selectedTrack} onClick={ () => this.setState({ player: "playing" }) }>
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

  playerStateHook(prevProps, prevState) {
    if (this.state.player === "stopped") {
      this.player.pause();
    } else if (
      this.state.player === "playing" &&
      prevState.player === "stopped"
    ) {
      this.player.play();
    }
  }

  playerSongChangeHook(prevProps, prevState) {
    let track;
    switch (this.state.selectedTrack) {
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
      this.playerStateHook(prevProps, prevState)
    }

    if (this.state.selectedTrack !== prevState.selectedTrack) {
      this.playerSongChangeHook(prevProps, prevState)
    }
  }

  componentDidMount() {
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
    });
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => { });
  }
}

export default Player;
