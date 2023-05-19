import { HttpParams, HttpHeaders } from '@angular/common/http';

export const createRequestOption = (req?: any): any => {
  let params = new HttpParams();
  let headers = new HttpHeaders();

  if (req) {
    params = params.set('page', req.page);
    params = params.set('size', req.size);

    if (req.sort) {
      params = params.set('sort', req.sort);
    }

    if (req.query) {
      params = params.set('query', req.query);
    }

    if (req.filters) {
      Object.keys(req.filters).forEach((key) => {
        params = params.set(key, req.filters[key]);
      });
    }

    headers = headers.set('Accept', 'application/json');
  }

  return { params, headers };
};
