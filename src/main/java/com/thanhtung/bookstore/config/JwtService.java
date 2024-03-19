package com.thanhtung.bookstore.config;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.function.Function;
import java.util.Map;
import java.util.Date;
import java.util.HashMap;

import java.security.Key;

@Service
public class JwtService {

    private static final String SECRET_KEY = "56D388AFE14FE5DFF1CE2CD78C2F2214A41E8E7FF93AAE45FC6D633474BA5804";

    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }
    
    private Claims extractAllClaims (String token) {
        return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token).getBody();
    }
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(Map<String, Object> extractClaims, UserDetails userDetails) {
        return Jwts
        .builder()
        .setClaims(extractClaims)
        .setSubject(userDetails.getUsername())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 64 * 24))
        .signWith(getSignInKey(), SignatureAlgorithm.HS256)
        .compact();
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public boolean isTokenExpired(String token) {
        return extracExpiration(token).before(new Date());
    }

    public Date extracExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }
}
