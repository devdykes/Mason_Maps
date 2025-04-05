package com.starter.masonMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class ScheduleService {
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private UserRepository userRepository;

   

    public Schedule createSchedule(String pdf, String user) {
       User userFound=this.userRepository.findByUser(user).get();
       Schedule schedule=this.scheduleRepository.insert(new Schedule(pdf));
       userFound.setSchedule(schedule);
       return schedule;
    }
    public Schedule getSchedule(String user) {
        User userFound=this.userRepository.findByUser(user).get();
        Schedule schedule=userFound.getSchedule();
        return schedule;
    }       
}

