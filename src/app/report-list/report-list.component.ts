import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Report, reportsCountObj } from '../types';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {
  public reports: Observable<Report[]>;
  public isFiltered: boolean = false;
  public reportsCategoryName: string;
  public reportsCountObj: reportsCountObj = {
    length: 100,
    pageSize: 5,
    pageIndex: 0,
    previousPageIndex: 0
  };

  constructor(private appService: AppService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.reports = this.appService.getReportDetailsByCategoryId(params['id']);
        this.reportsCategoryName = params['name'];
        this.isFiltered = true;
      } else {
        this.reports = this.appService.getReportsList(this.reportsCountObj);
        this.isFiltered = false;
      }
    });
  }

  public getReportDetails(id: string): void {
    this.router.navigate(['/report-details', id]);
  }

  public resetList(): void {
    this.router.navigate(['/report-list']);
  }

  public paginatorChanged(reportsCountObj: any): void {
    console.log(reportsCountObj);
    this.reports = this.appService.getReportsList(reportsCountObj);
  }
}
