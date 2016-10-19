import { Injectable } from '@angular/core';
import { SynthInputMessage } from '../models/synth-input-message';
import { ReplaySubject } from 'rxjs';
import { SynthNote } from '../models/synth-note';
import { NoteTranslationService } from './note-translation.service';

@Injectable()
export class SynthService {

  private currentWaveForm = 'sawtooth';

  // take that, I WANT MY JAVASCRIPT TO BE SIMPLE PEOPLE!!! :)
  private audioContext: AudioContext =
    new (window['AudioContext'] || window['webkitAudioContext'])();

  private notes: Array<SynthNote>;


  // central switchboard observable / observer
  private messageQueue$: ReplaySubject<SynthInputMessage>;

  constructor(noteTranslationService: NoteTranslationService) {
    // keep the last 1,000 messages (why not?)
    this.messageQueue$ = new ReplaySubject<SynthInputMessage>(1000);

    this.notes = [
      new SynthNote('C2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('D2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('E2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('F2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('G2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('A2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('B2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('C#2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('D#2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('F#2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('G#2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('A#2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('C3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('D3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('E3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('F3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('G3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('A3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('B3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('C#3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('D#3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('F#3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('G#3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('A#3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('C4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('D4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('E4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('F4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('G4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('A4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('B4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('C#4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('D#4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('F#4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('G#4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext),
      new SynthNote('A#4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext)
    ];
  }

  // send a message to the synth
  public receiveMessage(message: SynthInputMessage) {
    console.dir(message);
    this.messageQueue$.next(message);
  }

}
