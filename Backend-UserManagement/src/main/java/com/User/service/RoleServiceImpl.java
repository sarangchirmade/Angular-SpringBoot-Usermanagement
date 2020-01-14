package com.User.service;

import com.User.constant.ApiConstant;
import com.User.model.Role;
import com.User.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    /**
     * Get all category list.
     *
     * @return the category list
     */
    @Override
    public List<Role> getAllRole() {
        return roleRepository.findAll();
    }

    /**
     * Gets category by id.
     *
     * @param id the category id
     * @return the category by id
     */
    @Override
    public Object getRoleById(final long id) {
        Optional<Role> optional = findByRoleId(id);
        if(optional.isPresent()){
            return optional.get();
        } else {
            return ApiConstant.DATA_NOT_FOUND;
        }
    }

    /**
     * Create category category.
     *
     * @param role the category
     * @return the response message
     */
    @Override
    public Role saveRole(final Role role) {
        return roleRepository.save(role);
    }

    /**
     * Update category response message.
     *
     * @param id    the category id
     * @param requestRole the category details
     * @return the response response message
     */
    @Override
    public Object updateRole(final Role requestRole, final long id) {
        if (!roleRepository.existsById(id)) {
            return ApiConstant.DATA_NOT_FOUND;
        }
        return findByRoleId(id)
                .map(role -> {
                    role.setName(requestRole.getName());
                    return roleRepository.save(role);
                });
    }

    /**
     * Delete category.
     *
     * @param id the category id
     * @return the response message
     */
    @Override
    public String deleteRole(final long id) {
        if (!roleRepository.existsById(id)) {
            return ApiConstant.DATA_NOT_FOUND;
        }

        roleRepository.deleteById(id);
        return ApiConstant.DELETE_ROLE;

    }

    /**
     * Common method for get Category by id.
     *
     * @param id the category id
     * @return the response Category
     */
    private Optional<Role> findByRoleId (final long id) {
        return roleRepository.findById(id);
    }

}
