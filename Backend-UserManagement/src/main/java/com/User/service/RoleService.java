package com.User.service;

import com.User.model.Role;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoleService {

    public List<Role> getAllRole();

    public Object getRoleById(final long id);

    public Role saveRole(final Role role);

    public Object updateRole(final Role role, final long id);

    public String deleteRole(final long id);

}

