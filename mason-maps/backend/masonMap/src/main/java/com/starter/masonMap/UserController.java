package com.starter.masonMap;



import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody Map<String,String> user){
        return new ResponseEntity<User>(userService.createUser(user.get("username"),user.get("password")),HttpStatus.CREATED);
}
@PostMapping("/login")
public ResponseEntity<User> loginUser(@RequestBody Map<String,String> user){
    

    return new ResponseEntity<User>(userService.checkUser(user.get("username"),user.get("password")),HttpStatus.OK);
}

}