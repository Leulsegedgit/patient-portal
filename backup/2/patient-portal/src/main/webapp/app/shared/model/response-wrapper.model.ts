import { HttpHeaders } from '@angular/common/http';

export class ResponseWrapper {
  constructor(
    public headers: HttpHeaders,
    public body: any,
    public status: number
  ) {}
}
