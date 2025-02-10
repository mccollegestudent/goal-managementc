package com.gm.goal_m.dto.MailDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SendMail {
    @NotBlank(message = "recepient email")
    private String to;
    @NotBlank(message = "missing subject")
    private String Subject;

    @NotBlank(message = "missing messeage body")
    private String Body;
    
}
