package com.starter.masonMap;

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
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*")
public class ScheduleController {
    
    @Autowired
    private ScheduleService scheduleService;
    @PostMapping("/create")
    public ResponseEntity<Schedule> registerSchedule(@RequestBody Map<String, String> schedule){
        return new ResponseEntity<Schedule>(scheduleService.createSchedule(schedule.get("pdf"),schedule.get("user")),HttpStatus.CREATED);
    }
    @GetMapping("/get/{user}")
    public ResponseEntity<Schedule> getSchedule(@PathVariable String  user){
        return new ResponseEntity<Schedule>(scheduleService.getSchedule(user),HttpStatus.OK);
    }


}
