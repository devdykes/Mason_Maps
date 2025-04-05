package com.starter.masonMap;


import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Document(collection = "User")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    
    @Id
    private ObjectId id;

    private String user;

    private String password;

    private List<Schedule> schedule;

    public User(String user, String password){
        this.user = user;
        this.password =  password;
    }

    public Schedule getSchedule(){
        return schedule.get(0);
    }
    
    



    
}
