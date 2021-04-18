import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';
import { Report } from '../types';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit {
  public reportId: string;
  public report: Observable<Report>;
  private reportAlbum: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private appService: AppService, private lightbox: Lightbox) { }

  ngOnInit(): void {
    this.getReportId();
    this.report = this.appService.getReportDetails(this.reportId);
  }

  private getReportId(): void {
    this.activatedRoute.params.subscribe(params => {
      this.reportId = params['id'];
    });
  }

  public backToList(): void {
    this.router.navigate(['/report-list']);
  }

  public openImage(photo: any): void {
    const src = 'https://www.buergermeldungen.com/' + photo.path;
    const album = {
      src: src
    };
    this.reportAlbum.push(album);
    this.lightbox.open(this.reportAlbum, 0);
  }

  public getReportsByCategoryId(categoryId: string, categoryName: string) {
    this.router.navigate(['/report-list', categoryId, categoryName]);
  }
}
