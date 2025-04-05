package com.starter.masonMap;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.MongoTemplate;



@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
   

   



    public User createUser(String user, String password) {
       if(this.userRepository.findByUsername(user).isPresent()){
        throw new RuntimeException("User already exists");
       }


       User newUser=this.userRepository.insert(new User(user, password));

       return newUser;
}       
    public User checkUser(String user, String password ){
        if(this.userRepository.findByUsername(user).isPresent()){
            User userFound=this.userRepository.findByUsername(user).get();
             if (password.equals(userFound.getPassword())) {
                return userFound;
            }
        }
        throw new RuntimeException("Invalid username or password");


    }
}
