package com.starter.masonMap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class MasonMapApplication {

	public static void main(String[] args) {
		SpringApplication.run(MasonMapApplication.class, args);
	}
	@GetMapping("/")
	public String index() {
		try{
		return ChatGPTClient.chatGPT("Say Something");}
		catch(Exception e){
			return e.getMessage();
		}
	}

}
