import { Component, signal, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ResidusService } from '../../services/residus.service';
import { Residu } from '../../models/residu.model';

@Component({
  selector: 'app-residu-list',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './residu-list.component.html',
  styleUrls: ['./residu-list.component.css'],
})
export class ResidusListComponent {
  private service = inject(ResidusService);

  filtre = signal<'tots' | 'pendent' | 'processat'>('tots');

  get residusMostrats(): Residu[] {
    const f = this.filtre();
    const tots = this.service.residus();
    if (f === 'pendent') return tots.filter((r) => r.estat === 'Pendent');
    if (f === 'processat') return tots.filter((r) => r.estat === 'Processat');
    return tots;
  }

  setFiltre(f: 'tots' | 'pendent' | 'processat') {
    this.filtre.set(f);
  }

  toggleEstat(id: number) {
    this.service.toggleEstat(id);
  }

  eliminar(id: number) {
    if (confirm('Segur que vols eliminar aquest residu?')) {
      this.service.eliminarResidu(id);
    }
  }

  tipusClass(tipus: string): string {
    return {
      Perillós: 'badge--danger',
      Reciclable: 'badge--success',
      Especial: 'badge--warning',
    }[tipus] ?? '';
  }
}
