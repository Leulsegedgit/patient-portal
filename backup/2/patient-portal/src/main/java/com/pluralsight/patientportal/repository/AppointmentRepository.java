package com.pluralsight.patientportal.repository;


import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import com.pluralsight.patientportal.domain.Appointment;
import reactor.core.publisher.Flux;

@Repository
public interface AppointmentRepository extends R2dbcRepository<Appointment, Long> {
   Flux<Appointment> findByUserId(Long userId);
   
}
