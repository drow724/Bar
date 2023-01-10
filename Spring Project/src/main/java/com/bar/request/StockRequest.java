package com.bar.request;

import java.util.List;

import com.bar.entity.Stock;

import lombok.Data;

@Data
public class StockRequest {

	private List<Stock> data;
}
