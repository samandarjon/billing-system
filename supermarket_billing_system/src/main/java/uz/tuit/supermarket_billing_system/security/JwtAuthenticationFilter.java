package uz.tuit.supermarket_billing_system.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import uz.tuit.supermarket_billing_system.entity.User;
import uz.tuit.supermarket_billing_system.service.AuthService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private AuthService authService;
    @Value(value = "jwt.secret")
    private String JwtKey;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                    HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            final String jwt = getJwtFromRequest(httpServletRequest);
            if (StringUtils.hasText(jwt) && validateToken(jwt)) {
                final Long userId = getUserIdFromJwt(jwt);
                final User user = authService.loadUserById(userId);
                UsernamePasswordAuthenticationToken authenticationToken = new
                        UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        user.getAuthorities()
                );
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                System.out.println("hello1");
            }
        } catch (SignatureException ex) {
            logger.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);

    }

    private boolean validateToken(String jwt) {
        try {
            Jwts.parser().setSigningKey(JwtKey).parseClaimsJws(jwt);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    private Long getUserIdFromJwt(String jwt) {
        final Claims claims = Jwts.parser().setSigningKey(JwtKey).parseClaimsJws(jwt).getBody();
        return Long.parseLong((String) claims.get("id"));
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String jwt = request.getHeader("Authorization");
        if (StringUtils.hasText(jwt) && jwt.startsWith("Bearer")) {
            return jwt.substring(7);
        }
        return null;
    }
}
