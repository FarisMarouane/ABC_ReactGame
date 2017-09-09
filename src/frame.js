import React, { Component } from 'react';
import './App.css';
import Alphabet from './alphabet.json';
import classNames from 'classnames';

class Frame extends Component {
  constructor (props) {
    super(props);

    this.state = {
      alphabet: Alphabet,
      position: 0,
      tick: 0,
      sound: true,
      random: false
    };
  }

  generateRandom (min, max) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (num === this.state.position) ? this.generateRandom(min, max) : num;
  }

  randomPosition () {
    // let random = this.generateRandom(0, 25);
    this.setState({
      random: !this.state.random
    });
  }

  next () {
    let audio = document.querySelector('audio[data-name="wordSound"]');
    this.setState({
      tick: this.state.tick + 1
    });

    if (this.state.random) {
      if (this.state.tick === 2) {
        this.setState({
          position: this.generateRandom(0, 25),
          tick: 0
        });
      }
    } else {
      if (this.state.tick === 2) {
        if (this.state.position < 25) {
          this.setState({
            position: this.state.position + 1,
            tick: 0
          });
        } else {
          this.setState({
            position: 0,
            tick: 0
          });
        }
      }
    }

    if (this.state.tick === 1 || this.state.tick === 0) {
      if (this.state.sound) {
        audio.currentTime = 0;
        audio.play();
      }
    }
    console.log(this.state.tick);
  }

  previous () {
    let audio = document.querySelector('audio[data-name="wordSound"]');
    this.setState({
      tick: this.state.tick + 1
    });

    if (this.state.random) {
      if (this.state.tick === 2) {
        this.setState({
          position: this.generateRandom(0, 25),
          tick: 0
        });
      }
    } else {
      if (this.state.tick === 2) {
        if (this.state.position > 0) {
          this.setState({
            position: this.state.position - 1,
            tick: 0
          });
        } else {
          this.setState({
            position: 25,
            tick: 0
          });
        }
      }
    }

    if (this.state.tick === 1 || this.state.tick === 0) {
      if (this.state.sound) {
        audio.currentTime = 0;
        audio.play();
      }
    }
  }

  playSoundAgain () {
    let wordAudio = document.querySelector('audio[data-name="wordSound"]');
    let letterAudio = document.querySelector('audio[data-name="letterSound"]');

    if (this.state.tick !== 0) {
      if (this.state.sound) {
        wordAudio.currentTime = 0;
        wordAudio.play();
      }
    } else {
      if (this.state.sound) {
        letterAudio.currentTime = 0;
        letterAudio.play();
      }
    }
  }

  turnSound () {
    this.setState({
      sound: !this.state.sound
    });
  }

  componentDidMount () {
    let letterAudio = document.querySelector('audio[data-name="letterSound"]');
    if (this.state.sound === true) {
      letterAudio.currentTime = 0;
      letterAudio.play();
    }
  }

  componentDidUpdate () {
    let letterAudio = document.querySelector('audio[data-name="letterSound"]');
    if (this.state.tick === 0 && this.state.sound === true) {
      letterAudio.currentTime = 0;
      letterAudio.play();
    }
  }

  render () {
    let isHide = this.state.tick;
    return (
      <div className='game'>

        <audio src={this.state.alphabet[this.state.position].letterSound} data-name='letterSound' />

        <span className='random-label'>Random Letters:</span>
        <label className='switch'>
          <input type='checkbox' defaultValue='false' onClick={() => this.randomPosition()} />
          <div className='slider round' />
        </label>

        <span className='sound'>Turn sound on/off:</span>
        <label className='switch'>
          <input type='checkbox' checked={this.state.sound} onClick={() => this.turnSound()} />
          <div className='slider round' />
        </label>

        <div className='fields'>
          <div className='field-block'>
            {this.state.alphabet[this.state.position].letter}
          </div>
        </div>
        <div className='buttons'>
          <a href='#' className='button prev' onClick={() => this.previous()}>Previous</a>
          <a href='#' className='button sound' onClick={() => this.playSoundAgain()}>Play Sound Again </a>
          <a href='#' className='button next' onClick={() => this.next()}>Next</a>
        </div>
        <div className='fields'>
          <div className='field-block'>
            <div className='left-field'>
              <img src={this.state.alphabet[this.state.position].image} className={classNames('letter-image', { hide: isHide === 0 })} />
            </div>
            <div className='left-field'>
              <div className={classNames('word', {hide: isHide !== 2})}>
                <audio src={this.state.alphabet[this.state.position].wordSound} data-name='wordSound' />
                {this.state.alphabet[this.state.position].word}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Frame;
