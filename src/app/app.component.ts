import { Component, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ResidusService } from './services/residus.service';
import { ResidusListComponent } from './components/residu-list/residu-list.component';
import { ResidusFormComponent } from './components/residu-form/residu-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ResidusListComponent, ResidusFormComponent, DatePipe, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  vista = signal<'llista' | 'formulari'>('llista');
  today = new Date();

  constructor(public residusService: ResidusService) {}

  canviarVista(v: 'llista' | 'formulari') {
    this.vista.set(v);
  }
}
