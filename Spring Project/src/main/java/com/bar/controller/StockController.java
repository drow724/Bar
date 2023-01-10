package com.bar.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bar.entity.Stock;
import com.bar.response.KeyResponse;
import com.bar.service.StockService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/stock")
@RestController
public class StockController {

	private final StockService stockService;

	@GetMapping("/key")
	public KeyResponse getKey() {
		KeyResponse response = new KeyResponse();
		response.setKey(stockService.getKey());
		return response;
	}

	@PostMapping
	public void saveStock(@RequestBody List<Stock> request) {
		stockService.saveStock(request);
	}
}
