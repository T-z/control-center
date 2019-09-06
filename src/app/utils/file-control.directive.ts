import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: 'input[type=file]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FileValueAccessorDirective,
    multi: true
  }]
})
export class FileValueAccessorDirective implements ControlValueAccessor {

  onChange: (_: any) => void;

  @HostListener('change', ['$event.target.files']) 
  _handleInput(event: any) {
    if (this.onChange) {
      this.onChange(event);
    }
  }

  constructor(private element: ElementRef) { }

  writeValue(value: any) {
    this.element.nativeElement.value = value == null ? '' : value;
  }

  registerOnChange(fn: (_: any) => void) { this.onChange = fn; }

  registerOnTouched(fn: (_: any) => void) { }

  nOnDestroy() { }
  
}