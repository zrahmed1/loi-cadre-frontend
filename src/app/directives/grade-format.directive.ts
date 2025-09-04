import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[gradeFormat]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GradeFormatDirective),
      multi: true,
    },
  ],
})
export class GradeFormatDirective implements ControlValueAccessor {
  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};
  private disabled = false;

  constructor(private el: ElementRef<HTMLInputElement>, private r: Renderer2) {}

  writeValue(value: string | null): void {
    const raw = (value ?? '').toString();
    const formatted = this.formatForView(raw);
    this.r.setProperty(this.el.nativeElement, 'value', formatted);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.r.setProperty(this.el.nativeElement, 'disabled', isDisabled);
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    // remove dots and non-alphanumeric, keep uppercase
    let raw = input.value.replace(/\./g, '').replace(/[^A-Za-z0-9]/g, '');
    raw = raw.toUpperCase();

    // propagate raw value to the form model
    this.onChange(raw);

    // format for display
    const formatted = this.formatForView(raw);
    this.r.setProperty(this.el.nativeElement, 'value', formatted);

    // set caret to end (simple approach)
    setTimeout(() => {
      const pos = formatted.length;
      try {
        this.el.nativeElement.setSelectionRange(pos, pos);
      } catch {}
    }, 0);
  }

  @HostListener('blur')
  _onBlur() {
    this.onTouched();
  }

  private formatForView(raw: string): string {
    if (!raw) return '';
    const groups = raw.match(/.{1,2}/g) || [];
    return groups.join('.');
  }
}
