package com.User.service;

import com.User.constant.ApiConstant;
import com.User.model.Role;
import com.User.model.User;
import com.User.repository.RoleRepository;
import com.User.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    /**
     * Get all User list.
     *
     * @return the User list
     */
    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }


    /**
     * Create User User.
     *
     * @param user the User
     * @return the response message
     */
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Object updateRoleForUser(final long userid, final long roleid) {
        if (!userRepository.existsById(userid)) {
            return ApiConstant.DATA_NOT_FOUND;
        }

        if (!roleRepository.existsById(roleid)) {
            return ApiConstant.DATA_NOT_FOUND;
        }

        Optional<Role> optionalRole = roleRepository.findById(roleid);
        Role role = optionalRole.get();
        return findByUserId(userid)
                .map(user -> {
                    user.setRole(role);
                    return userRepository.save(user);
                });
    }

    /**
     * Update User response message.
     *
     * @param userRequest the User details
     * @return the response response message
     */
    @Override
    public Object updateUser(final User userRequest) {
        if (!userRepository.existsById(userRequest.getId())) {
            return ApiConstant.DATA_NOT_FOUND;
        }
        return userRepository.save(userRequest);
    }

    /**
     * Delete User.
     *
     * @param id the User id
     * @return the response message
     * @throws Exception the exception
     */
    @Override
    public Object deleteUser(long id) {
        if (!userRepository.existsById(id)) {
            return ApiConstant.DATA_NOT_FOUND;
        }
        userRepository.deleteById(id);
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode node = mapper.createObjectNode();
        node.put(ApiConstant.DELETE_USER, ApiConstant.DELETE_USER);
        return node;

    }


    /**
     * Common method for get User by id.
     *
     * @param id the User id
     * @return the response User
     */
    private Optional<User> findByUserId (final long id) {
        return userRepository.findById(id);
    }
}
