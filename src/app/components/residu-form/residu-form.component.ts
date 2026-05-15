import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResidusService } from '../../services/residus.service';
import { Residu } from '../../models/residu.model';

@Component({
  selector: 'app-residu-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './residu-form.component.html',
  styleUrls: ['./residu-form.component.css'],
})
export class ResidusFormComponent {
  private service = inject(ResidusService);

  onAfegit = output<void>();

  form: Omit<Residu, 'id'> = {
    nom: '',
    tipus: 'Reciclable',
    pes: 0,
    data: new Date(),
    estat: 'Pendent',
  };

  dataStr: string = new Date().toISOString().split('T')[0];

  tipusOptions: Residu['tipus'][] = ['Perillós', 'Reciclable', 'Especial'];

  submitForm() {
    if (!this.form.nom.trim() || this.form.pes <= 0) return;

    this.service.afegirResidu({
      ...this.form,
      data: new Date(this.dataStr),
    });

    this.onAfegit.emit();
  }
}
