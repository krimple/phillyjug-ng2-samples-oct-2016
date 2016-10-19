import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { SynthService } from './services/synth.service';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ControlSurfaceService } from './services/control-surface.service';
import { NoteTranslationService } from './services/note-translation.service';
import { MidiService } from './services/midi.service';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    ControlPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    SynthService,
    ControlSurfaceService,
    MidiService,
    NoteTranslationService],
  bootstrap: [AppComponent]
})
export class AppModule {
  // force booting the service instance w/o injecting into a component
  constructor(private controlSurfaceService: ControlSurfaceService) { }
}
