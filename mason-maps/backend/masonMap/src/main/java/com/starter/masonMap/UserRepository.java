package com.starter.masonMap;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User,ObjectId>{

    Optional<User>findByUser(String user);

}
