import React, { Component } from "react";

const Controller = (props) => {
  return (
    <div className="controller">
        <button id="start_stop" onClick={props.onStartStop}>
          {props.isStart ? 'Stop' : 'Start'}
        </button>
        <button id="reset" onClick={props.onReset}>Reset</button>
      </div>
  )
}

const formatTime = (timeLeftInSecond) => {
  let minute = Math.floor(timeLeftInSecond / 60);
  if (minute < 10) minute = '0' + minute;

  let second = timeLeftInSecond - 60 * minute;
  if (second < 10) second = '0' + second;

  return `${minute}:${second}`;
}

const Times = (props) => {
  return (
    <div className="times">
        <div className="times-content">
          <label id="timer-label">{props.timeLabel}</label>
          <span id="time-left">{formatTime(props.timeLeftInSecond)}</span>
        </div>
      </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);

    this.audioBeep = React.createRef();

    this.state = {
      breakLength: Number.parseInt(this.props.defaultBreakLength, 10),
      sessionLength: Number.parseInt(this.props.defaultSessionLength, 10),
      timeLabel: 'Session',
      timeLeftInSecond: Number.parseInt(this.props.defaultSessionLength, 10) * 60,
      isStart: false,
      timerInterval: null
    }

    this.onReset = this.onReset.bind(this);
    this.onStartStop = this.onStartStop.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
    this.phaseControl = this.phaseControl.bind(this);
  }

  onReset() {
    this.setState({
      breakLength: Number.parseInt(this.props.defaultBreakLength, 10),
      sessionLength: Number.parseInt(this.props.defaultSessionLength, 10),
      timeLabel: 'Session',
      timeLeftInSecond: Number.parseInt(this.props.defaultSessionLength, 10) * 60,
      isStart: false,
      timerInterval: null
    });

    this.audioBeep.current.pause();
    this.audioBeep.current.currentTime = 0;
    this.state.timerInterval && clearInterval(this.state.timerInterval);
  }

  onStartStop() {
    if (!this.state.isStart) {
      this.setState({
        isStart: !this.state.isStart,
        timerInterval: setInterval(() => {
          this.decreaseTimer();
          this.phaseControl();
        }, 1000)
      })
    } else {
      this.audioBeep.current.pause();
      this.audioBeep.current.currentTime = 0;
      this.state.timerInterval && clearInterval(this.state.timerInterval);

      this.setState({
        isStart: !this.state.isStart,
        timerInterval: null
      });
    }
  }

  decreaseTimer() {
    this.setState({
      timeLeftInSecond: this.state.timeLeftInSecond - 1
    });
  }

  phaseControl() {
    if (this.state.timeLeftInSecond === 0) {
      this.audioBeep.current.play();
    } else if (this.state.timeLeftInSecond === -1) {
      if (this.state.timeLabel === 'Session') {
        this.setState({
          timeLabel: 'Break',
          timeLeftInSecond: this.state.breakLength * 60
        });
      } else {
        this.setState({
          timeLabel: 'Session',
          timeLeftInSecond: this.state.sessionLength * 60
        });
      }
    }
  }

  render() {
    return (
      <div className="pomodoro-clock">

        <Times
          timeLabel={this.state.timeLabel}
          timeLeftInSecond={this.state.timeLeftInSecond}
        />

        <Controller
          onReset={this.onReset}
          onStartStop={this.onStartStop}
          isStart={this.state.isStart}
        />

        <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" ref={this.audioBeep}></audio>
      </div>
    );
  }
}

export {App};