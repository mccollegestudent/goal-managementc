package com.gm.goal_m.config;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import com.gm.goal_m.service.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtIntercept  implements HandlerInterceptor{

    private final JwtService jwtService;

    public JwtIntercept (JwtService jwtService){
        this.jwtService = jwtService;
    }

    @Override
    public boolean preHandle(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler)
            throws Exception {
        String token = null;

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            if (token != null && jwtService.isTokenValid(token)) {
                request.setAttribute("email", jwtService.decodeTokenEmail(token));
                return true;
            }
        }

        // If no valid token is found
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        return false;
    }
    
}
