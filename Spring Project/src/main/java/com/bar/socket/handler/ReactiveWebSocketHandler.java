package com.bar.socket.handler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.HandshakeInfo;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketSession;

import com.bar.socket.client.WebSocketClient;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class ReactiveWebSocketHandler implements WebSocketHandler {

	public static ConcurrentHashMap<String, WebSocketClient> cacheMap = new ConcurrentHashMap<>();

	public Mono<Void> handle(WebSocketSession session) {
		HandshakeInfo handshakeInfo = session.getHandshakeInfo();
		String params = handshakeInfo.getUri().getQuery();
		Map<String, String> paramMap = Stream.of(params.split("&"))
				.collect(Collectors.toMap(param -> param.split("=")[0], param -> param.split("=")[1]));

		String uuid = paramMap.get("uuid");

        Mono<Void> output = session.send(Flux.create(sink -> handleClient(uuid, new WebSocketClient(sink, session))));

        Mono<Void> input = session.receive()
                .doOnSubscribe(conn -> {
                })
                .doOnNext(msg -> {
                    cacheMap.get(uuid).sendData(msg.getPayloadAsText());
                })
                .doOnComplete(() -> {
                    session.close();
                    cacheMap.remove(uuid);
                }).doOnCancel(() -> {
                	session.close();
                    cacheMap.remove(uuid);
                })
                .then();

        return Mono.zip(input, output).then();
	}

	private void handleClient(String uuid, WebSocketClient client) {
		if (!cacheMap.containsKey(uuid)) {
			cacheMap.put(uuid, client);
		}
	}

}