import { Injectable, signal, computed } from '@angular/core';
import { Residu } from '../models/residu.model';

@Injectable({ providedIn: 'root' })
export class ResidusService {
  private _residus = signal<Residu[]>([
    {
      id: 1,
      nom: 'Oli Industrial',
      tipus: 'Perillós',
      pes: 25.5,
      data: new Date('2025-03-10'),
      estat: 'Pendent',
    },
    {
      id: 2,
      nom: 'Cartró i Paper',
      tipus: 'Reciclable',
      pes: 8.2,
      data: new Date('2025-03-12'),
      estat: 'Processat',
    },
    {
      id: 3,
      nom: 'Bateries de Plom',
      tipus: 'Especial',
      pes: 3.7,
      data: new Date('2025-04-01'),
      estat: 'Pendent',
    },
    {
      id: 4,
      nom: 'Plàstic Industrial',
      tipus: 'Reciclable',
      pes: 14.0,
      data: new Date('2025-04-05'),
      estat: 'Processat',
    },
    {
      id: 5,
      nom: 'Dissolvents',
      tipus: 'Perillós',
      pes: 6.8,
      data: new Date('2025-04-10'),
      estat: 'Pendent',
    },
  ]);

  private nextId = 6;

  readonly residus = this._residus.asReadonly();

  readonly pendents = computed(() =>
    this._residus().filter((r) => r.estat === 'Pendent')
  );

  readonly processats = computed(() =>
    this._residus().filter((r) => r.estat === 'Processat')
  );

  readonly totalKg = computed(() =>
    this._residus().reduce((acc, r) => acc + r.pes, 0)
  );

  afegirResidu(residu: Omit<Residu, 'id'>): void {
    this._residus.update((list) => [
      ...list,
      { ...residu, id: this.nextId++ },
    ]);
  }

  toggleEstat(id: number): void {
    this._residus.update((list) =>
      list.map((r) =>
        r.id === id
          ? { ...r, estat: r.estat === 'Pendent' ? 'Processat' : 'Pendent' }
          : r
      )
    );
  }

  eliminarResidu(id: number): void {
    this._residus.update((list) => list.filter((r) => r.id !== id));
  }
}
