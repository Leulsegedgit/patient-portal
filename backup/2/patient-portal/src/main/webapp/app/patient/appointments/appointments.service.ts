import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './appointments.model';
import { map } from 'rxjs/operators';
import { createRequestOption } from '../../shared/model/request-util';
import { ResponseWrapper } from '../../shared/model/response-wrapper.model';

@Injectable()
export class AppointmentsService {

    private resourceUrl = 'api/appointments';

    constructor(private http: HttpClient) { }

    create(appointment: Appointment): Observable<any> {
  const copy = this.convert(appointment);
  console.log("sending post request")
  return this.http.post<Appointment>(this.resourceUrl, copy).pipe(
    map((res: any) => res )
  );
}

deleteById(id: number): Observable<any> {
    const url = `${this.resourceUrl}/${id}`;
    console.log("sending delete request");
    return this.http.delete(url);
}





    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get<ResponseWrapper>(this.resourceUrl, { params: options });
    }

    private convert(appointment: Appointment): Appointment {
        const copy: Appointment = Object.assign({}, appointment);
        return copy;
    }
    
    edit(appointment: Appointment): Observable<any> {
  const url = `${this.resourceUrl}/${appointment.id}`;
  const copy = this.convert(appointment);
  console.log("sending put request");
  return this.http.put(url, copy);
}


}
