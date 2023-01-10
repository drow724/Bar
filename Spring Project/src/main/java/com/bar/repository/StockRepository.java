package com.bar.repository;

import org.springframework.data.r2dbc.repository.R2dbcRepository;

import com.bar.entity.Stock;

import reactor.core.publisher.Mono;

public interface StockRepository extends R2dbcRepository<Stock, Long> {
	
	Mono<Stock> findByBarcode(String barcode);
}
