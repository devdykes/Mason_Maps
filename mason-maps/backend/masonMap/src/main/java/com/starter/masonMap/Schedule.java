package com.starter.masonMap;

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
        this.schedule = schedule;
    }
}