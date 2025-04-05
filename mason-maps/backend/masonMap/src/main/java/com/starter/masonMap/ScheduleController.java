package com.starter.masonMap;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*")
public class ScheduleController {
    
    @Autowired
    private UserService userService;
    @PostMapping("/create")
    public ResponseEntity<User> registerUser(@RequestBody Map<String,String> user){
        return new ResponseEntity<User>(userService.createUser(user.get("user"),user.get("password")),HttpStatus.CREATED);
    }
}
