import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AppointmentsDialogComponent } from './appointments-dialog.component';
import { AppointmentsComponent } from './appointments.component';

export const appointmentsRoute: Routes = [
    {
        path: 'patient-appointments',
        component: AppointmentsComponent,
        data: {
            authorities: ['ROLE_PATIENT'],
            pageTitle: 'Appointments'
            
        },
        canActivate: [UserRouteAccessService]
    }
];

export const appointmentsPopupRoute: Routes = [
    {
        path: 'patient-appointments-new',
        component: AppointmentsDialogComponent,
        data: {
            authorities: ['ROLE_PATIENT'],
            pageTitle: 'Appointments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
