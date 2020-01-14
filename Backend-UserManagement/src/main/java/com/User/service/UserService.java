package com.User.service;

import com.User.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    public List<User> getAllUser();


    public User saveUser(final User user);

    public Object updateRoleForUser(final long userid, final long roleid);

    public Object updateUser(final User user);

    public Object deleteUser(final long id);

}

