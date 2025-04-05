package com.starter.masonMap;

import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document( collection = "Course")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    private ObjectId id;

    private String title;
    private int courseNum;
    private int secNum;
    private int credits;
    private int CRN;
    private double location;
    private int timeHour;
    private List<String> date;




    public Course(){
        
    }
}
