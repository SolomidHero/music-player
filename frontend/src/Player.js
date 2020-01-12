import React from 'react';
import { connect } from 'react-redux';
import { Col, ButtonGroup, Button, Row } from 'reactstrap';
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
    return (
      <>
        <Row>
          <Col md="7">
          <h2>
            { this.props.track.title ? this.props.track.title : "--" }
          </h2>
          </Col>
          <Col md="3">
            { this.renderPlayerTime() }
          </Col>
          <Col md="2">
          <ButtonGroup width="100%">
            {this.state.player === "stopped" && (
              <Button disabled={!this.props.track.id} onClick={ () => this.setState({ player: "playing" }) }>
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
        <audio /* controls */ ref={ ref => this.player = ref } />
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
    if (this.props.track.src) {
      track = require(`${this.props.track.src}`)
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

    if (this.props.track.id !== prevProps.track.id) {
      this.playerSongChangeHook()
    }
  }

  componentDidMount() {
    if (this.props.track.src) {
      this.player.src = this.props.track.src
      this.player.currentTime = this.props.track.time
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
      ...this.props.track,
      src: this.player.src,
      time: this.state.currentTime
    })
    this.player.removeEventListener("timeupdate", () => { });
  }
}

const mapStateToProps = state => {
  return {
    track: state.player.song,
  }
}

export default connect(mapStateToProps)(Player);
