import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './Components/todo/todo.component';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TodoComponent,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CRUD';


}
