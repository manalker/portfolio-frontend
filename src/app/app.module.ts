import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProjectComponent } from './components/project/project.component';

@NgModule({
  declarations: [
    // ❌ Supprime AppComponent et ProjectComponent ici
  ],
  imports: [BrowserModule],
  bootstrap: [] // ❌ Supprime AppComponent d’ici aussi
})
export class AppModule {}
