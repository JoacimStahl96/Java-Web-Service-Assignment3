package ec.java.projectredditassignmentbackend.controllers;

import ec.java.projectredditassignmentbackend.model.UserEntity;
import ec.java.projectredditassignmentbackend.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public void createUser(@RequestBody UserEntity user, HttpServletResponse response){
        if (!userService.createUser(user)){
            response.setStatus(409);
        } else {
            response.setStatus(201);
        }
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody UserEntity user, HttpServletResponse response){
        String token = userService.LoginUser(user.getUsername().toLowerCase(), user.getPassword());

        if (token == null){
            response.setStatus(406);
            return null;
        } else {
            response.setStatus(200);
            return token;
        }
    }

    @PostMapping("/logout")
    public void logoutUser(@RequestHeader String token){
        userService.logoutUser(token);

    }
}
