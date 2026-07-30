package com.library.fullstacktaskmanagement.entity;

public class Role {

    private String role_user;
    private String role_admin;

    public String getRole_user() {
        return role_user;
    }

    public void setRole_user(String role_user) {
        this.role_user = role_user;
    }

    public String getRole_admin() {
        return role_admin;
    }

    public void setRole_admin(String role_admin) {
        this.role_admin = role_admin;
    }

    public Role(String role_user, String role_admin) {
        this.role_user = role_user;
        this.role_admin = role_admin;
    }
}
