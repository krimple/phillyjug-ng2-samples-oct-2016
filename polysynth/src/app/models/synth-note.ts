import {Subject} from 'rxjs';
import {SynthInputMessage, MESSAGE_TYPE} from './synth-input-message';
import {NoteTranslationService} from '../services/note-translation.service';
import {Oscillator} from './oscillator';
import 'rxjs/add/operator/filter';

export class SynthNote {
    oscillator: Oscillator;

    constructor(private note: string,
                private waveForm: string,
                private noteTranslationService: NoteTranslationService,
                private noteStream: Subject<SynthInputMessage>,
                private audioContext: AudioContext) {

        this.oscillator = new Oscillator(noteTranslationService.getFrequency(note), waveForm, audioContext);

        this.noteStream
            .filter((noteMessage: SynthInputMessage) => {
                return (noteMessage.note === note ||
                        noteMessage.messageType === MESSAGE_TYPE.BEND ||
                        noteMessage.messageType === MESSAGE_TYPE.SET_WAVEFORM ||
                        noteMessage.messageType === MESSAGE_TYPE.SYSEX ||
                        noteMessage.messageType === MESSAGE_TYPE.SET_VOLUME);
                })
                .subscribe((noteMessage: SynthInputMessage) => {
                        switch (noteMessage.messageType) {
                            case  MESSAGE_TYPE.SET_WAVEFORM:
                                this.oscillator.setWaveForm(noteMessage.value);
                                break;
                            case MESSAGE_TYPE.KEYDOWN:
                                this.oscillator.play();
                                break;
                            case MESSAGE_TYPE.KEYUP:
                                this.oscillator.stop();
                                break;
                            case MESSAGE_TYPE.SYSEX:
                                this.oscillator.stop();
                                break;
                            case MESSAGE_TYPE.BEND:
                                this.oscillator.bend(parseInt(noteMessage.value, 10));
                                break;
                            case MESSAGE_TYPE.SET_VOLUME:
                                this.oscillator.adjustVolume(parseFloat(noteMessage.value));
                                break;
                            default:
                                console.error('Invalid message to synth note ', noteMessage);
                        }
                    });
            }
    }