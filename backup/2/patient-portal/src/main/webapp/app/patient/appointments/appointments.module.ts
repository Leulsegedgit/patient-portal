import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appointmentsPopupRoute, appointmentsRoute } from './appointments.route';
import { AppointmentsComponent } from './appointments.component';
import { SharedModule } from 'app/shared/shared.module';
import { AppointmentsService } from './appointments.service';
import { AppointmentsDialogComponent } from './appointments-dialog.component';


const ENTITY_STATES: Routes = [
  ...appointmentsRoute,
  ...appointmentsPopupRoute
  // Other routes
];
@NgModule({
    imports: [
    SharedModule,
    RouterModule.forChild(ENTITY_STATES)
        ],
    declarations: [
       AppointmentsComponent,
       AppointmentsDialogComponent
    ],
    entryComponents: [
        AppointmentsComponent,
        AppointmentsDialogComponent
        ],
    providers: [
        AppointmentsService
        ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class PatientPortalAppointmentsModule {}
