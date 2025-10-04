import React, { Component } from "react";
import './Pomodoro.css';

const Controller = (props) => {
  return (
    <div className="pomodoro-controller">
      <button
        id="start_stop"
        onClick={props.onStartStop}
        className="pomodoro-btn"
      >
        {props.isStart ? 'Stop' : 'Start'}
      </button>
      <button
        id="reset"
        onClick={props.onReset}
        className="pomodoro-btn pomodoro-btn-reset"
      >
        Reset
      </button>
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
    };

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
      <div style={{
        maxWidth: 400,
        margin: '2rem auto',
        padding: '2rem',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f9fafb 100%)',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        fontFamily: 'Inter, Arial, sans-serif',
        textAlign: 'center'
      }}>
        <h2 style={{ fontWeight: 700, fontSize: '2rem', color: '#3730a3', marginBottom: '1.5rem' }}>⏳ Pomodoro Timer</h2>
        <div style={{ marginBottom: '2rem' }}>
          <Times
            timeLabel={this.state.timeLabel}
            timeLeftInSecond={this.state.timeLeftInSecond}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Controller
            onReset={this.onReset}
            onStartStop={this.onStartStop}
            isStart={this.state.isStart}
          />
        </div>
        <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" ref={this.audioBeep}></audio>
      </div>
    );
  }
}

export {App};