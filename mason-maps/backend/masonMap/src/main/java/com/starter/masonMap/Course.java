package com.starter.masonMap;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Document(collection = "Course")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    private String title;
    private String location;
    private String room;
    private double longitude;
    private double latitude;
    
    private int timeHour; //store in military time to avoid AM PM errors
    private int timeMin;

    private List<String> date;
    /*!SECTION
     * 
     * String [] courseInfo = course.split(",");
            String Date= courseInfo[0];
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
     */
    Course(String [] date, String title, int hours, int minutes,String location, String room, double longitude, double latitude){
        this.title = title;
        this.timeHour = hours;
        this.timeMin = minutes;
        this.location = location;
        this.room = room;
        this.longitude = longitude;
        this.latitude = latitude;
        this.date = List.of(date);
    }

}
