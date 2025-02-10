package com.gm.goal_m.Util;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.gm.goal_m.service.MailSchedulerService;

@Component
public class MailScheduler {
    private MailSchedulerService mainSchedulerService;

    public MailScheduler(MailSchedulerService mainSchedulerService){
        this.mainSchedulerService = mainSchedulerService;
    }

    @Scheduled(fixedRate = 60000)
    public void scheduleMail (){
        mainSchedulerService.sendEmails();
    }
    
}
