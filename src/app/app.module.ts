import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Add this import
import { RouterModule } from '@angular/router'; // Add this import


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add this
    RouterModule, // Add this
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
