package com.bar.socket.configuration;

import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;

import com.bar.socket.handler.ReactiveWebSocketHandler;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Hooks;

@Configuration
@Slf4j
public class WebSocketServerConfig {

	@Bean
    public HandlerMapping webSocketMapping(ReactiveWebSocketHandler webSocketHandler) {
        return new SimpleUrlHandlerMapping(Map.of("/controll", webSocketHandler), -1);
    }

    @Bean
    public void errorDroppedHandler() {
        Hooks.onErrorDropped(error -> log.warn("Exception happened: ", error));
    }
}