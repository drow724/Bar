package com.bar.socket.client;

import java.io.Serializable;

import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;

import lombok.Data;
import reactor.core.publisher.FluxSink;

@Data
public class WebSocketClient implements Serializable {
	
	private static final long serialVersionUID = 3126044575672218399L;
	private FluxSink<WebSocketMessage> sink;
	private WebSocketSession session;

	public WebSocketClient(FluxSink<WebSocketMessage> sink, WebSocketSession session) {
		this.sink = sink;
		this.session = session;
	}

	public void sendData(String data) {
		sink.next(session.textMessage(data));
	}
}