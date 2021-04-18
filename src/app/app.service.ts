import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReportQuery, ReportsQuery, Report, reportsCountObj } from './types';

const GET_REPORTS = gql`
  query GetReports($count: Int!, $page: Int!) {
    reports(count: $count, page: $page) {
      data {
        id
        number
        title
        createdAt
        status {
          id
          name
        }
        photos {
          path
        }
        location {
          latitude
          longitude
          street
          zip
          place
          state
          country
        }
        comments {
          id
        }
      }
    }
  }
`;

const GET_REPORT_BY_ID = gql`
  query GetReport($id: Int!) {
    report(id: $id) {
      title
      number
      description
      createdAt
      status {
        id
        name
      }
      photos {
        path
      }
      comments {
        createdAt
        text
      }
      location {
        latitude
        longitude
        street
        zip
        place
        state
        country
      }
      category {
        id
        name
        image
      }
    }
  }
`;

const GET_REPORT_BY_CATEGORY_ID = gql`
  query GetReport($categoryId: Int!) {
    reports(categoryId: $categoryId) {
      data {
        id
        number
        title
        createdAt
        status {
          id
          name
        }
        photos {
          path
        }
        location {
          latitude
          longitude
          street
          zip
          place
          state
          country
        }
        comments {
          id
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private apollo: Apollo) {}

  public getReportsList(reportsCountObj: reportsCountObj): Observable<Report[]> {
    return this.apollo
      .watchQuery<ReportsQuery>({
        query: GET_REPORTS,
        variables: {
          count: reportsCountObj.pageSize,
          page: reportsCountObj.pageIndex
        },
      })
      .valueChanges.pipe(map((result) => result.data.reports.data));
  }

  public getReportDetails(reportId: string): Observable<Report> {
    return this.apollo
      .watchQuery<ReportQuery>({
        query: GET_REPORT_BY_ID,
        variables: {
          id: reportId,
        },
      })
      .valueChanges.pipe(map((result) => result.data.report));
  }

  public getReportDetailsByCategoryId(
    categoryId: string
  ): Observable<Report[]> {
    return this.apollo
      .watchQuery<ReportsQuery>({
        query: GET_REPORT_BY_CATEGORY_ID,
        variables: {
          categoryId: categoryId,
        },
      })
      .valueChanges.pipe(map((result) => result.data.reports.data));
  }
}