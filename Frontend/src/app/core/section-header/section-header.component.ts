import { AsyncPipe, NgIf, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [NgIf, BreadcrumbComponent, TitleCasePipe, AsyncPipe],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss',
})
export class SectionHeaderComponent {
  constructor(public bcService: BreadcrumbService) {}
}
