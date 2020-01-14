package com.User.controller;

import com.User.constant.ApiConstant;
import com.User.model.Role;
import com.User.service.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(ApiConstant.ROLE_MAPPING_URL)
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
public class RoleController {

    @Autowired
    private RoleService roleService;

    /**
     * Get all Role list.
     *
     * @return the Role list
     */
    @GetMapping()
    public ResponseEntity<List<Role>> getAllUser() {
        log.info("Requested process the Role list");
        return new ResponseEntity<List<Role>>(roleService.getAllRole(), HttpStatus.OK);
    }

    /**
     * Create Role Role.
     *
     * @param role the Role
     * @return the response message
     */
    @PostMapping()
    public ResponseEntity saveUser(@RequestBody final Role role) {
        log.info("Requested process the save Role");
        return new ResponseEntity(roleService.saveRole(role), HttpStatus.OK);
    }

    /**
     * Update Role response message.
     *
     * @param id    the Role id
     * @param role the Role details
     * @return the response response message
     */
    @PutMapping(ApiConstant.PATH_VARIABLE_ID)
    public ResponseEntity updateProduct(@RequestBody @Valid final Role role, @PathVariable final long id) {
        log.info("Requested process the update Role id: {}", id);
        return new ResponseEntity(roleService.updateRole(role, id), HttpStatus.OK);
    }

    /**
     * Delete Product.
     *
     * @param id the Role id
     * @return the response message
     */
    @DeleteMapping(ApiConstant.PATH_VARIABLE_ID)
    public ResponseEntity deleteProduct(@PathVariable final long id) {
        log.info("Requested process the delete Role id: {}",id);
        return new ResponseEntity(roleService.deleteRole(id), HttpStatus.OK);
    }

}
