package com.bar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.bar.entity.Stock;
import com.bar.repository.StockRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StockService {

	private final StockRepository stockRepository;

	@Value("${api.barcode.key}")
	private String KEY;

	public String getKey() {
		return KEY;
	}

	public void saveStock(List<Stock> request) {
		request.parallelStream().forEach(r -> {
			stockRepository.findByBarcode(r.getBarcode()).switchIfEmpty(stockRepository.save(r).thenReturn(r))
					.flatMap(find -> {
						find.updateAmount(find.getAmount() + r.getAmount());
						return stockRepository.save(find).thenReturn(find);
					}).subscribe();
		});
	}

}
