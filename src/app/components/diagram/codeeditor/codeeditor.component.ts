import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { StructureService } from '../../../services/structure.service';

@Component({
  selector: 'codeeditor',
  templateUrl: 'codeeditor.component.html',
  styleUrls: ['codeeditor.component.less']
})
export class CodeEditorComponent implements OnInit {
  public width: number = 300;
  public code: string = '';
  constructor(
    private el: ElementRef,
    public structureService: StructureService
  ) { }
  editorChange() {
  }
  ngOnInit() {
    this.structureService.structures.forEach(s => {
      this.code += 'Table ' + s.name + ' {\n';
      const lenght = s.fields.length - 1;
      s.fields.forEach((f, index) => {
        this.code += f.fieldPath.split('.').pop();
        this.code += ' ' + f.fieldType;
        if (index <= lenght) this.code += ',\n';
      });
      this.code += '\n}\n';
    });
  }
  hideToLeft() {
    if (this.el.nativeElement.clientWidth == 0) {
      this.el.nativeElement.style.width = this.width + 'px';
    } else {
      this.el.nativeElement.style.width = '0';
    }
  }
}
