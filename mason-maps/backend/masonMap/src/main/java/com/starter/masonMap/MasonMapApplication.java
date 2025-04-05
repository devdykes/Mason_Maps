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
		return (Parsing.getGeminiResponse("George Mason University  Ramireddy, Shivapraneel (he/him/his) Spring 2025 Schedule  Classification:   Junior   Level:   Undergraduate  College:   Engineering & Computing   Major:   Computer Science  Title   Course Details   Credit Hours   CRN   Meeting Times  Professional and Techn Writing   ENGH 388 003   3.0   12722   01/21/2025 - 05/14/2025  Online, ON, LINE  Girard, Amanda  01/21/2025 - 05/14/2025  Thursday  10 : 30   AM   -   11 : 45   AM  Fairfax, Innovation Hall, 330  Girard, Amanda  Popular Music in America   MUSI 102 DL2   3.0   15980   01/21/2025 - 05/14/2025  Online, ON, LINE  Cole, Dennis  Software Engineering   CS 321 002   3.0   17227   01/21/2025 - 05/14/2025  Monday, Wednesday  12 : 00   PM   -   01 : 15   PM  Fairfax, Horizon Hall, 4008  Masri, Wassim  Computer Systems and Programm   CS 367 002   4.0   17240   01/21/2025 - 05/14/2025  Monday, Wednesday  03 : 00   PM   -   04 : 15   PM  Fairfax, Exploratory Hall, L102  Zhong, Yutao  Recitation for Any Lecture   CS 367 304   0.0   17247   01/21/2025 - 05/14/2025  Friday  11 : 30   AM   -   12 : 20   PM  Fairfax, Horizon Hall, 1012  Data Mining   CS 484 002   3.0   17289   01/21/2025 - 05/14/2025  Tuesday, Thursday  03 : 00   PM   -   04 : 15   PM  Fairfax, Innovation Hall, 103  Yu, Fang-Yi  Total Hours   |   Registered:   16   |   Billing:   16   |   CEU:   0This is a general view of your term schedule. Download your schedule for a weekly view.  Sunday   Monday   Tuesday   Wednesday   Thursday   Friday   Saturday      10am  11am  12pm  1pm  2pm  3pm  4pm  Software Engineering  Computer Systems and Programm  Data Mining  Software Engineering  Computer Systems and Programm  Professional and Techn Writing  Data Mining  Recitation for Any Lecture"));}
		catch(Exception e){
			return e.getMessage();
		}
	}

}
