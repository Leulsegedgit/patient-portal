package com.pluralsight.patientportal.domain;

import java.io.Serializable;
import java.util.Objects;

//import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
//import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
//import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * Appointment domain object
 */
@Table("appointment")
public class Appointment {
    @Id
    private Long id;

    @Column("user_id")
    private Long userId;

    @Column("reason")
    private String reason;

    @Column("insurance_change")
    private Boolean insuranceChange;

    @Column("phone_number")
    private String phoneNumber;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getReason() {
        return reason;
    }

    public Appointment reason(String reason) {
        this.reason = reason;
        return this;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Boolean isInsuranceChange() {
        return insuranceChange;
    }

    public Appointment insuranceChange(Boolean insuranceChange) {
        this.insuranceChange = insuranceChange;
        return this;
    }

    public void setInsuranceChange(Boolean insuranceChange) {
        this.insuranceChange = insuranceChange;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Appointment phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Appointment appointment = (Appointment) o;
        if (appointment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), appointment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Appointment{" +
            "id=" + getId() +
            ", userId='" + getUserId() + "'" +
            ", reason='" + getReason() + "'" +
            ", insuranceChange='" + isInsuranceChange() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            "}";
    }
}