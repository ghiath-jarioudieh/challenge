type Status = {
  id: number;
  name: string;
}

type GeographicData = {
  latitude: number;
  longitude: number;
  street: string;
  zip: string;
  place: string;
  state: string;
  country: string;
}

type ReportPhoto = {
  id: number;
  photoId: string;
  title: string;
  path: string;
  createdAt: Date;
}

type Comment = {
  id: number;
  report: Report;
  parent: Comment;
  official: boolean;
  text: string;
  image: string;
  createdAt: Date;
}

type Category = {
  id: number;
  name: string;
  image: string;
  reports: Report[];
}

export type Report = {
  id: number;
  number: string;
  title: string;
  description: string;
  createdAt: Date;
  location: GeographicData;
  status: Status;
  photos: ReportPhoto[];
  comments: Comment[];
  category: Category;
};

export type ReportsQuery = {
  reports: {
    data: Report[];
  }
};

export type ReportQuery = {
  report: Report;
};

export type reportsCountObj = {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
};