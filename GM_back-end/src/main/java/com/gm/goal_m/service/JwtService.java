package com.gm.goal_m.service;

import org.springframework.stereotype.Service;
import com.gm.goal_m.config.JwtConfiguration;
import com.gm.goal_m.model.User;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.InvalidKeyException;
import io.jsonwebtoken.security.SignatureException;

import java.security.NoSuchAlgorithmException;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    private final JwtConfiguration jwtConfiguration;
    public JwtService(JwtConfiguration jwtConfiguration) {
        this.jwtConfiguration = jwtConfiguration;
    }

    public String generateToken(User user) throws InvalidKeyException, NoSuchAlgorithmException {
        return Jwts.builder()
                .claim("email", user.getEmail())
                .claim("firstname", user.getFirstName())
                .claim("lastname", user.getLastName())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(jwtConfiguration.getSecretKey())
                .compact();
    }

    public String decodeTokenEmail(String token) throws SignatureException, ExpiredJwtException, UnsupportedJwtException, MalformedJwtException, IllegalArgumentException, NoSuchAlgorithmException {
        var claims = Jwts.parserBuilder()
                .setSigningKey(jwtConfiguration.getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        String email = claims.get("email", String.class);
        return email;
    }

    public String decodeToken(String token) throws SignatureException, ExpiredJwtException, UnsupportedJwtException, MalformedJwtException, IllegalArgumentException, NoSuchAlgorithmException {
        var claims = Jwts.parserBuilder()
                .setSigningKey(jwtConfiguration.getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.get("email", String.class);
    }

    public boolean isTokenValid(String token) throws IllegalArgumentException, NoSuchAlgorithmException {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(jwtConfiguration.getSecretKey())
                    .build()
                    .parseClaimsJws(token);

            return true;
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            System.out.println("Token has expired: " + e.getMessage());
            return false;
        } catch (io.jsonwebtoken.SignatureException e) {
            System.out.println("Invalid token signature: " + e.getMessage());
            return false;
        } catch (io.jsonwebtoken.JwtException e) {
            System.out.println("Invalid token:  " + e.getMessage());
            return false;
        }
    }

}