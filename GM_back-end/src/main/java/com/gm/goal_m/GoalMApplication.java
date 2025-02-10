package com.gm.goal_m;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class GoalMApplication {

	public static void main(String[] args) {
		SpringApplication.run(GoalMApplication.class, args);
	}

}
