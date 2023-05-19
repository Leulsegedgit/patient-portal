import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PatientPortalAppointmentsModule } from './appointments/appointments.module';
import { AppointmentsService } from './appointments/appointments.service';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

@NgModule({
  imports: [
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    //PatientPortalAppointmentsModule
  ],
   providers: [AppointmentsService],
})
export class PatientRoutingModule {}
