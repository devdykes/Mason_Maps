package com.starter.masonMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;



@Service
public class ScheduleService {
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
   

    public Schedule createSchedule(String pdf, String user) {
       User userFound=this.userRepository.findByUser(user).get();
       Schedule schedule=this.scheduleRepository.insert(new Schedule(pdf));
       mongoTemplate.save(schedule,"schedule");
       mongoTemplate.update(User.class).matching(Criteria.where("user").is(userFound.getUser()))
       .apply(new Update().push("schedule", schedule)).first();

       
       return schedule;
    }
    public Schedule getSchedule(String user) {
        User userFound=this.userRepository.findByUser(user).get();
        Schedule schedule=userFound.getSchedule();
        return schedule;
    }       
}

