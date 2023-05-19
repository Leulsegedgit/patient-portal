package com.pluralsight.patientportal.web.rest;

import com.pluralsight.patientportal.domain.Appointment;
import com.pluralsight.patientportal.repository.AppointmentRepository;
import com.pluralsight.patientportal.service.UserService;
import java.net.URI;
import java.net.URISyntaxException;
import javax.validation.Valid;
import static org.hibernate.id.IdentifierGenerator.ENTITY_NAME;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.web.util.HeaderUtil;

@RestController
@RequestMapping("/api")
public class AppointmentResource {
    private final AppointmentRepository appointmentRepository;
     private final UserService userService; 

    public AppointmentResource(AppointmentRepository appointmentRepository, UserService userService) {
        this.appointmentRepository = appointmentRepository;
        this.userService = userService;
    }

   @GetMapping("/appointments")
public Flux<Appointment> getAppointments() {
    return userService.getUserWithAuthorities()
        .flatMapMany(user -> {
            Long userId = user.getId();
            return appointmentRepository.findByUserId(userId);
        });
}

    @PostMapping("/appointments")
public Mono<Appointment> saveAppointment(@RequestBody Appointment appointment) {
    return userService.getUserWithAuthorities()
            .flatMap(user -> {
            appointment.setUserId(user.getId());
            return appointmentRepository.save(appointment);
        });
}
@DeleteMapping("/appointments/{id}")
public Mono<ResponseEntity<Object>> deleteAppointment(@PathVariable Long id) {
    return appointmentRepository.deleteById(id)
            .then(Mono.just(ResponseEntity.noContent().build()))
            .defaultIfEmpty(ResponseEntity.notFound().build());
}

@PutMapping("/appointments/{id}")
    public Mono<ResponseEntity<Appointment>> updateAppointment(@PathVariable Long id, @Valid @RequestBody Appointment updatedAppointment) {
        return appointmentRepository.findById(id)
                .flatMap(existingAppointment -> {
                    existingAppointment.setReason(updatedAppointment.getReason());
                    existingAppointment.setInsuranceChange(updatedAppointment.isInsuranceChange());
                    existingAppointment.setPhoneNumber(updatedAppointment.getPhoneNumber());

                    return appointmentRepository.save(existingAppointment);
                })
                .map(updated -> ResponseEntity.ok()
                        .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, false, ENTITY_NAME, updated.getId().toString()))
                        .body(updated))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
    
    



}
