package com.starter.masonMap;

import java.util.ArrayList;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Document(collection = "Schedule")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Schedule {
    
    @Id
    private ObjectId id;

    private List<Course> schedule;

    public Schedule(String pdf) {
        schedule = new ArrayList<Course>();
        String [] StringCourses;
        try{
       String courses=Parsing.getGeminiResponse(pdf);
       StringCourses = courses.split("_");
        }catch(Exception e){
            System.out.println("Error parsing PDF: " + e.getMessage());
            return;
        }
        for(String course: StringCourses){
            String [] courseInfo = course.split(",");
            String[] Date= courseInfo[0].split(" ");
            String title = courseInfo[1];
            String timestr= courseInfo[2];
            String [] time = timestr.split(":");

            int minutes = Integer.parseInt(time[1].split(" ")[0]);
            int hours = Integer.parseInt(time[0]);
            if(time[1].split(" ")[1].equals("PM")&& hours!=12){
                hours+=12;
            }
            String location = courseInfo[3];
            String room = courseInfo[4];
            double longitude=Double.parseDouble(courseInfo[5]);
            double latitude=Double.parseDouble(courseInfo[6]);
            schedule.add(new Course(Date,title,hours,minutes,location,room,longitude,latitude));
        }
    }
}