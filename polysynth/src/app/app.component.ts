import { Component } from '@angular/core';
import { SynthService } from './services/synth.service';
import { SynthInputMessage } from './models/synth-input-message';
import { MidiService } from './services/midi.service';

@Component({
  selector: 'polysynth-root',
  // templateUrl: './app.component.html',
  template: `
    <polysynth-control-panel (onsettingchange)="sendMessage($event)"></polysynth-control-panel>
    <polysynth-keyboard (onnote)="sendMessage($event)"></polysynth-keyboard>
  `
})
export class AppComponent {
  constructor(private synth: SynthService, private midi: MidiService) {
    midi.midiNotes$.subscribe((message: SynthInputMessage) => {
      synth.receiveMessage(message);
    });
  }

  sendMessage(message: SynthInputMessage) {
    this.synth.receiveMessage(message);
  }

}
