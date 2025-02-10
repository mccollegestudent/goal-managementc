package com.gm.goal_m.config;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import org.springframework.beans.factory.annotation.Value;

@Configuration
public class MailConfiguration {

    @Bean
    public JavaMailSender getJavaMailSender(@Value("${spring.mail.username}") String senderEmail, @Value("${spring.mail.password}") String senderAppPassword) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername(senderEmail);
        mailSender.setPassword(senderAppPassword);

        Properties props = mailSender.getJavaMailProperties();
        
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }    
}
