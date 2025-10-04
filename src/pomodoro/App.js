import React, { Component } from "react";
import './Pomodoro.css';
import { ClockIcon } from '@heroicons/react/24/outline';

const LOCAL_STORAGE_KEY = 'pomodoroApp.state';

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
    // Try to restore state from localStorage
    let savedState = null;
    try {
      savedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    } catch (e) {}
    this.state = savedState || {
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

  componentDidMount() {
    // If timer was running, adjust timeLeftInSecond based on elapsed time
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const state = JSON.parse(saved);
      if (state.isStart && state.lastTimestamp) {
        const now = Date.now();
        const elapsed = Math.floor((now - state.lastTimestamp) / 1000);
        let newTime = state.timeLeftInSecond - elapsed;
        if (newTime < 0) newTime = 0;
        this.setState({
          ...state,
          timeLeftInSecond: newTime,
          isStart: false, // Always pause on reload
          timerInterval: null
        });
      }
    }
  }

  onReset() {
    this.setState({
      breakLength: Number.parseInt(this.props.defaultBreakLength, 10),
      sessionLength: Number.parseInt(this.props.defaultSessionLength, 10),
      timeLabel: 'Session',
      timeLeftInSecond: Number.parseInt(this.props.defaultSessionLength, 10) * 60,
      isStart: false,
      timerInterval: null
    }, this.saveState);

    this.audioBeep.current.pause();
    this.audioBeep.current.currentTime = 0;
    this.state.timerInterval && clearInterval(this.state.timerInterval);
  }

  onStartStop() {
    if (!this.state.isStart) {
      const timerInterval = setInterval(() => {
        this.decreaseTimer();
        this.phaseControl();
      }, 1000);
      this.setState({
        isStart: true,
        timerInterval,
        lastTimestamp: Date.now()
      }, this.saveState);
    } else {
      this.audioBeep.current.pause();
      this.audioBeep.current.currentTime = 0;
      this.state.timerInterval && clearInterval(this.state.timerInterval);
      this.setState({
        isStart: false,
        timerInterval: null,
        lastTimestamp: null
      }, this.saveState);
    }
  }

  decreaseTimer() {
    this.setState(prev => {
      const newTime = prev.timeLeftInSecond - 1;
      return { timeLeftInSecond: newTime, lastTimestamp: Date.now() };
    }, this.saveState);
  }

  phaseControl() {
    if (this.state.timeLeftInSecond === 0) {
      this.audioBeep.current.play();
    } else if (this.state.timeLeftInSecond === -1) {
      if (this.state.timeLabel === 'Session') {
        this.setState({
          timeLabel: 'Break',
          timeLeftInSecond: this.state.breakLength * 60
        }, this.saveState);
      } else {
        this.setState({
          timeLabel: 'Session',
          timeLeftInSecond: this.state.sessionLength * 60
        }, this.saveState);
      }
    }
  }
  saveState = () => {
    // Save all state except timerInterval and audio ref
    const { timerInterval, ...toSave } = this.state;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
      ...toSave,
      lastTimestamp: this.state.isStart ? Date.now() : null
    }));
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
        <h2 style={{ fontWeight: 700, fontSize: '2rem', color: '#3730a3', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5em' }}>
          <ClockIcon style={{ width: 28, height: 28 }} />
          Pomodoro Timer
        </h2>
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