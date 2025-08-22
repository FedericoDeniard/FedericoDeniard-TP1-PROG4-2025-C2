import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'warning-secondary' | 'warning-text' | 'outline' | 'ghost';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  @Input() type: ButtonType = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled: boolean = false;
  @Input() iconOnly: boolean = false;
  @Input() icon: string = '';
  @Input() fullWidth: boolean = false;
  @Input() ariaLabel: string = '';

  get buttonClasses(): string {
    const classes: string[] = [];

    // Base classes
    classes.push('font-title font-medium transition-all');

    // Type classes
    switch (this.type) {
      case 'primary':
        classes.push('bg-[#12874e] text-white hover:bg-[#0f6b3f]');
        break;
      case 'secondary':
        classes.push('bg-white border-2 border-[#12874e] text-[#12874e] hover:bg-[#f0f9f4]');
        break;
      case 'tertiary':
        classes.push('bg-transparent text-[#12874e] hover:bg-[#f0f9f4]');
        break;
      case 'danger':
        classes.push('bg-[#dc2626] text-white hover:bg-[#b91c1c]');
        break;
      case 'warning':
        classes.push('bg-[#f59e0b] text-white hover:bg-[#d97706]');
        break;
      case 'warning-secondary':
        classes.push('bg-transparent text-[#f59e0b] border-2 border-[#f59e0b] hover:bg-[#f59e0b] hover:text-white');
        break;
      case 'warning-text':
        classes.push('bg-transparent text-[#f59e0b] hover:bg-[#fffbeb]');
        break;
      case 'outline':
        classes.push('bg-transparent text-[#12874e] border-2 border-[#12874e] hover:bg-[#12874e] hover:text-white');
        break;
      case 'ghost':
        classes.push('bg-transparent text-[#12874e] hover:bg-[#f0fdf4]');
        break;
    }

    // Size classes
    if (this.iconOnly) {
      switch (this.size) {
        case 'xs':
          classes.push('p-1.5 rounded w-8 h-8 text-[12px]');
          break;
        case 'sm':
          classes.push('p-2 rounded-lg w-10 h-10 text-[14px]');
          break;
        case 'md':
          classes.push('p-3 rounded-lg w-12 h-12 text-[16px]');
          break;
        case 'lg':
          classes.push('p-4 rounded-lg w-14 h-14 text-[18px]');
          break;
        case 'xl':
          classes.push('p-5 rounded-xl w-16 h-16 text-[20px]');
          break;
        case '2xl':
          classes.push('p-6 rounded-xl w-20 h-20 text-[24px]');
          break;
      }
      classes.push('flex items-center justify-center');
    } else {
      switch (this.size) {
        case 'xs':
          classes.push('px-2 py-1 rounded text-[12px] leading-[16px] min-w-[60px]');
          break;
        case 'sm':
          classes.push('px-3 py-1.5 rounded-md text-[14px] leading-[20px] min-w-[70px]');
          break;
        case 'md':
          classes.push('px-4 py-2 rounded-lg text-[16px] leading-[24px] min-w-[90px]');
          break;
        case 'lg':
          classes.push('px-5 py-2.5 rounded-lg text-[18px] leading-[28px] min-w-[110px]');
          break;
        case 'xl':
          classes.push('px-6 py-3 rounded-xl text-[20px] leading-[32px] min-w-[130px]');
          break;
        case '2xl':
          classes.push('px-8 py-4 rounded-xl text-[24px] leading-[36px] min-w-[150px]');
          break;
      }
    }

    // Disabled state
    if (this.disabled) {
      classes.push('bg-[#d5d7da] text-[#8e8e8e] cursor-not-allowed opacity-60');
      classes.push('hover:bg-[#d5d7da] hover:text-[#8e8e8e]'); // Override hover effects
      if (this.type === 'secondary' || this.type === 'outline' || this.type === 'warning-secondary') {
        classes.push('border-[#d5d7da]');
      }
    }

    // Full width
    if (this.fullWidth) {
      classes.push('w-full');
    }

    // Icon with text
    if (this.icon && !this.iconOnly) {
      classes.push('flex items-center gap-2');
    }

    return classes.join(' ');
  }
}
