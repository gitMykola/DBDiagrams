import { Directive, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[widthShift]'
})
export class WidthShiftDirective implements AfterViewInit {
  private enabled: boolean = false;
  private show: boolean = false;
  private mouseDown: Observable<boolean>;
  private mouseUp: Observable<Event>;
  private mouseWheel: Observable<number>;
  private mouseShow: Observable<boolean>;
  private setDefault: Observable<boolean>;
  private width: number;
  @Input('minWidth') minWidth: number;
  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    const self = this;
    this.width = this.el.nativeElement.clientWidth;
    this.mouseDown = fromEvent(this.el.nativeElement, 'mousedown').pipe(
      map((e: MouseEvent) => {
        if (e.buttons == 1 && this.width - e.x < 4) {
          this.enabled = true;
        }
        return this.enabled;
      })
    );
    this.mouseUp = fromEvent(document.body, 'mouseup');
    this.mouseWheel = fromEvent(document.body, 'mousemove').pipe(
      map((e: MouseEvent) => {
        return this.enabled ? e.x : 0;
      })
    );
    this.mouseShow = fromEvent(this.el.nativeElement, 'mousemove').pipe(
      map((e: MouseEvent) => {
        if (this.width - e.x < 4) {
          this.el.nativeElement.style.cursor = 'col-resize';
          this.show = true;
        } else {
          if (this.el.nativeElement.style.cursor !== 'auto') {
            this.el.nativeElement.style.cursor = 'auto';
            this.show = false;
          }
        }
        return true;
      })
    );
    /*this.setDefault = fromEvent(this.el.nativeElement, 'dblclick').pipe(
      map((e: MouseEvent) => {
        return this.show;
      })
    );*/
    this.mouseDown.subscribe();
    this.mouseUp.subscribe(data => {
      if (this.enabled) this.enabled = false;
    });
    this.mouseWheel.subscribe(delta => {
      if (delta) {
        this.width = delta < this.minWidth ?
          this.minWidth : delta;
        this.el.nativeElement.style.width = this.width + 'px';
      }
    })
    this.mouseShow.subscribe();
    /* TODO check events chain to fix after first runing
     * this.setDefault.subscribe(data => {
      if (data) {
        this.el.nativeElement.style.width = this.minWidth + 'px';
        this.show = false;
        this.enabled = false;
      }
    });*/
  }
}
