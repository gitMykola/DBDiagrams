import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'diagram',
  templateUrl: 'diagram.component.html',
  styleUrls: ['diagram.component.less']
})
export class DiagramComponent implements OnInit {
  @ViewChild('codeEditor') codeElement: ElementRef;
  public width: number = 300;
  constructor() { }
  ngOnInit() {
    this.codeElement.nativeElement.style.width = this.width + 'px';
  }
  hideToLeft() {
    if (this.codeElement.nativeElement.clientWidth == 0) {
      this.codeElement.nativeElement.style.width = this.width + 'px';
    } else {
      this.codeElement.nativeElement.style.width = '0';
    }
  }
}
