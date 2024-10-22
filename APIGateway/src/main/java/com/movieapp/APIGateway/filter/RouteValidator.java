package com.movieapp.APIGateway.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    // List of open API endpoints (public endpoints)
	public static final List<String> openApiEndpoints = List.of(
		    "/auth/check",
		    "/auth/register",
		    "/auth/login",
		    "/movies",
		    "/movies/top**",  // Allows /movies/top1 to /movies/top100
		    "/users/**",
		    "/eureka/**"
		);

    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    // Predicate to determine if a request is secured or not
    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> pathMatcher.match(uri, request.getURI().getPath()));
}
