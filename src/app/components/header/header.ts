import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class Header {
  private _count = 1
  private _selected = 'home';

  get count(): number {
    return this._count;
  }

  increment(): void {
    this._count++;
  }

  decrement(): void {
    this._count--;
  }

  get selected(): string {
    return this._selected;
  }

  setSelected(selected: string) {
    this._selected = selected;
  }

  isSelected(linkName: string): boolean {
    return this._selected === linkName;
  }

}
