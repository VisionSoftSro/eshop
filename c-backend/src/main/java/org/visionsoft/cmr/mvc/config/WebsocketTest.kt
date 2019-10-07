package org.visionsoft.cmr.mvc.config

import org.springframework.context.annotation.Configuration
import org.springframework.messaging.converter.MappingJackson2MessageConverter
import org.springframework.messaging.simp.stomp.StompHeaders
import org.springframework.messaging.simp.stomp.StompSession
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter
import org.springframework.web.socket.client.standard.StandardWebSocketClient
import org.springframework.web.socket.messaging.WebSocketStompClient
import javax.annotation.PostConstruct
import org.springframework.context.annotation.Bean
import org.springframework.messaging.Message
import org.springframework.messaging.converter.StringMessageConverter
import org.springframework.messaging.simp.stomp.StompCommand


@Configuration
class WebSocketClientConfig {
    @Bean
    fun createWebsocketBean() = WebSocketBean()
}

class WebSocketBean {
    lateinit var stompClient:WebSocketStompClient
    lateinit var session:StompSession
    @PostConstruct
    fun connect() { println("***connecting to websocket")
        val client = StandardWebSocketClient()
        stompClient = WebSocketStompClient(client)
        stompClient.messageConverter = StringMessageConverter()
        session = stompClient.connect("ws://localhost:8080/pci3-websocket", Handler()).get()
    }


    fun printSession() {
        println(session)
    }

}

class Handler: StompSessionHandlerAdapter() {

    override fun handleException(session: StompSession, command: StompCommand?, headers: StompHeaders, payload: ByteArray, exception: Throwable) {
        println("***websocket error")
    }

    override fun afterConnected(session: StompSession, connectedHeaders: StompHeaders) {
        println("***connected to websocket")
        session.subscribe("/topic/Newada", this)
        session.send("/topic/Newada", "{message:9999999}")
    }

    override fun handleFrame(headers: StompHeaders, payload: Any?) {
        println("incoming message")
        println(payload)
    }

}