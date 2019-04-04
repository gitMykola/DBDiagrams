import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import * as d3 from "d3";
import { Element } from '@angular/compiler';

@Component({
  selector: 'plate',
  templateUrl: 'plate.component.html',
  styleUrls: ['plate.component.less']
})
export class PlateComponent implements OnInit, AfterViewInit {
  @ViewChild('plate') plate: ElementRef;
  public zindex: number = 0;
  constructor(
    public projectsService: ProjectsService
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.setTables();
  }
  setTables() {
    const tables = [];//this.structureService.structures;
    let tableGroup = d3.select(this.plate.nativeElement)
      .append('g')
      .attr('class', 'table-group');
    tables.forEach((t, i) => {
      const table = tableGroup.append('svg')
        .attr('class', 'table')
        .attr('x', i * 190 + ((i > 0)?(i + 1)*20:20))
        .attr('y', Math.floor(i / 4) * 200 + 20)
        .attr('height', 250)
        .attr('width', 190);
      this.addTableHeader(table, t.name);
      t.fields.forEach((f, k) => this.addTableField(table, f, k))
    })
  }
  addTableHeader(table: any, text: string) {
    const header = table.append('svg')
      .attr('class', 'table-header')
      .attr('height', 32)
      .attr('width', 190)
      .style('fill', '#316896');
    header.append('rect')
      .attr('height', 32)
      .attr('width', 190);
    header.append('text')
      .attr('x', 13)
      .attr('y', 16)
      .attr('dy', '4px')
      .text(text)
      .style('fill', '#ffffff');
    header.append('title')
      .text(text);
  }
  addTableField(table: any, field: any, k: number) {
    const f = table.append('svg')
      .attr('class', 'field')
      .attr('y', 32 + k * 29)
      .attr('width', 190)
      .attr('height', 29)
      .style('fill', '#efefef');
    f.append('rect')
      .attr('width', 190)
      .attr('height', 29);
    f.append('text')
      .attr('x', 13)
      .attr('y', 16)
      .attr('dy', '4px')
      .text(field.fieldPath.split('.').pop())
      .style('fill', '#555555');
    f.append('text')
      .attr('x', 178)
      .attr('y', 16)
      .attr('dy', '4px')
      .text(field.fieldType)
      .style('fill', '#555555')
      .style('text-anchor', 'end');
    f.append('title')
      .text(field.fieldPath.split('.').pop() + ' (' + field.fieldType + ')');
  }
}
