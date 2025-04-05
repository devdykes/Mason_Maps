package com.starter.masonMap;


import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends MongoRepository<Course,ObjectId>{
    
}

