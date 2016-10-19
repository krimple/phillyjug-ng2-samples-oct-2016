import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SynthInputMessage, MESSAGE_TYPE } from '../models/synth-input-message';

@Injectable()

export class MidiService {

  private noteTransforms = {
    48: 'C2', 49: 'D#2', 50: 'F2', 51: 'F#2', 52: 'G2', 53: 'A#2',
    54: 'C3', 55: 'D#3', 56: 'F3', 57: 'F#3', 58: 'G3', 59: 'A#3'
  };

  input: any;
  waveforms = ['sawtooth', 'sine', 'square', 'triangle'];
  currentWaveForm = 0;
  midiNotes$: Subject<SynthInputMessage> = new Subject<SynthInputMessage>();

  constructor() {
    if (window.navigator['requestMIDIAccess']) {
      let service = this;   // async callbacks from other objects like navigator don't fix 'this'
      window.navigator['requestMIDIAccess']().then(
        (access) => {
          // TODO - export list of inputs for UI control panel assignment
          let input1key = access.inputs.keys().next();
          service.input = access.inputs.get(input1key.value);

          // set up listener
          service.input.open()
            .then((channelInputStream$: any) => {
              window['channelInputStream$'] = channelInputStream$;
              channelInputStream$.onmidimessage = (message) => {
                console.dir('got message');
                console.log(message.data);
                let note = this.noteTransforms[message.data[1]];
                console.log('note', note);
                if (message.data[1] === 59 && message.data[0] === 144) {
                  this.currentWaveForm = this.currentWaveForm > 3 ? 0 : this.currentWaveForm + 1;
                  console.log('current waveform is', this.currentWaveForm, this.waveforms[this.currentWaveForm]);
                  this.midiNotes$.next(new SynthInputMessage(MESSAGE_TYPE.SET_WAVEFORM,
                                       this.waveforms[this.currentWaveForm]));
                } else {
                  switch (message.data[0]) {
                    case 144:
                      this.midiNotes$.next(new SynthInputMessage(MESSAGE_TYPE.KEYDOWN, null, note));
                      break;
                    case 128:
                      this.midiNotes$.next(new SynthInputMessage(MESSAGE_TYPE.KEYUP, null, note));
                      break;
                    default:
                      console.error('invalid message, ignoring.');
                  }
                }
              };
            });
        });
    }
  }
}
