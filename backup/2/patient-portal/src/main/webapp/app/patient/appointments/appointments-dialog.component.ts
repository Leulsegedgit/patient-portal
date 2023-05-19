import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
//import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import {Appointment} from './appointments.model';
import {AppointmentsPopupService} from './appointments-popup.service';
import {AppointmentsService} from './appointments.service';
import { EventManager } from './EventManager';

declare var window:any;

@Component({
    selector: 'jhi-appointments-dialog',
    templateUrl: './appointments-dialog.component.html',
    styleUrls: ['./appointments-dialog.css']
})
@Injectable()
export class AppointmentsDialogComponent implements OnInit {

    appointment!: Appointment;
    isSaving!: boolean;
    formModal:any;

    constructor(
        //public activeModal: NgbActiveModal,
        //private alertService: JhiAlertService,
        private appointmentsService: AppointmentsService,
        private eventManager: EventManager,
        //private router: Router
    ) {
         this.appointment = new Appointment();
    }

    ngOnInit() {
        this.formModal = new window.bootstrap.Modal(
         document.getElementById("appointmentModal")
        );
        this.isSaving = false;
    }

    clear() {
       // this.activeModal.dismiss('cancel');
    }
    
     openAppointmentsDialog() {
   // this.router.navigate([{ outlets: { popup: [ 'patient-appointments-new'] } }]);
   this.formModal.show()
  }

    save() {
        this.isSaving = true;
        //this.eventManager.changeMessage(JSON.stringify(this.appointment));
        //this.router.navigate([{ outlets: { popup: null } }]);
        this.appointmentsService.create(this.appointment).subscribe(
        result =>{
            console.log(result)
        this.eventManager.changeMessage(JSON.stringify(result));
        this.formModal.hide()
        },
        error => console.log(error)
        );
//        this.subscribeToSaveResponse(
//            this.appointmentsService.create(this.appointment));
            
            
    }

    private subscribeToSaveResponse(result: Observable<Appointment>) {
        result.subscribe((res: Appointment) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Appointment) {
        //this.eventManager.broadcast({ name: 'appointmentListModification', content: 'OK'});
        this.isSaving = false;
        //this.activeModal.dismiss(result);
    }

    private onSaveError(error: any) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error: any) {
        //this.alertService.error(error.message, null, "");
    }
}

@Component({
    selector: 'jhi-appointments-popup',
    template: ''
})
export class AppointmentsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private appointmentsPopupService: AppointmentsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.appointmentsPopupService
                .open(AppointmentsDialogComponent as Component);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
