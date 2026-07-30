package com.library.fullstacktaskmanagement.dto.user;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserRegisterRequest {

    @NotBlank(message = "Name required")
    private String name;

    @NotBlank(message = "Email required")
    @Email(message = "input syntax email")
    private String email;

    @NotBlank(message = "Password required")
    @Size(min = 6, message = "Password shouldn't less than 6 characters")
    private String password;
}
