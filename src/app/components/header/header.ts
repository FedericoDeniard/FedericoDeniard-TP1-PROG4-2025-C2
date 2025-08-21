import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class Header {
  private _count = 1

  get count(): number {
    return this._count;
  }

  increment(): void {
    this._count++;
  }

  decrement(): void {
    this._count--;
  }
}
