package com.starter.masonMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
   

   



    public User createUser(String user, String password) {
       if(this.userRepository.findByUser(user).isPresent()){
        throw new RuntimeException("User already exists");
       }


       User newUser=this.userRepository.insert(new User(user, password));

       return newUser;
    }       
    public User checkUser(String user, String password ){
        if(this.userRepository.findByUser(user).isPresent()){
            User userFound=this.userRepository.findByUser(user).get();
             if (password.equals(userFound.getPassword())) {
                return userFound;
            }
        }
        throw new RuntimeException("Invalid username or password");


    }
}
