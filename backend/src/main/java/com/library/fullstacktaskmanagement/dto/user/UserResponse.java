package com.library.fullstacktaskmanagement.dto.user;

import com.library.fullstacktaskmanagement.entity.enums.Role;
import lombok.*;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private Role role;
}
