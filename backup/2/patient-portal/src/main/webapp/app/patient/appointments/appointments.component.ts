import {Component, OnDestroy, OnInit,ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseWrapper } from 'app/shared/model/response-wrapper.model';
import { AppointmentsDialogComponent } from './appointments-dialog.component';
import { Appointment } from './appointments.model';
import { AppointmentsService } from './appointments.service';
import { EventManager } from './EventManager';

declare var window:any;

@Component({
    selector: 'jhi-patient-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.css']
})
export class AppointmentsComponent implements OnInit, OnDestroy {
   appointments: Appointment[] = [];
   appointment: Appointment = new Appointment();
   appointmentEdit: Appointment = new Appointment();
  formModal:any;
  formEditModal:any;
    outletName = 'patient-appointments-new';
    appointmentForm!: FormGroup; // Add the appointmentForm variable
    appointmentFormEdit!: FormGroup; // Add the appointmentForm variable
    constructor(
    private appointmentService: AppointmentsService,
    private eventManager: EventManager,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder, // Add the formBuilder
    ){}
    
    ngOnInit() {
        this.formModal = new window.bootstrap.Modal(
         document.getElementById("appointmentModal")
        );
        this.formEditModal = new window.bootstrap.Modal(
         document.getElementById("appointmentEditModal")
        );
    this.getAppointments();
    
    // Initialize the appointmentForm
    this.appointmentForm = this.formBuilder.group({
      reason: ['', Validators.required],
      insuranceChange: [false],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
    
    this.appointmentFormEdit = this.formBuilder.group({
      reason: ['', Validators.required],
      insuranceChange: [false],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
}
  

    ngOnDestroy() {
        
    }
 save() {
        console.log(12345)
        this.appointmentService.create(this.appointment).subscribe(
        result =>{
            console.log(result)
        this.appointments=[];
        this.getAppointments();
        this.formModal.hide()
        },
        error => console.log(error)
        );
       
    }
   edit(){
       this.appointmentService.edit(this.appointmentEdit).subscribe(
        result =>{
            console.log(result)
        this.appointments=[];
        this.getAppointments();
        this.formEditModal.hide()
        },
        error => console.log(error)
        );
       } 
    
getAppointments() {
    this.appointmentService.query().subscribe((res: any) => {
        
       const appointments: Appointment[] = res.map((item: { id: number, reason: string, insuranceChange: boolean, phoneNumber: string }) => ({
  id: item.id,
  reason: item.reason,
  insuranceChange: item.insuranceChange,
  phoneNumber: item.phoneNumber
}));

this.appointments.push(...appointments);

       this.cdr.detectChanges(); 
    });
  }
    private onError() {
        }
       openAppointmentsDialog() {
   this.formModal.show()
  }
  opendEditDialogBox(appointment: Appointment){
      this.appointmentEdit = appointment;
      this.formEditModal.show();
      }
  deleteAppointment(id:number){
      this.appointmentService.deleteById(id).subscribe(
        result =>{
            this.appointments=[];
        this.getAppointments();
            console.log(result)
        },
        error => console.log(error)
        );;
      }
              
}
