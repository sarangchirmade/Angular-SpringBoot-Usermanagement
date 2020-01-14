package com.User.controller;

import com.User.constant.ApiConstant;
import com.User.model.User;
import com.User.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(ApiConstant.USER_MAPPING_URL)
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Get all User list.
     *
     * @return the User list
     */
    @GetMapping()
    public ResponseEntity<List<User>> getAllUser() {
        log.info("Requested process the User list");
        return new ResponseEntity<List<User>>(userService.getAllUser(), HttpStatus.OK);
    }

    /**
     * Gets User by id.
     *
     * @param id the User id
     * @return the users by name
     */
//    @GetMapping(ApiConstant.PATH_VARIABLE_ID)
//    public ResponseEntity getUserById(@PathVariable final long id) {
//        log.info("Requested process the get User: {}",id);
//        return new ResponseEntity(userService.getUserById(id), HttpStatus.OK);
//    }

    /**
     * Create User User.
     *
     * @param user the User
     * @return the response message
     */
    @PostMapping()
    public ResponseEntity saveUser(@RequestBody final User user) {
        log.info("Requested process the save User");
        return new ResponseEntity(userService.saveUser(user), HttpStatus.OK);
    }

    /**
     * Update User response message.
     *
     * @param user the User details
     * @return the response response message
     */
    @PutMapping()
    public ResponseEntity updateUser(@RequestBody @Valid final User user) {
        log.info("Requested process the update User id: {}", user.getId());
        return new ResponseEntity(userService.updateUser(user), HttpStatus.OK);
    }

    /**
     * Delete User.
     *
     * @param id the User id
     * @return the response message
     * @throws Exception the exception
     */
    @DeleteMapping(ApiConstant.PATH_VARIABLE_ID)
    public ResponseEntity deleteUser(@PathVariable final long id) {
        log.info("Requested process the delete User id: {}",id);
        return new ResponseEntity(userService.deleteUser(id), HttpStatus.OK);
    }

    /**
     * Get all User list by status.
     *
     * @return the User list by Status
     */
//    @GetMapping(ApiConstant.User_ACTIVE_URL)
//    public ResponseEntity<List<com.User.model.User>> getAllActiveUser(@PathVariable final boolean status) {
//        log.info("Requested process the Find By Status User list");
//        return new ResponseEntity<List<com.User.model.User>>(userService.getAllActiveUser(status), HttpStatus.OK);
//    }

    @PutMapping(ApiConstant.ASSIGN_ROLE_USER)
    public ResponseEntity updateUser(@RequestParam final long userid,@RequestParam final long roleid) {
        log.info("Requested process the update");
        return new ResponseEntity(userService.updateRoleForUser(userid, roleid), HttpStatus.OK);
    }
}
